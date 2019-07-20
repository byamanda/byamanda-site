import React from "react"
import { Global, css } from "@emotion/core"
import emotionNormalize from "emotion-normalize"

const rootStyles = theme => css`
  ${emotionNormalize}

  @import url('https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans+Condensed:300&display=swap');

  html,
  body {
    color: ${theme.colors.black};
    font-family: ${theme.fonts.body};
    font-size: 20px;
    line-height: 1.5em;
  }

  * {
    box-sizing: border-box;
    line-height: 1.5em;
  }

  a {
    color: ${theme.colors.black};
    text-decoration: none;
  }

  button,
  input,
  textarea {
    border: 1px solid ${theme.colors.white};
    color: ${theme.colors.black};
    font-family: ${theme.fonts.body};
    outline: none;
  }

  ul {
    padding: 0;
    list-style-type: none;
  }
`

const BaseStyle = () => <Global styles={rootStyles} />

export default BaseStyle
