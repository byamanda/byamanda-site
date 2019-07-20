import React from "react"
import PropTypes from "prop-types"
import { css, keyframes } from "@emotion/core"
import styled from "@emotion/styled"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`
const rootStyles = css`
  height: 80vh;
  position: relative;

  @media screen and (max-width: 600px) {
    height: 95vh;
  }
`

const CarouselItem = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
`

const CarouselButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  display: block;
  font-size: 100px;
  border: none;
  background-color: transparent;
  padding: 0;
  transition: all 0.5s;
  cursor: pointer;
  color: ${props => props.theme.colors.black};

  :hover {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
    opacity: 0.3;
  }

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

    @media screen and (max-width: 900px) {
    display: none;
  }
`

const CarouselIndexGroup = styled.div`
  display: flex;
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%, 0);
  margin: auto;
`

const CarouselIndexButton = styled.button`
  width: 0.75em;
  height: 0.75em;
  margin: 0.35em;
  padding: 0;
  border: 0;
  border-radius: 1em;
  border: 0.125em solid ${props => props.theme.colors.secondary};
  background-color: transparent;
  opacity: 0.7;
  transition: all 1s;
  cursor: pointer;

  ${props =>
    props.active
      ? css`
          width: 2em;
          background-color: ${props.theme.colors.secondary};
        `
      : ``}
`

class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      next: null,
      startX: null,
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
  }

  resetTimer() {
    clearTimeout(this.timerID)

    this.timerID = setTimeout(() => {
      this.moveForward()
    }, this.props.timer)
  }

  moveForward() {
    this.resetTimer()

    this.setState((state, props) => ({
      next: (state.current + 1) % props.numStates,
    }))
  }

  moveBackward() {
    this.resetTimer()

    this.setState((state, props) => ({
      next: state.current - 1 >= 0 ? state.current - 1 : props.numStates - 1,
    }))
  }

  moveTo(n) {
    this.resetTimer()

    this.setState((state, props) => ({
      next: n >= 0 && n < props.numStates ? n : state.current,
    }))
  }

  componentDidMount() {
    this.timerID = setTimeout(() => {
      this.moveForward()
    }, this.props.timer)
  }

  componentWillUnmount() {
    clearTimeout(this.timerID)
  }

  handleMouseDown(e) {
    if (e.type === "mousedown") {
      this.setState({ startX: e.clientX })
    } else {
      this.setState({ startX: e.targetTouches[0].clientX })
    }
  }

  handleMouseMove(e) {
    if (this.state.startX !== null) {
      let dx
      if (e.type === "mousemove") {
        dx = e.clientX - this.state.startX
      } else {
        dx = e.targetTouches[0].clientX - this.state.startX
      }

      if (dx < -150) {
        this.moveForward()
        this.setState({ startX: null })
      } else if (dx > 150) {
        this.moveBackward()
        this.setState({ startX: null })
      }
    }
  }

  handleMouseUp(e) {
    this.setState({ startX: null })
  }

  handleAnimationEnd(e) {
    this.setState(state => ({
      current: state.next,
      next: null,
    }))
  }

  render() {
    let quickMoveButtons = []
    for (var i = 0; i < this.props.numStates; i++) {
      quickMoveButtons.push(
        (_i => (
          <CarouselIndexButton
            active={_i === this.state.current}
            key={_i}
            onClick={e => this.moveTo(_i)}
          />
        ))(i)
      )
    }

    return (
      <div css={rootStyles}>
        <CarouselItem
          key={this.state.current}
          onTouchStart={this.handleMouseDown}
          onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          {this.props.render(this.state.current)}
        </CarouselItem>
        {this.state.next !== null && this.state.next !== this.state.current ? (
          <CarouselItem
            key={this.state.next}
            onAnimationEnd={this.handleAnimationEnd}
          >
            {this.props.render(this.state.next)}
          </CarouselItem>
        ) : null}
        {this.props.numStates > 1 ? (
          <>
            <CarouselButton left onClick={e => this.moveBackward()}>
              <FiChevronLeft />
            </CarouselButton>
            <CarouselButton right onClick={e => this.moveForward()}>
              <FiChevronRight />
            </CarouselButton>

            <CarouselIndexGroup>{quickMoveButtons}</CarouselIndexGroup>
          </>
        ) : null}
        }
      </div>
    )
  }
}

Carousel.propTypes = {
  render: PropTypes.func,
  numStates: PropTypes.number,
  timer: PropTypes.number,
}

Carousel.defaultProps = {
  numStates: 1,
  timer: 10000,
}

export default Carousel
