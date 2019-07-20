import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

const rootStyles = css`
  width: 100%;
`

const InfoTableRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.25em 0;
  border-bottom: 1px dashed black;
  justify-content: space-between;
`

const InfoTableItem = styled.div`
  ${props =>
    props.header
      ? css`
          font-weight: bold;
          width: 100px;
        `
      : css`
          font-style: italic;
          width: 70%;
        `}
`

const InfoTable = props => {
  let rows = props.rows.map(r => (
    <InfoTableRow key={r.key}>
      <InfoTableItem header>{r.key}</InfoTableItem>
      <InfoTableItem>{r.value}</InfoTableItem>
    </InfoTableRow>
  ))

  return <div css={rootStyles}>{rows}</div>
}

export default InfoTable
