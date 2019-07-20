import styled from "@emotion/styled"
import leaf from "../images/leaves@2x.png"

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.header};
  font-size: 1.5em;
  margin-bottom: 1em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  ::before {
    content: "";
    background: url(${leaf}) no-repeat;
    display: block;
    margin: 0.5em;
    width: 1em;
    height: 1em;
    background-size: 0.5em 1em;
    transform: scale(-1, 1) rotate(-90deg);
  }

  ::after {
    content: "";
    background: url(${leaf}) no-repeat;
    display: block;
    margin: 0.5em;
    width: 1em;
    height: 1em;
    background-size: 0.5em 1em;
    transform: rotate(-90deg);
  }
`

export default Title
