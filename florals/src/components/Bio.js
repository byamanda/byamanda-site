import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import Img from "gatsby-image"

const Bio = ({ headShot }) => {
  return (
    <div>
      <p>
        My inspiration stems from my environment, in which I’ve had the freedom
        to dream, explore and combine artistic mediums into simultaneously
        whimsical and sincere creations. My work mimics nature - both botanical
        and human. In the seeming simplicity of plants and flowers, I
        incorporate intricacy using organic movement and layers, often expressed
        in acrylic paintings over vintage maps, bright fruit prints splashed
        onto rocks, or ink, watercolor and gouache mixed media pieces with stark
        backgrounds. In everything I make, I hope you find some encouragement to
        follow your dreams and stop to smell the roses on your way.
      </p>

      <p>
        When not in my studio, I like to get lost exploring hiking trails, rural
        roads and local coffee shops. Besides my art, my greatest loves are my
        loved ones, traveling and my orange tabby, Dinah.
      </p>
    </div>
  )
}

Bio.propTypes = {
  headShot: PropTypes.object,
}

export default Bio
