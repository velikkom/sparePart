package com.velikkom.demo.payload;

import com.velikkom.demo.dto.business.ProductDTO;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor

@Builder
public class ResponseWrapper<T> {
    private boolean success;
    private String message;
    private T data;

    public ResponseWrapper(boolean b, String firmCreated) {
    }

    public ResponseWrapper(boolean b, String firmCreated,T data) {
    }
}
