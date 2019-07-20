import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import FlexLayout from "./FlexLayout"
import BaseLink from "./BaseLink"
import GridLayout from "./GridLayout"

const Stats = styled.div`
  text-align: center;
`
const ProfilePicture = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 100px;
`

const Instagram = ({ images, user, handle, cols }) => {
  let igImages = images.map(({ id, image }) => {
    return (
      <BaseLink key={id} to={`https://instagram.com/p/${id}`}>
        <Img fluid={image} alt="" />
      </BaseLink>
    )
  })

  return (
    <div>
      <FlexLayout css={{ margin: "1em" }} dir="column">
        <ProfilePicture
          src={user.profile_pic_url}
          alt="Instagram Profile Picture"
        />
        <BaseLink to={handle}>@{user.username}</BaseLink>
        <Stats>{user.edge_followed_by.count} Followers</Stats>
      </FlexLayout>

      <GridLayout cols={cols} gap={`0.5em`}>
        {igImages}
      </GridLayout>
    </div>
  )
}

Instagram.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    profile_pic_url: PropTypes.string,
    edge_followed_by: PropTypes.object,
    handle: PropTypes.string,
  }),
  handle: PropTypes.string,
  cols: PropTypes.number,
}

Instagram.defaultProps = {
  images: [],
  cols: 3,
}

export default Instagram
