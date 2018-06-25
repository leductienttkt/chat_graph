import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import MESSAGES_QUERY from './LinkList'
import LinkList from './LinkList'

class SelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sender_id: 'cjhbgithoxs630b62frliaim9',
      receiver_id: 'cjhbgithoxs630b62frliaim9'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.setState({sender_id: event.target.value});
  }

  render() {
    if (this.props.userQuery && this.props.userQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.userQuery && this.props.userQuery.error) {
      return <div>Cannot load Users</div>
    }

    const users = this.props.userQuery.users

    return (
      <div>
        <label>
          Pick user:
          <select value={this.state.value} onChange={this.handleChange}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <LinkList sender_id={this.state.sender_id} receiver_id={this.state.receiver_id} />
      </div>
    );
  }
}

const USERS_QUERY = gql`
  query UserQuery {
    users {
      id
      name
      email
    }
  }
`

export default graphql(USERS_QUERY, { name: 'userQuery' }) (SelectUser)

