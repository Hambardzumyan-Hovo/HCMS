import React from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import CheckIn from "./Check-in/CheckIn";
import Products from "./Products/Products";
import CheckOut from "./Check-out/CheckOut";

const SecondPage = ({ localCheckin, localProducts, localCheckout }) => {
  return (
    <div>
      <NavLink to='/'>
        <Button variant='contained' color='primary'>
          First Page
        </Button>
      </NavLink>
      <CheckIn localCheckin={localCheckin} />

      <Products localProducts={localProducts} />

      <CheckOut localCheckout={localCheckout} />
    </div>
  );
};

export default SecondPage;
