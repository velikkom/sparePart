package com.velikkom.demo.service.business;

import com.velikkom.demo.dto.business.CollectionDTO;
import com.velikkom.demo.entity.concretes.business.Collection;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.entity.enums.PaymentMethods;
import com.velikkom.demo.exception.CustomException;
import com.velikkom.demo.exception.ResourceNotFoundException;
import com.velikkom.demo.mapper.CollectionMapper;
import com.velikkom.demo.payload.request.CollectionSearchRequest;
import com.velikkom.demo.repository.CollectionRepository;
import com.velikkom.demo.repository.FirmRepository;
import com.velikkom.demo.service.CollectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;
    private final FirmRepository firmRepository;
    private final CollectionMapper collectionMapper;

    @Override
    public CollectionDTO createCollection(CollectionDTO dto) {
        Firm firm = firmRepository.findById(dto.getFirmId())
                .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı"));

        //makbuz numarası unique check
        if (collectionRepository.existsByReceiptNumber(dto.getReceiptNumber())){
            throw new CustomException("Bu makbuz numarası zaten sistemde mevcut" + dto.getReceiptNumber(), HttpStatus.CONFLICT);
        }

        Collection collection = collectionMapper.toEntity(dto);
        collection.setFirm(firm);

        // 🧠 NOT: Eğer ödeme yöntemi senetse, amount = noteAmount olacak şekilde ayarlanmalı
        if (dto.getPaymentMethod() == PaymentMethods.NOTE && dto.getNoteAmount() != null) {
            collection.setAmount(dto.getNoteAmount());
        } else {
            collection.setAmount(dto.getAmount());
        }

        // Firmadan borç düş
        BigDecimal currentDebt = firm.getDebt() != null ? firm.getDebt() : BigDecimal.ZERO;
        BigDecimal newDebt = currentDebt.subtract(collection.getAmount());
        firm.setDebt(newDebt.max(BigDecimal.ZERO)); // Negatifse sıfıra sabitle

        firmRepository.save(firm);
        Collection saved = collectionRepository.save(collection);

        return collectionMapper.toDTO(saved);
    }


    @Override
    public List<CollectionDTO> getCollectionsByFirmId(Long firmId) {
        List<Collection> collections = collectionRepository.findByFirmId(firmId);
        return collectionMapper.toDTOList(collections);
    }

    @Override
    public Page<CollectionDTO> searchCollections(CollectionSearchRequest request, Pageable pageable) {
        log.debug("Tahsilat araması: firmId={}, start={}, end={}, method={}",
                request.getFirmId(), request.getStartDate(), request.getEndDate(), request.getPaymentMethod());

        Page<Collection> resultPage = collectionRepository.searchCollections(
                request.getFirmId(),
                request.getStartDate(),
                request.getEndDate(),
                request.getPaymentMethod(),
                request.getMinAmount(),
                request.getMaxAmount(),
                pageable
        );

        return resultPage.map(collectionMapper::toDTO);
    }

    @Override
    public void updateCollection(Long id, CollectionDTO dto) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tahsilat bulunamadı"));

        // 🔄 Miktar: senetse noteAmount'dan alınacak
        if (dto.getPaymentMethod() == PaymentMethods.NOTE && dto.getNoteAmount() != null) {
            collection.setAmount(dto.getNoteAmount());
        } else {
            collection.setAmount(dto.getAmount());
        }

        collection.setCollectionDate(dto.getCollectionDate());
        collection.setPaymentMethod(dto.getPaymentMethod());
        collection.setReceiptNumber(dto.getReceiptNumber());

        collection.setCheckBankName(dto.getCheckBankName());
        collection.setCheckDueDate(dto.getCheckDueDate());

        collection.setNoteAmount(dto.getNoteAmount());
        collection.setNoteDueDate(dto.getNoteDueDate());

        // Firma değiştiyse güncelle
        if (!collection.getFirm().getId().equals(dto.getFirmId())) {
            Firm firm = firmRepository.findById(dto.getFirmId())
                    .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı"));
            collection.setFirm(firm);
        }

        collectionRepository.save(collection);
    }


    @Override
    public void deleteCollection(Long id) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tahsilat bulunamadı"));

        collectionRepository.delete(collection);
    }
}
