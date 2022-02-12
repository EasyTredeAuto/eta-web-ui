import styled from "styled-components"


export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content:center;
    align-items: center;
    background-color: #212121;
    overflow: hidden;
`
export const BoxLogin = styled.div`
    width: 30%;
    
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    /* background-color: transparent; */
    border-radius: 1em;
    border: 2px solid #14FFEC;
    box-shadow: rgba(147, 233, 255, 0.24) 0px 3px 8px;

`
export const BoxContent = styled.div`
    width: 80%;
`
export const ButtonLogin = styled.button`
    margin: 2rem 0;
    width: 80%;
    border: none;
    background: #0D7377;
    color: #14FFEC;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 1em;
    font-size: 1.5rem;

    &:hover{
        background: #14FFEC ;
        color: #0D7377;
        font-weight: bolder;
        box-shadow: rgba(147, 233, 255, 0.24) 0px 3px 8px;
    }

`

