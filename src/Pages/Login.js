import React, { useState, useEffect } from "react";
import { Segment, Form, Button, Grid, Message } from "semantic-ui-react";
import { validationRules } from "../Utils/FormValidation";
import { LogIn } from "../R-Action/Auth-Action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
let $ = window["$"]; // we are using jquery from index.html

const Login = ({ LogIn, user, errors, isLoading }) => {

  const [formData, setFormData] = useState(null);

  const handleChange = (e, { name, value }) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = formData => {
    $(".LoginForm").form("is valid") && LogIn(formData);
  };
  useEffect(() => {
    $(".LoginForm").form({
      fields: validationRules,
      inline: true,
      on: "blur",
    });
  }, [formData]);
  if (user) return <Redirect to="/articles" />;
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
              className="LoginForm"

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
                  label="password"
                  name="password"
                  placeholder="password"
                  type="password"
                />
              </Form.Field>

              <Button loading={isLoading} color="orange">Submit</Button>
            </Form>
            {errors.length > 0 && errors[0].type === "form" && (
              <Message error>
                <Message.Header>Please Check your credential</Message.Header>
                {errors.map((el, i) => (
                  <Message.List key={i}> {el.message} </Message.List>
                ))}
              </Message>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
let mapstatetoprops = state => {
  return {
    errors: state.someError,
    user: state.user,
    isLoading: state.isLoading,
  };
};

export default connect(mapstatetoprops, { LogIn })(Login);
