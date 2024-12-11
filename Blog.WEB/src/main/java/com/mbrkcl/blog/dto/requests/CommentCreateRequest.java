package com.mbrkcl.blog.dto.requests;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CommentCreateRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Post ID is required")
    private Long postId;

    @NotBlank(message = "Text is required")
    private String text;
}
