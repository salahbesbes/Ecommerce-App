import React, { useState, useRef } from "react";
import { Modal, Segment, Form, Button } from "semantic-ui-react";
import { Fb_functons } from "../firebase/config";

const AdminModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  let submitRef = useRef();

  const [formData, setFormData] = useState({});

  const handleChange = (e, { name, value }) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = (formData, e) => {
    e.preventDefault();
    // we make a reference to the function we are not colling it yet
    const addAdminForm = Fb_functons.httpsCallable("addAdminRole");
    addAdminForm({ email: formData.email }).then(res => {
      console.log("res", res);
    });
    setIsOpen(false);
  };
  return (
    <Modal
      centered
      // size="medium"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Modal.Header>Add an Article </Modal.Header>
      <Modal.Content>
        <Segment>
          <Form
            className="AddProductForm"
            onSubmit={e => handleSubmit(formData, e)}
          >
            <Form.Input
              onChange={handleChange}
              width={8}
              name="email"
              label="Email to Change to Admin"
              placeholder="email"
            />

            <input type="submit" ref={submitRef} hidden />
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          color="facebook"
          onClick={() => submitRef.current.click()}
        >
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AdminModal;
