import React from "react"
import PropTypes from "prop-types"
import { FiCalendar } from "react-icons/fi"
import { css } from "@emotion/core"

const rootStyles = css`
  text-align: center;
  font-size: 1em;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    margin: 0.25em 1em;
    border-bottom: 1px dashed #505050;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`

const DateView = ({ startDate, endDate, noTime }) => {
  if (noTime && endDate.isValid()) {
    return (
      <div css={rootStyles}>
        <FiCalendar />
        <div>Starts: {startDate.format("ddd MMM Do, Y")}</div>
        <div>Ends: {endDate.format("ddd MMM Do, Y")}</div>
      </div>
    )
  } else if (endDate.isValid()) {
    return (
      <div css={rootStyles}>
        <FiCalendar />
        <div>Starts: {startDate.format("ddd MMM Do, Y, h:mm A")}</div>
        <div>Ends: {endDate.format("ddd MMM Do, Y, h:mm A")}</div>
      </div>
    )
  } else {
    return null
  }
}

DateView.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  noTime: PropTypes.bool,
}

export default DateView
