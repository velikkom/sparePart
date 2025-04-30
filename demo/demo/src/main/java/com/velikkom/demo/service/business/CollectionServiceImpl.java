package com.velikkom.demo.service.business;

import com.velikkom.demo.dto.business.CollectionDTO;
import com.velikkom.demo.entity.concretes.business.Collection;
import com.velikkom.demo.entity.concretes.business.Firm;
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
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j // ✨ Loglama ekliyoruz
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;
    private final FirmRepository firmRepository;
    private final CollectionMapper collectionMapper;

    @Override
    public CollectionDTO createCollection(CollectionDTO dto) {
        Firm firm = firmRepository.findById(dto.getFirmId())
                .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı"));

        Collection collection = collectionMapper.toEntity(dto);
        collection.setFirm(firm);

        // Firma borcunu tahsilat kadar azalt
        BigDecimal currentDebt = firm.getDebt() != null ? firm.getDebt() : BigDecimal.ZERO;
        BigDecimal newDebt = currentDebt.subtract(dto.getAmount());
        firm.setDebt(newDebt.max(BigDecimal.ZERO));

        firmRepository.save(firm);

        Collection savedCollection = collectionRepository.save(collection);
        return collectionMapper.toDTO(savedCollection);
    }

    @Override
    public List<CollectionDTO> getCollectionsByFirmId(Long firmId) {
        List<Collection> collections = collectionRepository.findByFirmId(firmId);
        return collectionMapper.toDTOList(collections);
    }

    @Override
    public Page<CollectionDTO> searchCollections(CollectionSearchRequest request, Pageable pageable) {
        // ✨ Log ekledik
        log.debug("Tahsilat araması başlatıldı. Filtreler -> FirmId: {}, StartDate: {}, EndDate: {}, PaymentMethod: {}",
                request.getFirmId(), request.getStartDate(), request.getEndDate(), request.getPaymentMethod());

        Page<Collection> resultPage = collectionRepository.searchCollections(
                request.getFirmId(),
                request.getStartDate(),
                request.getEndDate(),
                request.getPaymentMethod(),
                pageable
        );

        return resultPage.map(collectionMapper::toDTO);
    }

    @Override
    public void updateCollection(Long id, CollectionDTO dto) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tahsilat bulunamadı"));

        // Güncelleme alanları
        collection.setAmount(dto.getAmount());
        collection.setCollectionDate(dto.getCollectionDate());
        collection.setPaymentMethod(dto.getPaymentMethod());
        collection.setReceiptNumber(dto.getReceiptNumber());
        collection.setCheckBankName(dto.getCheckBankName());
        collection.setCheckDueDate(dto.getCheckDueDate());
        collection.setNoteAmount(dto.getNoteAmount());
        collection.setNoteDueDate(dto.getNoteDueDate());

        // Firma kontrolü
        if (!collection.getFirm().getId().equals(dto.getFirmId())) {
            collection.setFirm(firmRepository.findById(dto.getFirmId())
                    .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı")));
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
