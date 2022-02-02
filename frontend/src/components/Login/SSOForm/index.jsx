import { useState } from "react";
import { StyledForm } from "../Styled/StyledForm";
import axios from "axios";
import validateUser from "../utils/validate";
import { BsInfoCircle } from "react-icons/bs";
import { StyledButton } from "../Styled/StyledButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setMessage,
  deleteMessage,
  login,
} from "../../../redux/reducers/login/actions";

export default function SSOForm() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  const userChangeHandler = (e) => {
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(() => {
      return newUser;
    });
    setErrors(() => {
      const errors = {};
      for (const error of validateUser(newUser).errors) {
        errors[error.type] = error.message;
      }
      return errors;
    });
    setDisabled(
      () =>
        validateUser(newUser).errors.length > 0 ||
        validateUser(newUser, ["username", "email"]).hasRequired
    );
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteMessage());
    const gitHubCode = localStorage.getItem("gitHubCode");
    const proxyUrl = `/users/auth/githab/ssoRegister?${gitHubCode}`;

    // Use code parameter and other parameters to make POST request to proxy_server
    try {
      const { data } = await axios.post(proxyUrl, { ...user });
      if (data.jwt) {
        dispatch(login(data.jwt));
        dispatch(setMessage(data.message));
        navigate("/");
      } else {
        dispatch(setMessage(data.message));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledForm>
      <form
        className="formSignup"
        autoComplete="off"
        action=""
        method="post"
        name="form"
      >
        <label htmlFor="username">
          User Name{" "}
          {errors.username ? (
            <span className="errorHelp">
              <BsInfoCircle /> <span>{errors.username}</span>
            </span>
          ) : (
            " "
          )}
        </label>
        <input
          className="formStyling"
          type="text"
          name="username"
          value={user.username}
          onChange={userChangeHandler}
          placeholder=""
        />
        <label htmlFor="email">
          Email
          {errors.email ? (
            <span className="errorHelp">
              <BsInfoCircle /> <span>{errors.email}</span>
            </span>
          ) : (
            " "
          )}
        </label>
        <input
          className="formStyling"
          type="email"
          name="email"
          value={user.email}
          onChange={userChangeHandler}
          placeholder=""
        />

        <StyledButton onClick={onSubmitHandler} disabled={disabled}>
          Create Account
        </StyledButton>
      </form>
    </StyledForm>
  );
}
