import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../utils/auth";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Dropdown } from "./styled/Dropdown";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { PageHeading } from "./styled/PageHeading";
import { UpdateFieldForm } from "./UpdateFieldForm";

export const UserProfile = () => {
  const { currentUser, setCurrentUser, currentRole, currentToken } =
    useUserContext();
  const navigate = useNavigate();
  const handleDeleteProfile = async () => {
    const tempAxios = axios.create();
    const tempUserID = currentUser._id;
    const tempRole = currentRole;
    const tempToken = currentToken;
    await logout();
    await tempAxios
      .delete(
        `/${
          tempRole[0].toLowerCase() + tempRole.slice(1, tempRole.length) + "s"
        }/${tempUserID}`,
        { headers: { "Authorization": `Bearer ${tempToken}` } },
        {
          data: null,
        }
      )
      .then(() => setCurrentUser(""))
      .then(() => navigate("/"));
  };
  return (
    <div>
      <PageHeading>Profile</PageHeading>
      {currentRole == "Merchant" && (
        <>
          <UpdateFieldForm label="Name" fieldName="name" />
          <UpdateFieldForm label="Description" fieldName="description" />
        </>
      )}
      {currentRole == "Customer" && (
        <>
          {" "}
          <UpdateFieldForm label="First name" fieldName="firstName" />
          <UpdateFieldForm label="Last name" fieldName="lastName" />
        </>
      )}{" "}
      <UpdateFieldForm label="Street address" fieldName="streetAddress" />
      <UpdateFieldForm label="City" fieldName="_city" ids />
      <UpdateFieldForm label="Email" fieldName="email" />
      <UpdateFieldForm
        label="Password"
        default="*************"
        fieldName="password"
      />
      <Button onClick={handleDeleteProfile}>Delete profile</Button>
    </div>
  );
};
