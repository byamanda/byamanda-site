import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import BaseLink from "./BaseLink"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${props => {
    switch (props.layout) {
      case 1:
        return css`
          justify-content: flex-end;
          align-items: flex-start;
          text-align: left;
          padding: 7em 15%;
        `
      case 2:
        return css`
          justify-content: flex-end;
          align-items: flex-end;
          text-align: right;
          padding: 7em 15%;
        `
      default:
        return css`
          justify-content: center;
          align-items: center;
          text-align: center;
        `
    }
  }}

  @media screen and (max-width: 600px) {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1em;
  }
`

const CTATitle = styled.h1`
  font-size: 3em;
  margin: 0;
  font-family: ${props => props.theme.fonts.body};

  @media screen and (max-width: 600px) {
    font-size: 2em;
  }
`

const CTABlurb = styled.p``

const CTAGroup = styled.div`
  border: 1px solid ${props => props.theme.colors.black};
  padding: 2em;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: inherit;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const CTALink = styled(BaseLink)`
  background-color: ${props => props.theme.colors.primary};
  display: block;
  border: 1px solid ${props => props.theme.colors.black};
  padding: 0.5em;
  transition: all 0.3s;
  text-align: center;

  :hover {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    cursor: pointer;
  }
`

const CallToAction = props => (
  <Container layout={props.layout}>
    <CTAGroup>
      <CTATitle>{props.title}</CTATitle>
      <CTABlurb>{props.blurb}</CTABlurb>
      <CTALink to={props.location}>{props.linkText}</CTALink>
    </CTAGroup>
  </Container>
)

CallToAction.propTypes = {
  layout: PropTypes.number,
  title: PropTypes.string,
  blurb: PropTypes.string,
  location: PropTypes.string,
  linkText: PropTypes.string,
}

export default CallToAction
