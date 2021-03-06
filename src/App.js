import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import Username from './components/Username';



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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      user: null

    };
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user){
    this.setState({user: user});
  }


  render() {
    return (
      <div className="App">
      <RoomList firebase = { firebase } activeRoom={ this.state.activeRoom} setRoom = {this.setRoom.bind(this)} user = { this.state.user}  />
      <MessageList firebase = { firebase } activeRoom={this.state.activeRoom} user = {this.state.user}/>
      <Username firebase = {firebase} setUser = {this.setUser.bind(this)} user = { this.state.user} />
      </div>
    );
  }
}

export default App;
