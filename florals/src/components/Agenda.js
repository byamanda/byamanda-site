import React from "react"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import moment from "moment"
import { css } from "@emotion/core"

import EventCard from "./EventCard"

const EventButton = styled.button`
  font-size: 1em;
  padding: 1em;
  outline: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 0.25em;
  border: calc(1em / 12) solid ${props => props.theme.colors.primary};
  border-bottom: none;

  :hover {
    background-color: ${props => props.theme.colors.primary};
  }

  ${props =>
    props.selected
      ? css`
          background-color: ${props.theme.colors.primary};
        `
      : css`
          background-color: transparent;
        `}
`

const EventGroup = styled.div``

const EventMonth = styled.div`
  padding: 0.5em;
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  border-top: calc(1em / 24) solid ${props => props.theme.colors.primary};
  border-bottom: calc(1em / 24) solid ${props => props.theme.colors.primary};

  @media screen and (min-width: 900px) {
    top: calc(100px + 1em);
  }
`

const EmptyEvent = styled.div`
  border-left: 0.125em solid ${props => props.theme.colors.primary};
  text-align: center;
  padding: 1em;
  margin: 0 4em;

  @media screen and (max-width: 600px) {
    margin: 0 0.5em;
  }
`

const VIEW_STATES = {
  UPCOMING: 0,
  PAST: 1,
  ALL: 2,
}

class Agenda extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentView: VIEW_STATES.UPCOMING,
    }
  }

  getAppliers() {
    let applier = {}
    let now = moment()

    switch (this.state.currentView) {
      case VIEW_STATES.UPCOMING:
        applier.isValidDate = now.isSameOrBefore.bind(now)
        break
      case VIEW_STATES.PAST:
        applier.isValidDate = now.isAfter.bind(now)
        break
      default:
        applier.isValidDate = x => true
    }

    return applier
  }

  render() {
    let eventList = []
    let { isValidDate } = this.getAppliers()
    let eventCache = []
    let seenFirstEvent = false

    Object.keys(this.props.events).forEach(year => {
      this.props.events[year].forEach((monthEvents, month) => {
        let eventGroup = []
        let monthYear = moment(`${month + 1} ${year}`, "M Y")
        let key = monthYear.format("MMM-YY")

        let monthComponent = (
          <EventMonth key={key} id={key}>
            {monthYear.format("MMMM Y")}
          </EventMonth>
        )

        if (isValidDate(monthYear)) {
          let groupComponent
          let currentList
          eventGroup.push(monthComponent)
          if (monthEvents !== null) {
            if (seenFirstEvent) {
              while (eventCache.length > 0) {
                eventList.push(eventCache.shift())
              }
            } else {
              seenFirstEvent = true
              eventCache = []
            }

            monthEvents
              .filter(e => isValidDate(e.startDate))
              .forEach(e => eventGroup.push(<EventCard key={e.path} {...e} />))

            currentList = eventList
          } else {
            eventGroup.push(
              <EmptyEvent key={`empty-${monthYear.format("MMM-YY")}`}>
                There are no events this month...
              </EmptyEvent>
            )

            currentList = eventCache
          }
          groupComponent = (
            <EventGroup key={`group-${monthYear.format("MMM-YY")}`}>
              {eventGroup}
            </EventGroup>
          )
          currentList.push(groupComponent)
        }
      })
    })

    let pinnedList = this.props.pinned.map(p => (
      <EventCard key={p.path} {...p} />
    ))

    return (
      <div>
        <EventButton
          selected={this.state.currentView === VIEW_STATES.UPCOMING}
          onClick={e => this.setState({ currentView: VIEW_STATES.UPCOMING })}
        >
          Upcoming
        </EventButton>
        <EventButton
          selected={this.state.currentView === VIEW_STATES.PAST}
          onClick={e => this.setState({ currentView: VIEW_STATES.PAST })}
        >
          Past
        </EventButton>
        <EventButton
          selected={this.state.currentView === VIEW_STATES.ALL}
          onClick={e => this.setState({ currentView: VIEW_STATES.ALL })}
        >
          All
        </EventButton>

        <EventGroup>
          <EventMonth>Pinned Events</EventMonth>
          {pinnedList}
        </EventGroup>

        {this.state.currentView !== VIEW_STATES.UPCOMING
          ? eventList.reverse()
          : eventList}
      </div>
    )
  }
}

Agenda.propTypes = {
  events: PropTypes.object,
}

export default Agenda
