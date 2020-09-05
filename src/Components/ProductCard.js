import React from "react";
import {
  Card,
  Image,
  Button,
  Segment,
  Rating,
  Label,
  Grid,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AddtoCart } from "../R-Action/Cart-Action";

const ProductCard = ({ product, AddtoCart }) => {
  const {
    title = "notitle",
    price = 0,
    rate = 0,
    description = "no description",
    imgUrl = "default",
    uid,
  } = product;
  return (
    <>
      <Card className="h-200 ">
        <Card.Content className="">
          <Segment basic>
            <Image className="h-350 m-auto" src={imgUrl} />
          </Segment>
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Link to={`/${uid}/details`}>
                    <Card.Header as="h3">{title}</Card.Header>
                  </Link>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">{price}</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Card.Description as="p">{description}</Card.Description>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Card.Content>

        <Card.Content className="y-center" textAlign="center" extra>
          <Rating
            icon="star"
            size="large"
            rating={rate}
            maxRating={5}
            // onRate={handleRate}
          />

          <Label basic color="green" horizontal>
            <strong> 4.3/5 </strong>
            <Label.Detail>220 voted</Label.Detail>
          </Label>
        </Card.Content>
        <Card.Content>
          <Button onClick={() => AddtoCart(uid)} fluid color="google plus">
            Add to Cart
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

let mapstatetoprops = state => {
  return {};
};

export default connect(mapstatetoprops, { AddtoCart })(ProductCard);
