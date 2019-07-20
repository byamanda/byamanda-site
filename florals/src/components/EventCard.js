import React from "react"
import styled from "@emotion/styled"

import { FiMapPin, FiCalendar } from "react-icons/fi"

import BaseLink from "../components/BaseLink"

const EventInfo = styled.div`
  div {
    padding: 1em;
  }
`

const EventTitle = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin-bottom: 0.5em;

  ::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 1px;
    background-color: ${props => props.theme.colors.black};
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease-out;
  }
`
const EventContent = styled(BaseLink)`
  padding: 1em;
  margin: 1em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  flex: 1 1 auto;
  text-align: center;

  :hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props => props.theme.colors.black};

    ${EventTitle} ::after {
      background-color: ${props => props.theme.colors.black};
      width: 80%;
    }
  }
`

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-left: 0.125em solid ${props => props.theme.colors.primary};
  position: relative;
  z-index: 0;
  margin-left: 4em;

  @media screen and (max-width: 600px) {
    margin-left: 0.5em;
  }
`

const EventDate = styled.div`
  padding: 1.5em 0.75em;
  position: absolute;
  right: 100%;
  text-align: center;
  font-size: 1.25em;
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ::before {
    content: "";
    width: 0.75em;
    height: 0.75em;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 1em;
    position: absolute;
    left: 100%;
    transform: translate(-50%, 0);
  }

  @media screen and (max-width: 600px) {
    position: static;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0.5em 1em;

    & * {
      margin-right: 0.5em;
    }

    ::before {
      left: 0;
    }
  }
`

const EventCard = props => (
  <EventItem key={props.path}>
    {props.startDate.isValid() ? (
      <EventDate>
        <FiCalendar />
        <div>{props.startDate.format("ddd")}</div>
        <div>{props.startDate.format("D")}</div>
      </EventDate>
    ) : null}
    <EventContent to={props.path}>
      <EventTitle>{props.title}</EventTitle>
      <EventInfo>
        <div>{props.content}</div>
        <div>
          <FiMapPin />
          <br />
          {props.locationName} <br /> {props.address}
        </div>
      </EventInfo>
    </EventContent>
  </EventItem>
)

export default EventCard
