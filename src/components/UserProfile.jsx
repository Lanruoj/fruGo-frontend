import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../utils/auth";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { PageHeading } from "./styled/PageHeading";
import { UpdateFieldForm } from "./UpdateFieldForm";

const ModuleContainer = styled.div`
  background-color: white;
  border-radius: 0.3rem;
  padding: 4rem;
`;

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
    <>
      <PageHeading>Profile</PageHeading>
      <ModuleContainer>
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
            <UpdateFieldForm label="City" fieldName="_city" ids />
          </>
        )}{" "}
        <UpdateFieldForm label="Street address" fieldName="streetAddress" />
        <UpdateFieldForm label="Email" fieldName="email" />
        <UpdateFieldForm
          label="Password"
          default="*************"
          fieldName="password"
        />
        <Button onClick={handleDeleteProfile}>Delete profile</Button>
      </ModuleContainer>
    </>
  );
};
