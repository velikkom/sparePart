package com.velikkom.demo.service;

import com.velikkom.demo.dto.business.CollectionDTO;
import com.velikkom.demo.payload.request.CollectionSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CollectionService {
    CollectionDTO createCollection(CollectionDTO collectionDTO);
    List<CollectionDTO> getCollectionsByFirmId(Long firmId);

    Page<CollectionDTO> searchCollections(CollectionSearchRequest request, Pageable pageable);
}
