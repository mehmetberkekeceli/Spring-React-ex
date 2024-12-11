package com.mbrkcl.blog.dto.requests;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Refresh token is required")
    private String refreshToken;
}
