import React, { useState, useEffect } from "react";
import { Segment, Form, Button, Grid, Message } from "semantic-ui-react";
import { validationRules } from "../Utils/FormValidation";
import { Signup } from "../R-Action/Auth-Action";
import { connect } from "react-redux";
let $ = window["$"]; // we are using jquery from index.html
const SignUp = ({ Signup, errors }) => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e, { name, value }) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = formData => {
    $(".authForm").form("is valid") && Signup(formData);
  };

  useEffect(() => {
    $(".authForm").form({
      fields: validationRules,
      inline: true,
      on: "blur",
    });
  }, [formData]);

  const renderMessageError = () => {
    let errorsIsempty = errors.length === 0; // --> false/true
    let errorTypeIsForm = errors[0]?.type === "form"; // --> false/true

    if (!errorsIsempty && errorTypeIsForm) {
      return (
        <Message error>
          <Message.Header>Please Check your credential</Message.Header>
          {errors.map((el, i) => (
            
            <Message.List key={i}> {el.message} </Message.List>
          ))}
        </Message>
      );
    }
  };
  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width="7">
          <Segment raised>
            <Form
              error
              onSubmit={() => handleSubmit(formData)}
              size="large"
              widths="equal"
              className="authForm"
            >
              <Form.Field>
                <Form.Input
                  onChange={handleChange}
                  label="Email"
                  name="email"
                  placeholder="email"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  onChange={handleChange}
                  label="Password"
                  name="password"
                  placeholder="password"
                  type="password"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  onChange={handleChange}
                  label="Confirm Password"
                  name="ConfPassword"
                  placeholder="password"
                  type="password"
                />
              </Form.Field>

              <Button color="orange">Submit</Button>
            </Form>
            {renderMessageError()}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

let mapstatetoprops = state => {
  return { errors: state.someError };
};

export default connect(mapstatetoprops, { Signup })(SignUp);
