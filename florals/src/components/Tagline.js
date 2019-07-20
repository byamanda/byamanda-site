import React from "react"
import PropTypes from "prop-types"
import tagline from "../images/tagline.svg"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

const rootStyles = css`
  width: 100%;
  max-width: 900px;
  display: block;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2em;
  min-height: 300px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${props =>
    !props.hideGradient
      ? css`
          background-image: linear-gradient(
            ${props.theme.colors.primary},
            white
          );
        `
      : ``}
`

const Tagline = props => (
  <Container {...props}>
    <img css={rootStyles} src={tagline} alt="Florals By Amanda" />
  </Container>
)

Tagline.propTypes = {
  hideGradient: PropTypes.bool,
}

Tagline.defaultProps = {
  hideGradient: false,
}

export default Tagline
