import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Dropdown } from "./styled/Dropdown";
import { Form, Input, InputWrapper, Label } from "./styled/Form";

const UpdateButton = styled(Button)`
  background-color: blue;
  width: 7rem;
  text-align: center;
  margin: 0;
`;

const UpdateFieldForm = (props) => {
  const { loggedInUser, setLoggedInUser } = useUserContext();
  const [updateButton, setUpdateButton] = useState("Update");
  const [formData, setFormData] = useState(props.default);
  const { cities } = props;
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (updateButton == "Update") {
      setUpdateButton("Submit");
    } else {
      await axios.put(`/customers/${loggedInUser._id}`, {
        [props.fieldName]: formData,
      });
      setLoggedInUser((prev) => {
        return {
          ...prev,
          [props.fieldName]: formData,
        };
      });
      setUpdateButton("Update");
    }
  };
  const handleChange = (event) => {
    event.preventDefault();
    setFormData(event.target.value);
  };
  return (
    <Form onSubmit={handleUpdate}>
      <InputWrapper>
        <Label>{props.label}: </Label>
        {props.id ? (
          <Dropdown
            name="_city"
            onChange={handleChange}
            formData={formData}
            options={cities}
            disabled={updateButton == "Update"}
          />
        ) : (
          <Input
            type="text"
            value={formData}
            onChange={handleChange}
            disabled={updateButton == "Update"}
          />
        )}
      </InputWrapper>
      <UpdateButton>{updateButton}</UpdateButton>
    </Form>
  );
};

export const CustomerProfile = () => {
  const { loggedInUser } = useUserContext();
  const [cities, setCities] = useState("");
  useEffect(() => {
    axios
      .get("/cities")
      .then((response) => response.data)
      .then((data) => {
        setCities(data.data);
      });
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <UpdateFieldForm
        label="First name"
        default={loggedInUser.firstName}
        fieldName="firstName"
      />
      <UpdateFieldForm
        label="Last name"
        default={loggedInUser.lastName}
        fieldName="lastName"
      />{" "}
      <UpdateFieldForm
        label="Street address"
        default={loggedInUser.streetAddress}
        fieldName="streetAddress"
      />
      <UpdateFieldForm
        label="City"
        default={loggedInUser.city.name}
        fieldName="_city"
        id
        cities={cities}
      />
      <UpdateFieldForm
        label="Email"
        default={loggedInUser.email}
        fieldName="email"
      />
      <UpdateFieldForm
        label="Password"
        default="*************"
        fieldName="password"
      />
    </div>
  );
};
