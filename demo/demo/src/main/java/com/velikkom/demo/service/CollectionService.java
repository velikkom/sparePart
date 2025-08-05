package com.velikkom.demo.service;

import com.velikkom.demo.dto.business.CollectionDTO;
import com.velikkom.demo.payload.request.CollectionSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface CollectionService {
    CollectionDTO createCollection(CollectionDTO collectionDTO);

    List<CollectionDTO> getCollectionsByFirmId(Long firmId);

    Page<CollectionDTO> searchCollections(CollectionSearchRequest request, Pageable pageable);

    void updateCollection(Long id, CollectionDTO collectionDTO);

    void deleteCollection(Long id);

    List<CollectionDTO> getCollectionsByUserFirms(Long id);

    List<CollectionDTO> getAllCollections();

    BigDecimal getTotalAmount(CollectionSearchRequest request);
}
