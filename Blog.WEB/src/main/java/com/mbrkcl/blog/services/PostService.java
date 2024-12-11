package com.mbrkcl.blog.services;

import com.mbrkcl.blog.dto.requests.PostCreateRequest;
import com.mbrkcl.blog.dto.requests.PostUpdateRequest;
import com.mbrkcl.blog.dto.responses.PostResponse;
import com.mbrkcl.blog.models.Post;
import com.mbrkcl.blog.models.User;
import com.mbrkcl.blog.repositories.PostRepository;
import com.mbrkcl.blog.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream().map(PostResponse::new).collect(Collectors.toList());
    }

    public PostResponse getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        return new PostResponse(post);
    }

    public PostResponse createPost(PostCreateRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = new Post();
        post.setUser(user);
        post.setTitle(request.getTitle());
        post.setText(request.getText());
        post.setCreateDate(new Date());
        return new PostResponse(postRepository.save(post));
    }

    public PostResponse updatePost(Long id, PostUpdateRequest request) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(request.getTitle());
        post.setText(request.getText());
        return new PostResponse(postRepository.save(post));
    }

    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}
