import React from "react"
import PropTypes from "prop-types"
import { css, keyframes } from "@emotion/core"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import {
  FaTimes,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"

const fadeIn = keyframes`
    from {
        opacity: 0;
    } 

    to {
        opacity: 1;
    }
`

const Backdrop = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colors.black};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const LightBoxImg = styled(Img)`
  border: 1em solid white;
  backface-visibility: hidden;
`

const LightBoxTitle = styled.h1`
  font-family: ${props => props.theme.fonts.header};
  text-align: center;
  margin: 0;
  padding: 0.5em;
  width: 100%;
  background-color: white;
  color: black;
  position: relative;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    font-size: 1em;
  }
`

const LightBoxButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 0.75em;
  cursor: pointer;
`

const LightBoxMedia = styled.div`
  width: 100%;
  max-width: 900px;

  transition: transform 0.5s ease-in-out;
  position: relative;
  transform-style: preserve-3d;

  @media screen and (min-aspect-ratio: 2/3) {
    width: calc(100vh - 10em);
  }

  ${props =>
    props.show
      ? css`
          transform: rotateX(180deg) rotateZ(180deg);
        `
      : ``}
`

const Ribbon = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  text-align: center;
  font-family: ${props => props.theme.fonts.header};
  font-size: 1.25em;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LightBoxInfo = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  top: 0;
  background-color: white;
  padding: 1em;
  transform: rotateX(180deg) rotateZ(180deg);
`

const LightBoxNextButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  transition: all 0.3s;
  border: none;
  padding: 0.5em;

  cursor: pointer;
  z-index: 2;

  ${props =>
    props.left
      ? css`
          left: 0;
        `
      : ``}

  ${props =>
    props.right
      ? css`
          right: 0;
        `
      : ``}
    
    :hover {
    background-color: ${props => props.theme.colors.primary};
    opacity: 0.5;
    color: ${props => props.theme.colors.black};
  }
`

const rootStyles = css`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  perspective: 1000px;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`

class Lightbox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfo: false,
    }
  }

  handleInfoClick(e) {
    this.setState(state => ({
      showInfo: !state.showInfo,
    }))
  }

  render() {
    return (
      <div css={rootStyles}>
        <Backdrop onClick={this.props.onBlur} />
        <LightBoxTitle>
          <LightBoxButton onClick={this.handleInfoClick.bind(this)}>
            <FaInfoCircle />
          </LightBoxButton>
          {this.props.title}
          <LightBoxButton onClick={this.props.onBlur}>
            <FaTimes />
          </LightBoxButton>
        </LightBoxTitle>

        <LightBoxMedia
          onClick={this.handleInfoClick.bind(this)}
          show={this.state.showInfo}
        >
          <LightBoxInfo>{this.props.children}</LightBoxInfo>
          <LightBoxImg fluid={this.props.media} alt={this.props.title} />
        </LightBoxMedia>
        <Ribbon>
          {this.props.showLeftBtn ? (
            <LightBoxNextButton onClick={e => this.props.next(-1)} left>
              <FaChevronLeft />
            </LightBoxNextButton>
          ) : (
            <div />
          )}
          {this.props.ribbon}
          {this.props.showRightBtn ? (
            <LightBoxNextButton onClick={e => this.props.next(1)} right>
              <FaChevronRight />
            </LightBoxNextButton>
          ) : (
            <div />
          )}
        </Ribbon>
      </div>
    )
  }
}

Lightbox.propTypes = {
  onBlur: PropTypes.func,
  title: PropTypes.string,
  media: PropTypes.object,
  showLeftBtn: PropTypes.bool,
  showRightBtn: PropTypes.bool,
  ribbon: PropTypes.node,
  next: PropTypes.func,
}

export default Lightbox
