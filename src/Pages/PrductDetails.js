import React, { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getOneproduct } from "../R-Action/Product-Action";

const PrductDetails = ({ getOneproduct, product }) => {
  const { id } = useParams();
  useEffect(() => {
    getOneproduct(id); // ----> we get the product from the db and send it to redux
  }, [getOneproduct, id]);
  return (
    <div>
      <Segment>
        <div className="margin-auto">
          <ProductCard product={product} id={id} />
        </div>
      </Segment>
    </div>
  );
};
let mapstatetoprops = state => {
  return {
    product: state.product, // ----->  we get the product from the redux and send it to ProductCard
  };
};

export default connect(mapstatetoprops, { getOneproduct })(PrductDetails);
