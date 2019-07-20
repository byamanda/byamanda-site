import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"

import Navigation from "./Navigation"
import Footer from "./Footer"
import Logo from "./Logo"
import Tagline from "./Tagline"
import BaseStyle from "./BaseStyle"
import BaseLink from "./BaseLink"

import { withWindow } from "../util"

const theme = {
  colors: {
    primary: `#fdd5d5`,
    secondary: `#7d3654`,
    black: `#505050`,
    white: `#eeeeee`,
  },
  fonts: {
    body: `'Open Sans Condensed', sans-serif`,
    header: `'Amatic SC', cursive`,
  },
}

const LINKS = [
  { url: "/", title: "The Artist" },
  { url: "/facepainting", title: "Facepainting" },
  { url: "/gallery", title: "Gallery" },
  { url: "/events", title: "Events and Showcases" },
  { url: "https://www.etsy.com/shop/AmandaDesireeEvelyn", title: "The Shop" },
  { url: "/contact", title: "Contact" },
]

const Main = styled.div`
  margin: 0 auto;
  max-width: 900px;
  min-height: 100vh;
  padding: 0 1em 1em 1em;
`

const Layout = props => {
  let content
  if (typeof props.children === "function") {
    content = props.children(props.window, Main)
  } else {
    content = <Main>{props.children}</Main>
  }

  let small = props.window.width < 900

  return (
    <ThemeProvider theme={theme}>
      <BaseStyle />

      <header>
        <Navigation key={small} mobile={small} links={LINKS}>
          <BaseLink to="/">
            <Logo size="small" />
          </BaseLink>
        </Navigation>

        {props.header || <Tagline />}
      </header>

      {content}

      <Footer social={props.social} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  social: PropTypes.object,
  window: PropTypes.object,
}

export default withWindow(Layout)
