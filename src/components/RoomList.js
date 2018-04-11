import React from "react";
import '../css/roomlist.css';


class RoomList extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }




  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ newRoomName: e.target.value})
  }

  createRoom(e){
    e.preventDefault();
    if (!this.state.newRoomName) {return}
    this.roomsRef.push({
    name: this.state.newRoomName
    });
    this.setState({newRoomName: ""});
  }

  render(){
    return(

  <div>
  <header className ="roomsHeader">
      <h1 className = "headerTitle">Chat Rooms</h1>
  </header>

  <div className = " roomSection">
    <h2>Please select a room</h2>
    <ul className = "rooms">
    {this.state.rooms.map((room) =>
      <li className = "roomList" key = {room.key} onClick={(e) => this.props.setRoom(room) }>{room.name}</li>
     )}
</ul>


  <h5>To create a new room, please enter and click update.</h5>
  <form className = "newRoom" onSubmit = { (e) => this.createRoom(e) }>
    <input type="text" placeholder="New Room Name" value = { this.state.newRoomName } onChange={ (e) => this.handleChange(e) }/>
    <input type="button" value="Update" onClick={ (e) => this.createRoom(e)} />
  </form>
  </div>
 </div>
  );
  }
}

export default RoomList;
