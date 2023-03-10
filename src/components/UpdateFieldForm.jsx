import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Dropdown } from "./styled/Dropdown";
import { Form, Input, InputWrapper, Label } from "./styled/Form";

export const UpdateFieldForm = (props) => {
  const { currentUser, setCurrentUser, currentRole } = useUserContext();
  const [updateButton, setUpdateButton] = useState("✎");
  const [formData, setFormData] = useState("");
  const [cities, setCities] = useState([]);
  useEffect(() => {
    axios
      .get("/cities")
      .then((response) => response.data)
      .then((data) => {
        setCities(data.data);
        setFormData(() => {
          return currentUser[props.fieldName];
        });
      });
  }, [updateButton]);
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (updateButton == "✎") {
      setUpdateButton("\u21B5");
    } else if (updateButton == "\u21B5") {
      await axios.put(
        `/${
          currentRole[0].toLowerCase() +
          currentRole.slice(1, currentRole.length) +
          "s"
        }/${currentUser._id}`,
        {
          [props.fieldName]: formData,
        }
      );
      await axios.get(`/customers/${currentUser._id}`).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setCurrentUser(response.data.data);
      });
      setUpdateButton("✎");
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
            value={formData._id}
            onChange={handleChange}
            disabled={updateButton == "✎"}
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
            value={formData || "********"}
            onChange={handleChange}
            disabled={updateButton == "✎"}
          />
        )}
      </InputWrapper>
      <UpdateButton>{updateButton}</UpdateButton>
    </Form>
  );
};

const UpdateButton = styled(Button)`
  width: 7rem;
  text-align: center;
  margin: 0;
`;
