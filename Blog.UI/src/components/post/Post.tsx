import "../../styles.scss";
import { Link } from "react-router-dom";
import PostPhoto from "../../assets/PostPhoto.jpg";

interface PostProps {
  post: {
    id: number;
    userId: number;
    userName: string;
    title: string;
    text: string;
  };
}

export type PostType = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  text: string;
};

export default function Post({ post }: PostProps) {
  const shortenedText = post.text.substring(0, 100) + "...";

  return (
    <div className="post">
      <div className="post-info">
        <div className="post-cats"></div>
        <Link to={`/post/${post.id}`} className="link">
          <img className="post-img" src={PostPhoto} alt="Post" />
          <p className="post-cat">Yazar: {post.userName}</p>
          <span className="post-title">{post.title}</span>
          <p className="post-desc">{shortenedText}</p>
          {post.text.length > 100 && <Link to={`/post/${post.id}`}></Link>}
        </Link>
        <hr />
      </div>
    </div>
  );
}
