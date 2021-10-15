import React, { useEffect, useState } from "react";
import '../css/posts.css';
import {Button, Col, Row} from "reactstrap";
import Post from "./Post";
import NewPost from "./NewPost";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const getPosts = async () => {
    const resp = await fetch(
      "https://general-worker.yuxuanchen.workers.dev/posts"
    );
    const postsResp = await resp.json();
    const parsedPosts = postsResp.map((str) => JSON.parse(str));
    setPosts(parsedPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Row>
      <Col xs={{size: 6, offset: 3}}>
        <h1 style={{fontSize: '4rem'}} className="text-primary text-center">Posts</h1>
        <Row>
          <Col xs={{size: 6, offset: 3}}>
            <Button
              color="primary"
              className="mt-5 text-center w-100"
              onClick={() => setNewPostModalOpen(true)}
            >
              New Post
            </Button>
          </Col>
        </Row>
        <div className="mt-5  posts_grid">
          {posts.map((post) => (
            <Button color="primary"
                    outline
                    key={post.id}
                    className="post_card"
                    onClick={() => {
                      setPostModalOpen(true);
                      setSelectedPost(post);
                    }}
            >
              <h3>{post.title}️</h3>
              <div>By {post?.username}</div>
              <div>{post.published_at}</div>
            </Button>
          ))}
        </div>
      </Col>
      <NewPost isOpen={newPostModalOpen} toggle={() => setNewPostModalOpen(s => !s)} getPosts={getPosts}/>
      <Post isOpen={postModalOpen} toggle={() => setPostModalOpen(s => !s)} post={selectedPost}/>
    </Row>
  );
};

export default Posts;
