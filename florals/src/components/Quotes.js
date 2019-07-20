import React from "react"
import PropTypes from "prop-types"
import QuoteItem from "./QuoteItem"

const Quotes = ({ list, expandable }) => {
  const quoteList = list.map(data => (
    <QuoteItem expandable={expandable} key={data.id} {...data} />
  ))

  return <div>{quoteList}</div>
}

Quotes.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
}

export default Quotes
