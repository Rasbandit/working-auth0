import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3030/auth/user').then(user => this.setState({ user: user.data }));
  }

  getInfo() {
    axios.get('/auth/user').then(user => this.setState({ user: user.data }));
  }


  render() {
    return (
      <div>
        <h2>User</h2>
        <div>
          <button onClick={() => { this.getInfo(); }}>Get Info</button> <a href="http://localhost:3030/auth/logout"><button>Log Out</button></a>
        </div>
        <h3>{this.state.user.displayName}</h3>
        <img src={this.state.user.picture} alt={this.state.user.displayName} />
      </div>
    );
  }
}

export default User;
