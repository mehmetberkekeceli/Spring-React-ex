package com.mbrkcl.blog.dto.responses;

import com.mbrkcl.blog.models.Comment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponse {
    private Long commentId;
    private Long userId;
    private String userName;
    private String text;

    public CommentResponse(Comment entity) {
        this.commentId = entity.getId();
        this.userId = entity.getUser().getId();
        this.userName = entity.getUser().getUserName();
        this.text = entity.getText();
    }
}
