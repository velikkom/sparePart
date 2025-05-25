package com.velikkom.demo.exception;


import com.velikkom.demo.payload.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ResponseWrapper<String>> handleCustomException(CustomException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(new ResponseWrapper<>(false, ex.getMessage(), null));
    }

    @ExceptionHandler(FirmNotFoundException.class)
    public ResponseEntity<ResponseWrapper<String>> handleFirmNotFoundException(FirmNotFoundException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(new ResponseWrapper<>(false, ex.getMessage(), null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseWrapper<Object>> handleGeneric(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseWrapper<>(false, null, "Bir hata oluştu"));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ResponseWrapper<String>> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ResponseWrapper<>(false, ex.getMessage()));
    }

}
//todo