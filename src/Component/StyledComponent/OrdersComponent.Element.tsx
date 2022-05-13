import styled from "styled-components"

export const Component = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ col }: { col?: string }) =>
    col ? col : "repeat(3,1fr)"};
  grid-gap: 1rem;
`
export const BoxContent = styled.div`
  /* background: #212121; */
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
export const BoxSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > #select-bot-access {
    width: 100%;
  }
`
