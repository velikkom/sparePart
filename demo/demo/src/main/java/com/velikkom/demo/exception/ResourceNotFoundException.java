package com.velikkom.demo.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends CustomException{

    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
