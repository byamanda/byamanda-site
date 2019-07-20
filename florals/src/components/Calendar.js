import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import moment from "moment"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { FaTimes } from "react-icons/fa"
import EventCard from "./EventCard"

const rootStyles = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 4em 3em 1fr;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const CalendarItem = styled.div`
  height: 120px;
  transition: all 0.3s;
  text-align: center;

  ${props =>
    props.grayedout
      ? css``
      : css`
          cursor: pointer;

          :hover {
            background-color: ${props.theme.colors.primary};
          }
        `}
`

const CalendarDate = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 2em;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5em;

  ${props =>
    props.today
      ? css`
          background-color: ${props.theme.colors.secondary};
          color: ${props.theme.colors.white};
        `
      : ``}
`

const CalendarHeader = styled.div`
  text-align: center;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 0.5em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
`

const CalendarMonth = styled.div`
  grid-column: 1 / 8;
  text-align: center;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  display: flex;
  font-size: 1.5em;
  justify-content: space-between;
  align-items: center;
`

const CalendarNextMonthBtn = styled.button`
  border: none;
  background-color: rgba(255, 255, 255, 0);
  color: ${props => props.theme.colors.white};
  height: 100%;
  transition: all 0.3s;
  line-height: 100%;
  cursor: pointer;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const CalendarEvent = styled.div`
  width: 1.5em;
  height: 1.5em;
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 1em;
  margin: 1em auto;
  font-size: 0.75em;
  color: ${props => props.theme.colors.white};
`

const CalendarDrawerTitle = styled.h1`
  text-align: center;
`

const CalendarDrawerToggle = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  border: none;
  background-color: transparent;
  cursor: pointer;
`

const CalendarDrawer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  z-index: 2;
  width: 100%;
  max-width: 600px;
  overflow: scroll;
  transform: translate(100%, 0);
  transition: all 0.3s;

  ${props =>
    props.show
      ? css`
          transform: translate(0, 0);
        `
      : css`
          transform: translate(100%, 0);
        `}
`

const Backdrop = styled.div`
  background-color: ${props => props.theme.colors.black};
  opacity: 0.5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  transition: all 0.3s;

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
`

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: moment().startOf("month"),
      datesInDrawer: [],
    }
  }

  handleOpenDrawer(arr) {
    this.setState({
      datesInDrawer: arr,
    })
  }

  handleBlur(e) {
    this.setState({
      datesInDrawer: [],
    })
  }

  handleClick(n) {
    this.setState(state => ({
      current: moment(state.current.add(n, "month")),
    }))
  }

  render() {
    let items = []
    let headers = Array(7)
      .fill()
      .map((_, index) => (
        <CalendarHeader key={`header-${index}`}>
          {moment(`${index}`, "d").format("ddd")}
        </CalendarHeader>
      ))

    let currentCopy = moment(this.state.current)
    let beginningOffset = currentCopy.weekday()
    let numberOfDays = currentCopy.endOf("month").get("date")
    currentCopy.startOf("month")

    let monthEvents =
      this.props.events[currentCopy.get("year")] &&
      this.props.events[currentCopy.get("year")][currentCopy.get("month")]
    let eventIndex = 0

    for (var i = 0; i < beginningOffset; i++) {
      items.push(<CalendarItem key={`ci-${i}`} grayedout />)
    }

    for (var i = 0; i < numberOfDays; i++) {
      let hasEvent = null
      let eventCount = []
      while (
        monthEvents &&
        eventIndex < monthEvents.length &&
        monthEvents[eventIndex].startDate.isSame(currentCopy, "day")
      ) {
        eventCount.push(eventIndex)
        eventIndex++
      }

      if (eventCount.length > 0) {
        hasEvent = <CalendarEvent>{eventCount.length}</CalendarEvent>
      }

      items.push(
        <CalendarItem
          onClick={e => this.handleOpenDrawer(eventCount)}
          key={`ci-${i + beginningOffset}`}
        >
          <CalendarDate today={currentCopy.isSame(moment(), "day")}>
            {currentCopy.format("D")}
          </CalendarDate>

          {hasEvent}
        </CalendarItem>
      )

      currentCopy.add(1, "day")
    }

    return (
      <div css={rootStyles}>
        <CalendarMonth>
          <CalendarNextMonthBtn onClick={e => this.handleClick(-1)}>
            <FiChevronLeft />
          </CalendarNextMonthBtn>
          {this.state.current.format("MMMM Y")}
          <CalendarNextMonthBtn onClick={e => this.handleClick(1)}>
            <FiChevronRight />
          </CalendarNextMonthBtn>
        </CalendarMonth>
        {headers}
        {items}

        <Backdrop
          show={this.state.datesInDrawer.length > 0}
          onClick={e => this.handleBlur(e)}
        />
        <CalendarDrawer show={this.state.datesInDrawer.length > 0}>
          <CalendarDrawerToggle onClick={e => this.handleBlur(e)}>
            <FaTimes />
          </CalendarDrawerToggle>
          <CalendarDrawerTitle>
            {monthEvents && monthEvents[0].startDate.format("MMMM Do Y")} Events
          </CalendarDrawerTitle>
          {this.state.datesInDrawer.map(ndx => (
            <EventCard key={monthEvents[ndx].path} {...monthEvents[ndx]} />
          ))}
        </CalendarDrawer>
      </div>
    )
  }
}

Calendar.propTypes = {
  events: PropTypes.object,
}

export default Calendar
