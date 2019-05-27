import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return <div>{username ? <h2>{`Hello ${username}`}</h2> : <h2>Hang on</h2>}</div>;
  }
}
