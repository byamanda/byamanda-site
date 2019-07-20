import React from "react"
import PropTypes from "prop-types"

import { Form } from "./Form"

class ContactForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    const { value, name } = e.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Form method="POST" action={`https://formspree.io/${this.props.email}`}>
        <Form.Info>
          Curious about a piece of artwork? Want to commission a painting? Chat
          about your favorite coffee shop or adventure spot? Shoot me an e-mail!
          I would love to hear from you!
          <br />
          <br />
          With love, adventure, and creativity,
          <br />
          Amanda
        </Form.Info>

        <Form.Group>
          <Form.Label htmlFor="name">Full Name</Form.Label>
          <Form.Input
            value={this.state.name}
            onChange={this.handleInputChange}
            type="text"
            name="name"
            id="name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Input
            value={this.state.email}
            onChange={this.handleInputChange}
            type="text"
            name="_replyto"
            id="email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="subject">Subject</Form.Label>
          <Form.Input
            value={this.state.subject}
            onChange={this.handleInputChange}
            type="text"
            name="subject"
            id="subject"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="message">Message</Form.Label>
          <Form.TextArea
            value={this.state.message}
            onChange={this.handleInputChange}
            rows="10"
            name="message"
            id="message"
          />
        </Form.Group>

        <Form.Input
          type="hidden"
          name="_subject"
          value="New Message from byamanda.design!"
          readonly
        />
        <Form.Input type="hidden" name="_gotcha" readonly />

        <Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}

ContactForm.propTypes = {
  email: PropTypes.string.isRequired,
}

export default ContactForm
