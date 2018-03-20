import React from "react";


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
<ul>
  {this.state.rooms.map((room) =>
      <li key = {room.key} onClick={(e) => this.props.setRoom(room) }>{room.name}</li>
  )}

</ul>


  <form onSubmit = { (e) => this.createRoom(e) }>
    <input type="text" placeholder="New Room Name" value = { this.state.newRoomName } onChange={ (e) => this.handleChange(e) }/>
    <input type="button" value="Update" onClick={ (e) => this.createRoom(e)} />
  </form>

 </div>
  );
  }
}

export default RoomList;
