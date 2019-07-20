import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

const StockRibbon = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  padding: 0 4em;
  position: absolute;
  right: 0;
  top: 0;
  transform-origin: center;
  transform: translate(25%, 100%) rotate(45deg);
`

const rootStyle = css`
  position: relative;
  border: 1em solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
  }
`

const ArtImg = styled(Img)``

const ArtTitle = styled.div`
  text-align: center;
  margin-top: 0.5em;
`

const ArtPiece = props => {
  let stockTag = ``
  if (!props.stock) {
    stockTag = <StockRibbon>Sold!</StockRibbon>
  }

  return (
    <div
      css={rootStyle}
      className={props.className}
      onClick={e => props.onClick(props.path)}
    >
      <ArtImg fluid={props.imgSharp} alt={props.title} />
      <ArtTitle>{props.title}</ArtTitle>
      {stockTag}
    </div>
  )
}

ArtPiece.propTypes = {
  title: PropTypes.string.isRequired,
  medium: PropTypes.string,
  size: PropTypes.string,
  stock: PropTypes.bool,
  imgSharp: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

ArtPiece.defaultProps = {
  medium: "Acrylic",
  size: '12" x 12"',
  stock: true,
}

export default ArtPiece
