package com.velikkom.demo.payload;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseWrapper<T> {
    private boolean success;
    private String message;
    private T data;

    public ResponseWrapper(boolean b, String firmCreated) {
    }
}
