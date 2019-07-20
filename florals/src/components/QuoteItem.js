import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

const rootStyles = css`
  border: 1px solid black;
  padding: 1em;
  margin: 1em 0;
  overflow: hidden;
`

const Content = styled.p`
  font-style: italic;
  position: relative;
`

const Author = styled.div`
  text-align: right;

  ::before {
    content: "-";
  }
`

const ReadMoreButton = styled.button`
  border: none;
  background-color: transparent;
  display: inline;
  cursor: pointer;
`

class QuoteItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
    }
  }

  handleToggle(e) {
    this.setState(state => ({
      expanded: !state.expanded,
    }))
  }

  render() {
    let content =
      !this.props.expandable || this.state.expanded
        ? this.props.quote
        : `${this.props.quote.substring(0, 200)}...`

    return (
      <blockquote css={rootStyles}>
        <Content>"{content}"</Content>

        {this.props.expandable ? (
          <ReadMoreButton onClick={e => this.handleToggle(e)}>
            ({this.state.expanded ? `read less...` : `read more...`})
          </ReadMoreButton>
        ) : null}
        <Author>{this.props.name}</Author>
      </blockquote>
    )
  }
}

QuoteItem.propTypes = {
  name: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  expandable: PropTypes.bool,
}

QuoteItem.defaultProps = {
  expandable: false,
}

export default QuoteItem
