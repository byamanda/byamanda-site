import styled from "@emotion/styled"

export const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  display: block;
  border: 1px solid ${props => props.theme.colors.black};
  margin: 0 auto;
  padding: 0.5em;
  transition: all 0.3s;
  width: 50%;

  :hover {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    cursor: pointer;
  }
`