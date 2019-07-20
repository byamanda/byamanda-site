import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

import DateView from "./DateView"

const markdownStyles = css`
  padding: 1em;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;

  & a {
    text-decoration: underline;
  }
`

const Event = ({ className, ...event }) => (
  <div className={className}>
    <DateView {...event} />
    <div
      css={markdownStyles}
      dangerouslySetInnerHTML={{ __html: event.content }}
    />
  </div>
)

Event.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  noTime: PropTypes.bool,
  locationName: PropTypes.string,
  address: PropTypes.string,
  content: PropTypes.string,
}

export default Event
