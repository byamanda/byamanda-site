import React from "react"
import PropTypes from "prop-types"
import BaseLink from "./BaseLink"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FaBars, FaTimes } from "react-icons/fa"

const Menu = styled.ul`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 1em;
  z-index: 2;
  background-color: white;

  display: flex;
  width: 100%;
  max-width: 100%;
  height: calc(100px + 2em);
  justify-content: space-between;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 900px) {
    bottom: 0;
    display: block;
    height: auto;
    max-width: 450px;
    transition: transform 0.3s ease-in-out;
    overflow: scroll;

    ${props =>
      !props.menuOpen
        ? css`
            transform: translate(-110%);
          `
        : ``}
  }
`

const MenuGroup = styled.div`
  @media screen and (min-width: 900px) {
    display: flex;
    align-items: center;
  }
`

const Backdrop = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  transition: opacity 0.3s;
  display: none;

  @media screen and (max-width: 900px){
    display: block;
    ${props =>
      props.show
        ? css`
            pointer-events: all;
            opacity: 0.5;
          `
        : css`
            pointer-events: none;
            opacity: 0;
          `}
  }
`

const MenuItem = styled.li`
  padding: 0.75em;
  border-bottom: 1px dashed ${props => props.theme.colors.black};
  text-align: center;

  @media screen and (min-width: 900px) {
    border-color: transparent;
  }
`

const MenuHeader = styled.div`
  @media screen and (min-width: 900px) {
    justify-self: flex-start;
  }
`

const MenuClose = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;

  @media screen and (min-width: 900px) {
    display: none;
  }
`

const Toggle = styled.div`
  position: fixed;
  right: 1em;
  bottom: 5.5em;
  z-index: 2;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  width: 85px;
  height: 85px;
  border-radius: 100px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    display: block;
    width: 50%;
    height: 50%;
  }

  @media screen and (min-width: 900px) {
    display: none;
  }
`

const PhantomMenu = styled.div`
  display: none;

  @media screen and (min-width: 900px) {
    display: block;
    width: 100%;
    height: calc(100px + 2em);
  }
`

class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }
  }

  render() {
    let navItems = this.props.links.map(l => (
      <BaseLink to={l.url} key={l.title} onClick={e => this.setState({ menuOpen: false })}>
        <MenuItem>{l.title}</MenuItem>
      </BaseLink>
    ))

    return (
      <nav>
        <Toggle onClick={e => this.setState({ menuOpen: true })}>
          <FaBars />
        </Toggle>

        <Backdrop
          onClick={e => this.setState({ menuOpen: false })}
          show={this.state.menuOpen}
        />

        <PhantomMenu />

        <Menu menuOpen={this.state.menuOpen}>
          <MenuClose onClick={e => this.setState({ menuOpen: false })}>
            <FaTimes />
          </MenuClose>

          <MenuHeader>{this.props.children}</MenuHeader>
          <MenuGroup>{navItems}</MenuGroup>
        </Menu>
      </nav>
    )
  }
}

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

Navigation.defaultProps = {
  links: [],
}

export default Navigation
