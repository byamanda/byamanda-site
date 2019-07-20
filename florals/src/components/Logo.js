import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import logo from "../images/logo.png"

const rootStyles = props => css`
  width: ${props.size === "large" ? "200px" : "100px"};
`

const Logo = props => (
  <img css={rootStyles(props)} src={logo} alt="Byamanda Logo" />
)

Logo.propTypes = {
  size: PropTypes.oneOf(["small", "large"]),
}

export default Logo
