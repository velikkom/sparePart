package com.velikkom.demo.exception;

import org.springframework.http.HttpStatus;

public class UserAlreadyExistsException extends CustomException {
    public UserAlreadyExistsException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
