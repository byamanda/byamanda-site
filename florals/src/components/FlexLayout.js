import styled from "@emotion/styled"
import PropTypes from "prop-types"

const FlexLayout = styled.div`
  display: flex;
  flex-direction: ${props => props.dir};
  align-items: center;
  justify-content: center;
`

FlexLayout.propTypes = {
  dir: PropTypes.string,
}

FlexLayout.defaultProps = {
  dir: "row",
}

export default FlexLayout
