import styled from "styled-components"

export const TextHeaderH1 = styled.h1`
  font-weight: ${({ bolder }: { bolder?: string }) => bolder};
  color: ${({ color }: { color?: string }) => color};
`

export const Title = styled.h3`
  font-weight: ${({ bolder }: { bolder?: string }) => bolder};
  color: ${({ color }: { color?: string }) => color};
`

export const TextContent = styled.p`
  color: ${({ color }: { color?: string }) => color};
`
export const TextDetail = styled.span`
  color: ${({ color }: { color?: string }) => color};
`
export const TextName = styled.p`
  color: #1976d2;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`
