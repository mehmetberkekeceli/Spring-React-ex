import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { config } from "../../config/Environment";
import { Context } from "../../context/Context";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import "../../styles.scss";

interface Post {
  id: number;
  title: string;
  text: string;
  userId: number;
  userName: string;
  createDate: Date;
}

interface Comment {
  id: number;
  userId: number;
  userName: "";
  text: string;
  createDate: Date;
}

interface NewComment {
  id: number;
  userId: number;
  postId: number;
  text: string;
}

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState<Post>({
    id: -1,
    userId: -1,
    title: "",
    text: "",
    userName: "",
    createDate: new Date(),
  });
  const { user, token } = useContext(Context);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const onClickHandler = async () => {
    const newComment: NewComment = {
      id: -1,
      postId: post.id,
      userId: user.userId,
      text: comment,
    };
    try {
      const res = await axios.post(`${config.APP_URL}/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments((prevComments) => {
        if (Array.isArray(prevComments)) {
          return [...prevComments, res.data];
        } else {
          console.error("prevComments is not an array");
          return [res.data];
        }
      });
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get<Post>(`${config.APP_URL}/posts/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setContent(res.data.text);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get<Comment[]>(
          `${config.APP_URL}/comments/${post.id}`
        );
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else {
          console.error("Fetched comments data is not an array");
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    getPost();
    fetchComments();
  }, [setComments, post.id, path]);

  const handleCommentDelete = async (commentId: number) => {
    try {
      await axios.delete(`${config.APP_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.APP_URL}/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.replace("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="single-post">
      <Card>
        <h1 className="single-post-title">
          {title}
          {post.userId === user?.id && <div className="single-post-edit"></div>}
          <Button
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={handleDelete}
          />
        </h1>
        <div className="single-post-info">
          <span className="single-post-author">
            <Avatar icon="pi pi-user" className="p-mr-2" />
            Kullanıcı:
            <Link to={`/?user=${post.userId}`} className="link">
              <b> {post.userName}</b>
            </Link>
          </span>
          <span className="single-post-date">
            {new Date(post.createDate).toDateString()}
          </span>
        </div>
        <p className="singlePostDesc">{content}</p>
        <Divider />
        <div className="main-container">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Card className="comment-container" key={comment.id}>
                <div className="single-post-info">
                  <Chip label={`${comment.userName}`} icon="pi pi-user" />
                  <span>{new Date(comment.createDate).toLocaleString()}</span>
                </div>
                <p className="comment-content">{comment.text}</p>
                {comment.userId === user?.id && (
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => handleCommentDelete(comment.id)}
                  />
                )}
              </Card>
            ))
          ) : (
            <p>Yorum bulunmamakta.</p>
          )}
          {user ? (
            <div className="comment-flexbox">
              <h3 className="comment-text">Yorum Yap!</h3>
              <InputTextarea
                value={comment}
                onChange={onChangeHandler}
                rows={5}
                cols={30}
                autoResize
              />
              <Button
                onClick={onClickHandler}
                className="comment-button"
                label="Gönder!"
              />
            </div>
          ) : (
            <p className="comment-login">Yorum yapmak için giriş yapın!</p>
          )}
        </div>
      </Card>
    </div>
  );
}
