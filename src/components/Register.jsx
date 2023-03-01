// import the styled UI components
import Title from "./styled/Title";
import InputWrapper from "./styled/InputWrapper";

import NotLoggedInNavBar from "./NavBar/NotLoggedInNavBar";

export const Register = () => {
  return (
    <>
      <NotLoggedInNavBar />
      <Title>Register</Title>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InputWrapper>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="city">City:</label>
          <select name="city" id="city">
            <option value="Melbourne">Melbourne</option>
            <option value="Sydney">Sydney</option>
            <option value="Adelaide">Adelaide</option>
            <option value="Brisbane">Brisbane</option>
            <option value="Perth">Perth</option>
            <option value="Darwin">Darwin</option>
            <option value="Hobart">Hobart</option>
          </select>
        </InputWrapper>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </>
  );
};
