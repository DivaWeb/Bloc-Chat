import React from 'react';

class Username extends React.Component{

   componentDidMount(){
     this.props.firebase.auth().onAuthStateChanged( user => {
       this.props.setUser(user);

     })
   }



signIn(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup ( provider );
}

signOut(){
  this.props.firebase.auth().signOut();
}


render(){
  return(
    <div>
      <p>{ this.props.user ? this.props.user.displayName : 'guest'  } </p>
      {this.props.user ?
        <input type = "button" value = "Sign Out" onClick = { (e) => this.signOut()} />
        :
      <input type = "button" value = "Sign In" onClick = { (e) => this.signIn()} />
    }
    </div>
  );
}
}
export default Username;
