import React from "react";
import { List, Segment, Button } from "semantic-ui-react";
import { useState } from "react";

const MenuHover = ({ handelChangeType, FiltredBytype, Filtred }) => {
  const [active, setActive] = useState("coats");
  const handelChange = (e, { name }) => {
    setActive(name);
    FiltredBytype(name);
    handelChangeType(name); // this funct have as role to pass the prop name to the parent
  };

  return (
    <Segment raised secondary>
      <List horizontal verticalAlign="middle" relaxed divided>
        <List.Item>
          <Button
            onClick={handelChange}
            active={active === "coats"}
            color="teal"
            name="coats"
          >
            Coats
          </Button>
        </List.Item>
        <List.Item>
          <Button
            onClick={handelChange}
            active={active === "jackets"}
            color="teal"
            name="jackets"
          >
            Jackets
          </Button>
        </List.Item>
        <List.Item>
          <Button
            onClick={handelChange}
            active={active === "clothes"}
            color="teal"
            name="clothes"
          >
            Clothes
          </Button>
        </List.Item>
      </List>
    </Segment>
  );
};

export default MenuHover;
