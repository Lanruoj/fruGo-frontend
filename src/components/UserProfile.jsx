import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Dropdown } from "./styled/Dropdown";
import { Form, Input, InputWrapper, Label } from "./styled/Form";

const UpdateButton = styled(Button)`
  width: 7rem;
  text-align: center;
  margin: 0;
`;

const UpdateFieldForm = (props) => {
  const { loggedInUser, setLoggedInUser, role } = useUserContext();
  const [updateButton, setUpdateButton] = useState("Update");
  const [formData, setFormData] = useState(props.default);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    axios
      .get("/cities")
      .then((response) => response.data)
      .then((data) => {
        setCities(data.data);
      });
  }, []);
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (updateButton == "Update") {
      setUpdateButton("Submit");
    } else {
      const response = await axios.put(
        `/${role[0].toLowerCase() + role.slice(1, role.length) + "s"}/${
          loggedInUser._id
        }`,
        {
          [props.fieldName]: formData,
        }
      );
      console.log(response);
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
        {props.ids ? (
          <Dropdown
            value={props.default}
            onChange={handleChange}
            disabled={updateButton == "Update"}
          >
            {cities.map((option) => {
              return (
                <option value={option._id} key={option._id}>
                  {option.name}
                </option>
              );
            })}
          </Dropdown>
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

export const UserProfile = () => {
  const { loggedInUser, role } = useUserContext();
  const navigate = useNavigate();
  const handleDeleteProfile = () => {
    axios
      .delete(
        `/${role[0].toLowerCase() + role.slice(1, role.length) + "s"}/${
          loggedInUser._id
        }`,
        {
          data: null,
        }
      )
      .then(() => {
        localStorage.clear();
        navigate("/login");
      });
  };
  return (
    <div>
      <h1>Profile</h1>
      {role == "Merchant" && (
        <>
          <UpdateFieldForm
            label="Name"
            default={loggedInUser.name}
            fieldName="name"
          />
          <UpdateFieldForm
            label="Description"
            default={loggedInUser.description}
            fieldName="description"
          />
        </>
      )}
      {role == "Customer" && (
        <>
          {" "}
          <UpdateFieldForm
            label="First name"
            default={loggedInUser.firstName}
            fieldName="firstName"
          />
          <UpdateFieldForm
            label="Last name"
            default={loggedInUser.lastName}
            fieldName="lastName"
          />
        </>
      )}{" "}
      <UpdateFieldForm
        label="Street address"
        default={loggedInUser.streetAddress}
        fieldName="streetAddress"
      />
      <UpdateFieldForm
        label="City"
        default={loggedInUser._city}
        fieldName="_city"
        ids
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
      <Button onClick={handleDeleteProfile}>Delete profile</Button>
    </div>
  );
};
