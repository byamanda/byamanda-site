import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import BaseLink from "./BaseLink"
import {
  FiInstagram,
  FiYoutube,
  FiFacebook,
  FiMail,
  FiGithub,
} from "react-icons/fi"

const FootNote = styled.div`
  color: ${props => props.theme.colors.white};
  font-size: 0.75em;
  font-style: italic;
  padding: 1em;
`

const SocialLink = styled(BaseLink)`
  color: ${props => props.theme.colors.white};
  margin: 0.5em;
`

const rootStyles = theme => css`
  padding: 1em;
  margin-top: 3em;
  text-align: center;
  background-color: ${theme.colors.black};
`

const Footer = ({ social }) => {
  const { instagram, youtube, facebook, email } = social

  return (
    <footer css={rootStyles}>
      <div>
        <SocialLink to={instagram}>
          <FiInstagram />
        </SocialLink>
        <SocialLink to={youtube}>
          <FiYoutube />
        </SocialLink>
        <SocialLink to={facebook}>
          <FiFacebook />
        </SocialLink>
        <SocialLink to={`mailto:${email}`}>
          <FiMail />
        </SocialLink>
      </div>
      <FootNote>
        <SocialLink to="https://github.com/joshrasmussen34">
          <FiGithub />
        </SocialLink>{" "}
        Created by Joshua Rasmussen
      </FootNote>
    </footer>
  )
}

Footer.propTypes = {
  social: PropTypes.shape({
    instagram: PropTypes.string,
    youtube: PropTypes.string,
    facebook: PropTypes.string,
    email: PropTypes.string,
  }),
}

export default Footer
