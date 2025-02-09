package com.velikkom.demo.mapper;

import com.velikkom.demo.dto.user.UserDTO;
import com.velikkom.demo.entity.concretes.user.User;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public UserDTO toDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
