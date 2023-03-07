import styled from "styled-components";

const Select = styled.select`
  border: none;
  border-style: solid;
  border-color: #c8c8c8;
  border-width: 0.2px;
  height: 1.8rem;
  min-width: 15.5rem;
  border-radius: 0.3rem;
  :disabled {
    color: black;
  }
`;

export const Dropdown = ({
  options,
  name,
  handleChange,
  formData,
  disabled,
}) => {
  return (
    <Select
      name={name}
      onChange={handleChange}
      value={formData}
      disabled={disabled}
    >
      {options &&
        options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
    </Select>
  );
};
