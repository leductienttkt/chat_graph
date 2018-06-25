import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateLink extends Component {
  state = {
    content: ''
  }

  render() {
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="text"
            placeholder="A content"
          />
        </div>
        <button onClick={() => this._createMessage()}>Send</button>
      </div>
    )
  }

  _createMessage = async () => {
    const { content } = this.state
    await this.props.sendMessage({
      variables: {
        content,
      },
      // update: (store, { data: { send_message } }) => {
      //   const data = store.readQuery({ query: MESSAGES_QUERY })
      //   data.messages.splice(data.messages.length, 0, send_message)
      //   store.writeQuery({
      //     query: MESSAGES_QUERY,
      //     data,
      //   })
      // },
    })
    this.setState({ content: "" })
  }
}

const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!) {
    send_message(content: $content, receiver_id: "cjhbgithoxs630b62frliaim9") {
      id
      content
      sender {
        id
        email
        name
      }
    }
  }
`

export default graphql(SEND_MESSAGE, { name: 'sendMessage' })(CreateLink)
