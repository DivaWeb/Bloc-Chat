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

  createMessage(newMessageText) {
    newMessageText.preventDefault();
    this.messagesRef.push({
      username: this.props.user ,
      Content: newMessageText,
      sentAt: Date.now(),
      roomId: this.props.activeRoom.key
    });
    this.setState({ newMessageText: '' });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({newMessageText: e.target.value});
  }

  updateDisplayedMessages(activeRoom) {
    if(!activeRoom) { return }
    this.setState({ displayedMessages: this.state.messages.filter( message => message.key === activeRoom.key )})
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
     <ul>

     { this.state.displayedMessages.map((message) =>
        <li key = {message.key}>{message.Content}</li>
      )}
      </ul>
    </div>
  );
   }
}

export default MessageList;
