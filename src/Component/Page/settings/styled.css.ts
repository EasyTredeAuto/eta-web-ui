import styled from "styled-components"
import Select from "react-select"

export const Container = styled.div`
  /* background: #212121; */
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 45% 45%;
  grid-gap: 5%;
  justify-content: center;
`

export const InputKeyContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 19% 79%;
  grid-gap: 2%;
  justify-content: center;
  margin-top: 15px;
`

export const Label = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const SelectBase = styled(Select)`
  width: 100%;
  margin-top: 15px;
`
