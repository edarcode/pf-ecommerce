import React, { useEffect } from "react";
import { UserItemsStyled } from "./UserItemsStyled";
import Box from "./Box/Box";
import {
  completeLogout,
  fetchUser,
} from "../../../../redux/reducers/login/actions";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

export default function UserItems() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const username = useSelector((state) => state.login.username);
  const navigate = useNavigate();

  const userLogout = async () => {
    dispatch(completeLogout());
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchUser(navigate));
    }
  }, [dispatch, navigate]);

  var cart = useSelector((state) => state.cart);

  return (
    <UserItemsStyled>
      <Box
        logout={userLogout}
        Imgsrc="user"
        Imgalt="User image"
        Text={
          isLoggedIn ? [username, "Log out"] : ["Sign in", "Create an Account"]
        }
      />
      <Box
        Imgsrc="cart"
        Imgalt="Cart image"
        Text={["My Cart", `$${cart.getSubtotalPrice()}`]}
      />
    </UserItemsStyled>
  );
}
