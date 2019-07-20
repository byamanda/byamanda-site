import React from "react"

class ThumbtackProfileWidget extends React.Component {
  componentDidMount() {
    const profileScript = document.createElement("script")
    profileScript.src =
      "https://www.thumbtack.com/profile/widgets/scripts/?service_id=u:7mQTSwBcretQ&widget_id=profile"

    document.body.appendChild(profileScript)
  }

  render() {
    return (
      <div target="_blank">
        <img
          style={{ height: 128, width: 128 }}
          src="https://static.thumbtackstatic.com/media/pages/profile/standard-widgets/pro-svg/orange/2018.svg"
          alt=""
        />
      </div>
    )
  }
}

export default ThumbtackProfileWidget
