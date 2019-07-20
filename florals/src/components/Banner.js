import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    white,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primary}
  );
  opacity: 0.5;
`

const rootStyle = css`
  height: 100%;
  position: relative;
`

const Banner = ({ bgImage, children }) => {
  return (
    <BackgroundImage css={rootStyle} fluid={bgImage}>
      <Filter />
      {children}
    </BackgroundImage>
  )
}

Banner.propTypes = {
  bgImage: PropTypes.object.isRequired,
}

export default Banner
