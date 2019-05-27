/* eslint-disable no-alert */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { data: '' };
    this.state_2 = { message: [] };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch('/api/calculatePrimes', {
      method: 'POST',
      body: JSON.stringify({
        userValue: self.refs.userInput.value
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then((body) => {
        console.log(body);
        if (body.error === true) {
          alert(body.message);
        } else {
          // eslint-disable-next-line react/no-unused-state
          this.setState({ primes: body.message });
        }
      });
  }

  render() {
    const { username } = this.state;
    const { primes } = this.state;
    return (
      <div id="parent">
        <div>{username ? <h2>{`Hello ${username}`}</h2> : <h2>Hang on</h2>}</div>
        <div>
          <p>Please enter the number to see its factors:</p>
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input type="number" placeholder="Number to factorize" ref="userInput" />
            <input type="submit" />
          </form>
        </div>
        <div>{primes ? <h3>{`Here are the primes: ${primes}`}</h3> : <h3>Hang on</h3>}</div>
      </div>
    );
  }
}
