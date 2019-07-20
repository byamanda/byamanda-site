import styled from "@emotion/styled"

export const Input = styled.input`
  color: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.black};
  padding: 0.5em;
  transition: all 0.3s;
  width: 100%;

  :focus {
    border-color: ${props => props.theme.colors.secondary};
  }
`