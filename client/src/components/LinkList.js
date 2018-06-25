import React, { Component } from 'react'
import Link from './Link'
import CreateLink from './CreateLink'
import SelectUser from './SelectUser'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'

class LinkList extends Component {

  componentDidMount() {
    this._subscribeToNewMessage()
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if (this.props.messagesQuery && this.props.messagesQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.messagesQuery && this.props.messagesQuery.error) {
      return <div>Error</div>
    }
    const linksToRender = this.props.messagesQuery.messages

    return (
      <div>
        <ul className="messages">
          {linksToRender.map((message) => (
            <Link key={message.id} message={message} />
          ))}
        </ul>
        {authToken && <CreateLink />}
      </div>
    )
  }

  _subscribeToNewMessage = () => {
    this.props.messagesQuery.subscribeToMore({
      document: gql`
        subscription {
          newMessage {
            node {
              id
              content
              sender {
                id
                email
                name
              }
              receiver {
                id
                name
                email
              }
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllMessages = [...previous.messages, subscriptionData.data.newMessage.node]
        const result = {
          ...previous,
          messages:  newAllMessages,
        }
        return result
      },
    })
  }
}


export const MESSAGES_QUERY = gql`
  query MessageQuery {
    messages {
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

const MESSAGES_QUERY_USER = gql`
  query MessageQuery($sender_id: String!, $receiver_id: String!) {
    messages_by_user(sender_id: $sender_id, receiver_id: $receiver_id) {
      id
      content
      sender {
        id
        email
        name
      }
      receiver {
        id
        name
        email
      }
    }
  }
`

export default graphql(MESSAGES_QUERY, { name: 'messagesQuery' }) (LinkList)

// export default graphql(MESSAGES_QUERY_USER, { name: 'messagesQueryUser',
//     options: (props) => ({ variables:
//       {
//         sender_id: props.sender_id,
//         receiver_id: props.receiver_id
//       }
//     })
//   }
// ) (LinkList)
