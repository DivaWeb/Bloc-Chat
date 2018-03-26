import React from 'react';

class Username extends React.Component{




singIn(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup ( provider );
}

signOut(){
  this.props.firebase.auth().signOut();
}


render(){
  return(
    <div>
      <p>{ this.props.username } </p>
      <input type = "button" value = "Sign In" onClick = { (e) => this.singIn()} />
      <input type = "button" value = "Sign Out" onClick = { (e) => this.signOut()} />
    </div>
  );
}
}
export default Username;
