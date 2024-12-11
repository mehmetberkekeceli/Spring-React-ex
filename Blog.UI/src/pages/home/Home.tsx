import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import "../../styles.scss";
import axios from "axios";
import Layout from "../../components/layout/layout";
import { config } from "../../config/Environment";

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`${config.APP_URL}/posts`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Layout>
        <div className="home">
          <Posts posts={posts} />
        </div>
      </Layout>
    </>
  );
}
