import styled from "styled-components"

export const Component = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: ${({ col }: { col?: string }) => col ? col : "repeat(3,1fr)"};
    grid-gap: 1rem;
`
export const BoxHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
export const BoxContent = styled.div`
    /* background: #212121; */
    display: flex;
    align-items: center;
    width: 100%;
`
export const BoxFooter = styled.div`
    /* background: #212121; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
