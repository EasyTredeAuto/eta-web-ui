import styled from "styled-components"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import NumberFormat from "react-number-format"

export const TextFieldBase = styled(TextField)`
  & label {
    color: #14ffec;
  }
  &:hover label,
  & label.Mui-focused {
    color: #c2ffd9;
  }
  & .MuiOutlinedInput-root {
    color: #c2ffd9;
    & fieldset {
      border-color: #14ffec;
    }
    &:hover fieldset {
      border-color: #c2ffd9;
    }
    &.Mui-focused fieldset {
      border-color: #c2ffd9;
    }
  }
`
export const TextFieldSearch = styled(TextField)`
  & > div {
    color: #333;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  & > div > input {
    width: 95%;
  }
  & > div:hover,
  & > div:focus {
    border-color: #055cfd;
  }
  & > div > fieldset {
    display: none !important;
  }
`
export const TextFieldName = styled(TextField)`
  & > div {
    color: #333;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  & > div > input {
    width: 95%;
  }
  & > div:hover,
  & > div:focus {
    border-color: #055cfd;
  }
  & > div > fieldset {
    display: none !important;
  }
`

export const NumberFormatCustom = styled(NumberFormat)`
  height: 35px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-left: 10px;
  width: 100%;
`

export const FormLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    color: #14ffec;
  }
`
export const CheckboxRemember = styled(Checkbox)`
  &.MuiCheckbox-root,
  &.Mui-checked {
    color: #14ffec !important;
  }
`
