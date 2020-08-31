import React, { useState, useRef, useEffect, useMemo } from "react";
import ProductCard from "../Components/ProductCard";
import {
  Dimmer,
  Loader,
  Grid,
  Button,
  Modal,
  Form,
  TextArea,
  Input,
  Rating,
  Segment,
  Progress,
  Message,
} from "semantic-ui-react";
import SaveToStorage from "../Utils/autoStorage";
import { connect } from "react-redux";
import { AddProduct } from "../R-Action/Product-Action";
import { ClearErrors } from "../R-Action/Alert-Action";
import { productRules } from "../Utils/FormValidation";
import { GetAllProducts } from "../R-Action/Product-Action";
import { SetAlert } from "../R-Action/Alert-Action";
import { auth } from "../firebase/config";
let $ = window["$"]; // we are using jquery from index.html

const Articles = ({
  AddProduct,

  products,
  errors,
  ClearErrors,
  isLoading,
  GetAllProducts,
  SetAlert,
}) => {
  // let token = localStorage.getItem("token");
  // WatchStateUpdate(); // --> watch on user authentification changed (logged out or some one else loggedin)
  useMemo(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        GetAllProducts();
      } else if (!user) {
        console.log("user", user);
        let message = " Your are not Logged in pls try Again";
        SetAlert(message, "articles", 10000);
        console.log("you are logged out ");
        
      }
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  let inputRef = useRef();
  let submitRef = useRef();

  const [rate, setRate] = useState(0);
  // this is from semantic ui docs
  const handleRate = (e, { rating }) => {
    setRate(rating);
    setFormData({ ...formData, rate: rating });
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
  const handleSubmit = (formData, e, rate) => {
    if ($(".AddProductForm ").form("is valid")) {
      e.preventDefault()
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
    // ------------------->
  }, [url, upLoading]);

  // useEffect(() => {
  //   console.log("test");
  //   return () => {
  //     console.log("return");
  //   };
  // }, []);

 

  return (
    <>
      <div className="x-center mb-20">
        <Button
          className="m-auto"
          size="massive"
          circular
          color="facebook"
          icon="add"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {
        // --> verify if the errors is not empty then if the first error is of type cart (the name of this file)
        errors.length > 0 && errors[0].type === "articles" && (
          <Message
            error
            header="Some this is Wrong"
            list={errors.map((el, i) => el.message)}
            onDismiss={
              (ClearErrors(10000000), () => ClearErrors()) // --> first function only execute if i click on the x
              // second always execte on component is shown
            }
          />
        )
      }

      {isLoading ? (
        <Segment className="h-all" basic>
          <Dimmer active inverted>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Grid stackable doubling relaxed columns="3">
          <Grid.Row>
            {products?.map((el, i) => (
              <Grid.Column key={i}>
                <ProductCard product={el} id={el.id} />
              </Grid.Column>
            ))}
          </Grid.Row>
          <Grid.Row centered>
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
                    onSubmit={e => handleSubmit(formData, e, rate)}
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
                        rating={rate}
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
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

let mapstatetoprops = state => {
  return {
    products: state.products,
    errors: state.someError,
    isLoading: state.isLoading,
  };
};

export default connect(mapstatetoprops, {
  AddProduct,

  ClearErrors,
  GetAllProducts,
  SetAlert,
})(Articles);
