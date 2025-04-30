package com.velikkom.demo.service.user;

import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.repository.FirmRepository;
import com.velikkom.demo.service.ExcelImportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExcelImportServiceImpl implements ExcelImportService {

    private final FirmRepository firmRepository;

    @Override
    public void importFirmsFromExcel(MultipartFile file) {
        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Başlık satırını atla
                if (isRowEmpty(row)) continue;      // Tamamen boş satırı atla

                String code = getCellValue(row.getCell(0));
                String name = getCellValue(row.getCell(1));
                String address = getCellValue(row.getCell(2));
                String phone = getCellValue(row.getCell(3));
                String taxNumber = getCellValue(row.getCell(4));

                if (name == null || name.isBlank()) continue;

                // ✨ Eğer aynı isimli firma zaten varsa bu satırı atla
                if (firmRepository.existsByName(name) || firmRepository.existsByCode(code)) {
                    continue;
                }

                Firm firm = Firm.builder()
                        .code(code)
                        .name(name)
                        .address(address)
                        .phone(phone)
                        .taxNumber(taxNumber.isBlank() ? null : taxNumber) // Boşsa null kaydediyoruz
                        .debt(BigDecimal.ZERO)
                        .build();

                firmRepository.save(firm);
            }

        } catch (Exception e) {
            throw new RuntimeException("Excel işleme hatası: " + e.getMessage(), e);
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    long longVal = (long) cell.getNumericCellValue();
                    return String.valueOf(longVal);
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            case BLANK:
                return "";
            default:
                return cell.toString().trim();
        }
    }

    private boolean isRowEmpty(Row row) {
        for (Cell cell : row) {
            if (cell != null && cell.getCellType() != CellType.BLANK) {
                return false;
            }
        }
        return true;
    }
}
