import styled from "styled-components"

export const Component = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ col }: { col?: string }) => col ? col : "repeat(3,1fr)"};
    grid-gap: 1rem;
`
export const BoxContent = styled.div`
    /* background: #212121; */
    width: 100%;
    border: 1px solid red;
    display: flex;
    align-items: center;
`
