import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { Form } from "./Form"

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      email: e.target.value,
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    await addToMailchimp(this.state.email)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Input
            type="text"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            id="email"
          />
        </Form.Group>

        <Form.Group>
          <Form.Button>Subscribe</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}

export default SubscribeForm
