package com.velikkom.demo.exception;

import org.springframework.http.HttpStatus;

public class FirmNotFoundException extends CustomException {


    public FirmNotFoundException(String message, HttpStatus status) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
