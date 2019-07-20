import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import BaseLink from "./BaseLink"
import { FiMapPin } from "react-icons/fi"

import styled from "@emotion/styled"

const rootStyles = css`
  width: 100%;
  height: 400px;
  border: 0;
`

const EventLocation = styled.div`
  text-align: center;
  padding: 1em;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};

  ${BaseLink} {
    color: ${props => props.theme.colors.white};
  }
`

const Map = ({ locationName, address, apiKey }) => (
  <>
    <iframe
      css={rootStyles}
      title={address}
      frameBorder="0"
      src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
        address
      )}&key=${apiKey}`}
      allowFullScreen
    />
    <EventLocation>
      <FiMapPin /> <br />
      {locationName} <br />
      <BaseLink to={`https://maps.google.com?q=${encodeURIComponent(address)}`}>
        {address}
      </BaseLink>
    </EventLocation>
  </>
)

Map.propTypes = {
  address: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}

export default Map
