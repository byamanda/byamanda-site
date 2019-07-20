import React from "react"
import BaseLink from "./BaseLink"
import { FiArrowLeft } from "react-icons/fi"

const BreadCrumb = props => (
  <div>
    <BaseLink {...props}>
      <FiArrowLeft />
      {props.children}
    </BaseLink>
  </div>
)

export default BreadCrumb
