import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import GridLayout from "./GridLayout"

const Collage = ({ images }) => {
  const imageList = images.map(({ name, image }) => {
    return <Img key={name} fluid={image} />
  })

  return <GridLayout>{imageList}</GridLayout>
}

Collage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.image,
    })
  ),
}

export default Collage
