package com.mbrkcl.blog.dto.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String message;
    private Long userId;
    private String token;
    private String refreshToken;
}
