import styled from "styled-components"

const test = `${({ gridGap }: { gridGap?: number }) =>
    gridGap ? gridGap : 1}rem`

export const Component = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ col }: { col?: string }) =>
    col ? col : "repeat(3,1fr)"};

  grid-gap: ${test};
`
export const BoxContent = styled.div`
  /* background: #212121; */
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
