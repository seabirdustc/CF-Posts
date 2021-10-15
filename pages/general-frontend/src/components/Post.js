import React from "react";
import '../css/posts.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const Post = ({isOpen, toggle, post}) => {
  if (!post) return null;
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{post.title} -- {post.username}</ModalHeader>
      <ModalBody>
        {post.text}
      </ModalBody>
      <ModalFooter>
        <div className="float-end">{post.published_at}</div>
      </ModalFooter>
    </Modal>
  );
};

export default Post;
