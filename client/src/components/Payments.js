import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useSelector, useDispatch } from "react-redux";

import { fetchStripeToken } from "../store/reducers/user_slice";

export const Payments = () => {
  const dispatch = useDispatch();

  const onToken = (token) => {
    // this.props.handleStripeToken(token);
    dispatch(fetchStripeToken(token));
  };
  let user = useSelector((state) => state.user);

  console.log({ Pyments_info: user });

  return (
    <StripeCheckout
      name="Emaily App"
      description="$5 for 5 email credits."
      amount={500}
      token={onToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default Payments;
