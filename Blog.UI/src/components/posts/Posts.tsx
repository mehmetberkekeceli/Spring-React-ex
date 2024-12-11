import Post, { PostType } from "../post/Post";
import "../../styles.scss";

interface PostsProps {
  posts: PostType[];
}

export default function Posts({ posts }: PostsProps) {
  if (!Array.isArray(posts)) {
    return <div></div>;
  }
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} key={p.id} />
      ))}
    </div>
  );
}
