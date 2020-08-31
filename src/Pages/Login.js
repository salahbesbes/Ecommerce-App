import React, { useState, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { validationRules } from "../Utils/FormValidation";
import { LogIn } from "../R-Action/Auth-Action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
let $ = window["$"]; // we are using jquery from index.html

const Login = ({ LogIn, user }) => {
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
  });
  if (user) return <Redirect to="/articles" />;
  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width="7">
          <Segment raised>
            <Form
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

              <Button color="orange">Submit</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
let mapstatetoprops = state => {
  return {
    user: state.user,
  };
};

export default connect(mapstatetoprops, { LogIn })(Login);
