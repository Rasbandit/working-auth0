import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home Screen</h2>
        <a href="http://localhost:3030/auth">
          <button>Log In</button>
        </a>
      </div>
    );
  }
}

export default Home;
