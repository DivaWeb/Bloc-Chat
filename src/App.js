import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDXDaLBZK5sJ3odslpEo2wLvuxiKX2y-5g",
    authDomain: "bloc-chat-rooms.firebaseapp.com",
    databaseURL: "https://bloc-chat-rooms.firebaseio.com",
    projectId: "bloc-chat-rooms",
    storageBucket: "bloc-chat-rooms.appspot.com",
    messagingSenderId: "236070594577"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
      <RoomList firebase = { firebase } />
      </div>
    );
  }
}

export default App;
