let validationRules = {
  email: {
    identifier: "email",
    rules: [
      {
        type: "email",
        prompt: "Please enter a valid e-mail",
      },
      {
        type: "empty",
        prompt: "Please enter an Email",
      },
    ],
  },
  password: {
    identifier: "password",
    rules: [
      {
        type: "empty",
        prompt: "Please enter a password",
      },
      {
        type: "minLength[6]",
        prompt: "password too short",
      },
    ],
  },
  ConfPassword: {
    identifier: "ConfPassword",
    rules: [
      {
        type: "empty",
        prompt: "Please enter a password",
      },
      {
        type: "match[password]",
        prompt: "password dont matches",
      },
    ],
  },
};

let productRules = {
  title: {
    identifier: "title",
    rules: [
      {
        type: "empty",
        prompt: "Please enter a title",
      },
    ],
  },
  price: {
    identifier: "price",
    rules: [
      {
        type: "empty",
        prompt: "Please enter a price",
      },
      {
        type: "number",
        prompt: "Please enter a Number",
      },
    ],
  },
  description: {
    identifier: "description",
    rules: [
      {
        type: "empty",
        prompt: "Please enter a description",
      },
    ],
  },
  file: {
    identifier: "file",
    rules: [
      {
        type: "empty",
        prompt: "Please enter a file",
      },
    ],
  },
  DbQte: {
    identifier: "DbQte",
    rules: [
      {
        type: "number",
        prompt: "Please enter a Number",
      },
      {
        type: "empty",
        prompt: "Please enter a DbQte",
      },
    ],
  },
};
export { validationRules, productRules };
