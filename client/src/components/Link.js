import React, { Component } from 'react'

class Link extends Component {
  render() {
    return (

      <li className="messages">
        {this.props.message.sender.name}:  {this.props.message.content}
      </li>

    )
  }
}

export default Link