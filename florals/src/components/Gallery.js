import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import GridLayout from "./GridLayout"
import ArtPiece from "./ArtPiece"
import Lightbox from "./Lightbox"
import InfoTable from "./InfoTable"

const GalleryInfo = styled.div`
  font-size: 2em;
  text-align: center;
  padding: 1em;
`

class Gallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lightbox: null,
    }
  }

  handleClick(artPiece) {
    let ndx = this.props.pieces.findIndex(p => p.path === artPiece)

    this.setState({
      lightbox: ndx,
    })
  }

  handleBlur(e) {
    this.setState({
      lightbox: null,
    })
  }

  handleNext(amount) {
    this.setState(state => ({
      lightbox: state.lightbox + amount,
    }))
  }

  render() {
    let artPieces = this.props.pieces.map(piece => {
      piece.imgSharp = piece.image.localFiles[0].childImageSharp.fluid

      return (
        <ArtPiece
          key={piece.path}
          onClick={this.handleClick.bind(this)}
          {...piece}
        />
      )
    })

    let lightboxPiece = null
    if (this.state.lightbox !== null) {
      lightboxPiece = this.props.pieces[this.state.lightbox]
    }

    return (
      <>
        <GridLayout cols={this.props.cols}>{artPieces}</GridLayout>
        <GalleryInfo>
          Interested in one of these pieces? Send me an email!
        </GalleryInfo>
        {lightboxPiece !== null ? (
          <Lightbox
            showLeftBtn={this.state.lightbox > 0}
            showRightBtn={this.state.lightbox < this.props.pieces.length - 1}
            next={this.handleNext.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            title={lightboxPiece.title}
            ribbon={!lightboxPiece.stock ? `Sold!` : null}
            media={lightboxPiece.image.localFiles[0].childImageSharp.fluid}
          >
            <InfoTable
              rows={[
                { key: "Medium", value: lightboxPiece.medium },
                { key: "Size", value: lightboxPiece.size },
              ]}
            />
          </Lightbox>
        ) : null}
      </>
    )
  }
}

Gallery.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.number,
}

Gallery.defaultProps = {
  cols: 2,
}

export default Gallery
