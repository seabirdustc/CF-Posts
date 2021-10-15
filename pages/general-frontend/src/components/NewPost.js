import React, {useState} from "react";
import '../css/posts.css';
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from "reactstrap";

const NewPost = ({isOpen, toggle, getPosts}) => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const body = {
      username,
      text,
      title
    };
    try {
      const response = await fetch("https://general-worker.yuxuanchen.workers.dev/posts", {
        method: 'POST',
        body: JSON.stringify(body)
      })
      await getPosts();
      toggle();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>New Post</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row className="mt-2">
            <Label for="username" sm={4}>User Name</Label>
            <Col sm={8}>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Col>
          </FormGroup>

          <FormGroup row className="mt-2">
            <Label for="title" sm={4}>Title</Label>
            <Col sm={8}>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Col>
          </FormGroup>

          <FormGroup row className="mt-2">
            <Label for="text" sm={4}>Text</Label>
            <Col sm={8}>
              <Input type="textarea" id="text" value={text} onChange={(e) => setText(e.target.value)}/>
            </Col>
          </FormGroup>

          <FormGroup check row className="mt-4">
            <Col sm={{ size: 6, offset: 6 }}>
              <Button className="mx-2" onClick={toggle}>Cancel</Button>
              <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default NewPost;
