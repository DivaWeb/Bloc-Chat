import React from 'react';


class MessageList extends React.Component {
  constructor(props){
     super(props);
     this.state={
       messages: [],
       displayedMessages: [],
       newMessageText: ''
     }
     this.messagesRef = this.props.firebase.database().ref('messages');

   }

   componentDidMount(){
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
   }

   componentWillReceiveProps(nextProps) {
     this.updateDisplayedMessages( nextProps.activeRoom );
   }

  createMessage(e) {
  //  if(!this.props.activeRoom || !newMessageText) { return }
  e.preventDefault();
  console.log(this.props.activeRoom);
    this.messagesRef.push({
      Content: this.state.newMessageText,
      sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key,
      username: this.props.user ? this.props.user.displayName : 'Guest'

    });


    this.setState({ newMessageText: '' });
    this.updateDisplayedMessages(this.props.activeRoom);

  }


  handleChange(e) {
    this.setState({newMessageText: e.target.value});

  }

  updateDisplayedMessages(activeRoom) {
    if(!activeRoom) { return }
    this.setState({ displayedMessages: this.state.messages.filter( message => {console.log(message.key, activeRoom.key); message.key === activeRoom.key })})
  }

  checkForNewMessages(){
    this.messagesRef.on('child_added', snapshot =>{
      const message = Object.assign(snapshot.val(), {key: snapshot.key})
      this.setState({messages: this.state.messages.filter( message => message.key !== snapshot.key) }, () =>{
        this.updateDisplayedmessages( this.props.activeRoom)
      });
    });
  }



   render(){
     return(
     <div>
       <h2 > { this.props.activeRoom ? this.props.activeRoom.name : ''}</h2>
     <ul>

     { this.state.displayedMessages.map((message) =>
        <li key = {message.key}>
          <div>{message.Content}</div>
          <div>{message.username}</div>
          <div> {message.sendAt}</div>

        </li>
      )}
      </ul>

      <form>
      <input type="text" placeholder = "Type your message here"   value = {this.state.newMessageText} onChange = {  this.handleChange.bind(this) } />
      <input type = "button" value = "Enter" onClick = { (e) => this.createMessage(e)} />
      </form>
    </div>
  );
   }
}

export default MessageList;
