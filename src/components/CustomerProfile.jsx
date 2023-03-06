import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";

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
    <form>
      <label>{props.label}: </label>
      {props.id ? (
        <>
          {" "}
          <select
            name="_city"
            id="_city"
            onChange={handleChange}
            value={formData}
          >
            {cities &&
              cities.map((city) => {
                return (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                );
              })}
          </select>
        </>
      ) : (
        <input
          type="text"
          value={formData}
          onChange={handleChange}
          disabled={updateButton == "Update"}
        />
      )}
      <Button onClick={handleUpdate}>{updateButton}</Button>
    </form>
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
      <ul>
        <li>
          <UpdateFieldForm
            label="First name"
            default={loggedInUser.firstName}
            fieldName="firstName"
          />
        </li>
        <li>
          <UpdateFieldForm
            label="Last name"
            default={loggedInUser.lastName}
            fieldName="lastName"
          />
        </li>
        <li>
          {" "}
          <UpdateFieldForm
            label="Street address"
            default={loggedInUser.streetAddress}
            fieldName="streetAddress"
          />
        </li>
        <li>
          <UpdateFieldForm
            label="City"
            default={loggedInUser.city.name}
            fieldName="_city"
            id
            cities={cities}
          />
        </li>
        <li>
          <UpdateFieldForm
            label="Email"
            default={loggedInUser.email}
            fieldName="email"
          />
        </li>
        <li>
          <UpdateFieldForm
            label="Password"
            default="*************"
            fieldName="password"
          />
        </li>
      </ul>
    </div>
  );
};
