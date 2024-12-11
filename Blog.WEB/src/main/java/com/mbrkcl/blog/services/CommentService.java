package com.mbrkcl.blog.services;

import com.mbrkcl.blog.dto.requests.CommentCreateRequest;
import com.mbrkcl.blog.dto.requests.CommentUpdateRequest;
import com.mbrkcl.blog.dto.responses.CommentResponse;
import com.mbrkcl.blog.models.Comment;
import com.mbrkcl.blog.models.Post;
import com.mbrkcl.blog.models.User;
import com.mbrkcl.blog.repositories.CommentRepository;
import com.mbrkcl.blog.repositories.PostRepository;
import com.mbrkcl.blog.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public List<CommentResponse> getAllComments() {
        return commentRepository.findAll().stream().map(CommentResponse::new).collect(Collectors.toList());
    }

    public CommentResponse getCommentById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        return new CommentResponse(comment);
    }

    public CommentResponse createComment(CommentCreateRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(request.getPostId()).orElseThrow(() -> new RuntimeException("Post not found"));
        Comment comment = new Comment();
        comment.setUser(user);
        comment.setPost(post);
        comment.setText(request.getText());
        comment.setCreateDate(new Date());
        return new CommentResponse(commentRepository.save(comment));
    }

    public CommentResponse updateComment(Long id, CommentUpdateRequest request) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setText(request.getText());
        return new CommentResponse(commentRepository.save(comment));
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
    }
}
