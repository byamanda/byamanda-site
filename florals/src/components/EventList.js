import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import Agenda from "./Agenda"
import Calendar from "./Calendar"

const EventFooter = styled.div`
  text-align: center;
  font-size: 2em;
  margin: 1em;
`

// const ViewToggleContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   margin-bottom: 1em;
// `

// const ViewToggle = styled.button`
//   font-size: 1em;
//   padding: 1em;
//   outline: none;
//   font-weight: bold;
//   cursor: pointer;
//   transition: all 0.3s;
//   border: calc(1em / 12) solid ${props => props.theme.colors.primary};

//   :hover {
//     background-color: ${props => props.theme.colors.primary};
//   }

//   ${props =>
//     props.active
//       ? css`
//           background-color: ${props.theme.colors.primary};
//         `
//       : css`
//           background-color: transparent;
//         `}
// `

const VIEWS = {
  AGENDA: 0,
  CALENDAR: 1,
}

class EventList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentView: VIEWS.AGENDA,
    }
  }

  groupEventsByMonthAndYear(events) {
    return events.reduce(
      (results, e) => {
        let { events, pinned } = results

        let month = e.startDate.get("month")
        let year = e.startDate.get("year")

        if (isNaN(year)) {
          pinned.push(e)
          return results
        }

        if (events[year] === undefined) {
          events[year] = Array(12).fill(null)
        }

        if (events[year][month] === null) {
          events[year][month] = []
        }

        events[year][month].push(e)

        return results
      },
      {
        events: {},
        pinned: [],
      }
    )
  }

  render() {
    let monthYearMap = this.groupEventsByMonthAndYear(this.props.events)

    let view = null

    switch (this.state.currentView) {
      case VIEWS.CALENDAR:
        view = <Calendar {...monthYearMap} />
        break
      case VIEWS.AGENDA:
        view = <Agenda {...monthYearMap} />
        break
      default:
        view = null
    }

    return (
      <div>
        {view}

        <EventFooter>
          Keep checking in to see where I'm going to be next!
        </EventFooter>
      </div>
    )
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
}

export default EventList
