import React, { Component } from "react";


class RoomList extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
  }



  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      console.log(1, snapshot);
      //this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render(){
    return(
<div>
      {this.state.rooms.map((room) => {
        return room;
      })}

    <h1> {this.state.rooms}</h1>
    </div>
  );
  }
}

export default RoomList;
