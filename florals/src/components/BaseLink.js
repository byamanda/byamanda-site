import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

const BaseLink = styled(Link)`
  transition: all 0.3s;
  color: ${props => props.theme.colors.black};

  &:hover {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`
BaseLink.propTypes = {
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  partiallyActive: PropTypes.bool,
}

export default BaseLink
