import React, { useState, useRef, useEffect } from "react";
import SaveToStorage from "../Utils/autoStorage";

import { productRules } from "../Utils/FormValidation";
import {
  Modal,
  Segment,
  Form,
  Progress,
  Rating,
  TextArea,
  Button,
  Input,
} from "semantic-ui-react";

let $ = window["$"]; // we are using jquery from index.html

const AddProductModal = ({ refBtn }) => {
  const [isOpen, setIsOpen] = useState(false);
  // to open the modal we nee a state in this component and a button on the parent component
  // we create a ref in the parend and send the ref to this component and create a hidden input
  let inputRef = useRef();
  let submitRef = useRef();

  const [rated, setRate] = useState(0);
  // this is from semantic ui docs
  const handleRate = (e, { rating }) => {
    setRate(rating);
    setFormData({ ...formData, rated: rating });
  };

  // to evoid app crashing and cause later we are distracturing the formData we initialized it with empty obj
  const [formData, setFormData] = useState({});

  const [file, setFile] = useState({});

  // this function will save the image in the firebase storage and return the progress and the url
  // it will fire when ever the file is changed because useEffect depend of file
  // but she execute code only if we pass a valid file.name not null
  const { url, progress } = SaveToStorage(file, formData);

  const handleFile = ({ target }) => {
    setFile(target.files[0]);
  };
  const handleChange = (e, { name, value }) =>
    setFormData({ ...formData, [name]: value });

  $(".AddProductForm").form({
    fields: productRules,
    inline: true,
    on: "blur",
  });
  const handleSubmit = (formData, e) => {
    if ($(".AddProductForm ").form("is valid")) {
      e.preventDefault();
      // AddProduct(formData); // --> call to redux Action
      setIsOpen(false);
    }
  };
  const [upLoading, setUpLoading] = useState(false);

  useEffect(() => {
    // when we get the url after loading is done ,  we add it to the formData
    url && setFormData({ ...formData, imgUrl: url });
    // we disable the submit button when the file is loading
    progress === 0
      ? setUpLoading(false)
      : progress === 100
      ? setUpLoading(false)
      : setUpLoading(true);
    // ------------------->
    // GetAllProducts();
    // ------------------->
  }, [url, upLoading]);

  return (
    <>
      <input
        type="button"
        ref={refBtn}
        onClick={() => setIsOpen(!isOpen)}
        hidden
      />

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
                name="title"
                label="Article"
                placeholder="Title"
              />
              <Form.Input
                onChange={handleChange}
                width={8}
                name="price"
                label="Price"
                placeholder="Price"
              />
              <Form.Input
                onChange={handleChange}
                width={8}
                name="DbQte"
                label="Quantity to Add to Database"
                placeholder="Quantity"
              />
              <Form.Field width="6">
                <label htmlFor=""> Uploadfile </label>
                <div onClick={() => inputRef.current.click()}>
                  <Input
                    label={<Button icon="upload" />}
                    labelPosition="right"
                    placeholder={file?.name}
                  />
                  <input
                    onChange={e => handleFile(e)}
                    name="file"
                    type="file"
                    ref={inputRef}
                    hidden
                  />
                  <Progress
                    color="purple"
                    percent={progress}
                    attached="bottom"
                  />
                </div>
              </Form.Field>
              <Form.Field width={8}>
                <label>Rating </label>
                <Rating
                  icon="star"
                  size="large"
                  rating={rated}
                  maxRating={5}
                  onRate={handleRate}
                />
              </Form.Field>

              <Form.Field width="8">
                <label htmlFor=""> Description </label>
                <TextArea
                  onChange={handleChange}
                  name="description"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </Form.Field>
              <input type="submit" ref={submitRef} hidden />
            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button
            loading={upLoading}
            disabled={upLoading}
            type="submit"
            color="facebook"
            onClick={() => submitRef.current.click()}
          >
            Add
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AddProductModal;
