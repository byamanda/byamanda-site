import React from "react"

const DEFAULT_WIDTH = 900

export const withWindow = PageComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      if (typeof window !== `undefined`) {
        this.state = {
          width: window.innerWidth,
          scroll: window.pageYOffset
        }
      } else {
        this.state = {
          width: DEFAULT_WIDTH,
          scroll: 0
        }
      }

      this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
      this.updateScrollLocation = this.updateScrollLocation.bind(this)
    }

    componentDidMount() {
      window.addEventListener("resize", this.updateWindowDimensions)
      window.addEventListener("scroll", this.updateScrollLocation)
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions)
      window.removeEventListener("scroll", this.updateScrollLocation)
    }

    updateWindowDimensions() {
      this.setState({
        width: window.innerWidth,
      })
    }

    updateScrollLocation() {
      this.setState({
        scroll: window.pageYOffset,
      })
    }

    render() {
      return <PageComponent window={this.state} {...this.props} />
    }
  }
}

export const delayUnmount = Component => {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {}
    }

    render() {
      return <Component {...this.props} />
    }
  }
}
