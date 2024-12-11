package com.mbrkcl.blog.dto.requests;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentUpdateRequest {

    @NotBlank(message = "Text is required")
    private String text;
}
