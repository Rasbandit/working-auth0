import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import User from './components/User';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.2262711,-111.66090159999999&destinations=40.226282999999995,-111.66090319999999&key=AIzaSyCIIg2weQK6p4wUTy6nXrCj4-hPGgA40xI', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      } }).then((data) => {
      console.log(data);
    });
  }


  render() {
    return (
      <div className="App">
        <Link to="/"><h1>Happy Little Site</h1> </Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={User} />
        </Switch>
      </div>
    );
  }
}

export default App;
