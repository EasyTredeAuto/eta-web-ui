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
  & label {
    color: #cccccc;
    padding: 0;
    line-height: 10px;
  }
  &:hover label,
  & label.Mui-focused {
    color: #055cfd;
  }
  & > div > input {
    padding: 7.5px 16px;
  }
  & .MuiOutlinedInput-root {
    color: #cccc;
    & fieldset {
      border-color: #ccc;
    }
    &:hover fieldset {
      border-color: #055cfd;
    }
    &.Mui-focused fieldset {
      border-color: #055cfd;
    }
  }
`
export const TextFieldName = styled(TextField)`
  & > div > input {
    padding: 7.5px 16px;
  }
  & .MuiOutlinedInput-root {
    color: #333;
    & fieldset {
      border-color: #ccc;
      height: 36 !important;
    }
    &:hover fieldset {
      border-color: #055cfd;
    }
    &.Mui-focused fieldset {
      border-color: #055cfd;
    }
  }
`

export const NumberFormatCustom = styled(NumberFormat)`
  height: 35px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-left: 10px;
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
