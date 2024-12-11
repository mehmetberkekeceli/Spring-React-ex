package com.mbrkcl.blog.dto.requests;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class PostCreateRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title should not exceed 200 characters")
    private String title;

    @NotBlank(message = "Text is required")
    private String text;

    @NotNull(message = "User ID is required")
    private Long userId;
}
