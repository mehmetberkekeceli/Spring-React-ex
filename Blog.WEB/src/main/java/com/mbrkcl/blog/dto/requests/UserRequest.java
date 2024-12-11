package com.mbrkcl.blog.dto.requests;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class UserRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username should be between 3 and 50 characters")
    private String userName;

    @NotBlank(message = "Password is required")
    private String password;

    @Size(min = 3, max = 60, message = "Full name should be between 3 and 50 characters")
    private String fullName;

    @Pattern(regexp = "^[\\w_.+-]+@[\\w-]+\\.\\w{2,4}$", message = "Invalid email format")
    private String email;
}
