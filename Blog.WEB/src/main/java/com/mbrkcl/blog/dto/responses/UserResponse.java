package com.mbrkcl.blog.dto.responses;

import com.mbrkcl.blog.models.User;

public class UserResponse {

    private Long userId;
    private int avatarId;
    private String userName;

    public UserResponse(User entity) {
        this.userId = entity.getId();
        this.avatarId = entity.getAvatar();
        this.userName = entity.getUserName();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getAvatarId() {
        return avatarId;
    }

    public void setAvatarId(int avatarId) {
        this.avatarId = avatarId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
