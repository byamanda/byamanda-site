import React from "react"

class ThumbtackStarWidget extends React.Component {
  componentDidMount() {
    const starScript = document.createElement("script")
    starScript.src =
      "https://www.thumbtack.com/profile/widgets/scripts/?service_id=u:7mQTSwBcretQ&widget_id=review&type=star"

    document.body.appendChild(starScript)
  }

  render() {
    return (
      <div id="tt-review-widget-star">
        <img
          src="https://static.thumbtackstatic.com/media/logos/thumbtack/wordmark.svg"
          alt="Thumbtack"
          className="tt-logo"
        />
        <span target="_blank">
          <div>Face Painting by Amanda</div>
        </span>
        <div id="tt-dynamic">
          <img
            src="https://static.thumbtackstatic.com/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
            alt=""
          />
          <img
            src="https://static.thumbtackstatic.com/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
            alt=""
          />
          <img
            src="https://static.thumbtackstatic.com/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
            alt=""
          />
          <img
            src="https://static.thumbtackstatic.com/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
            alt=""
          />
          <img
            src="https://static.thumbtackstatic.com/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
            alt=""
          />
          <span>27 reviews</span>
        </div>
      </div>
    )
  }
}

export default ThumbtackStarWidget
