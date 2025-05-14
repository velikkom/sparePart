package com.velikkom.demo.mapper;

import com.velikkom.demo.dto.business.CollectionDTO;
import com.velikkom.demo.entity.concretes.business.Collection;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CollectionMapper {


   private final ModelMapper modelMapper;

    public CollectionDTO toDTO(Collection collection) {
        CollectionDTO dto = modelMapper.map(collection, CollectionDTO.class);

        // Manuel olarak firmName'i ayarla
        if (collection.getFirm() != null) {
            dto.setFirmName(collection.getFirm().getName());
        }

        return dto;
    }

    public Collection toEntity(CollectionDTO collectionDTO) {
        return modelMapper.map(collectionDTO, Collection.class);
    }

    public List<CollectionDTO> toDTOList(List<Collection> collections) {
        return collections.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
