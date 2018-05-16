import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }
  componentDidMount() {
    console.log("componentDidMount <App />");

    //create connect to server
    this.socket = new WebSocket('ws://localhost:3001');

    //listen for messages
    this.socket.onmessage = function (event) {
      const newMessage = (JSON.parse(event.data));
      console.log(newMessage);
      const message = this.state.messages.concat(newMessage);
      this.setState({messages: message});
    };
  }

  //send message and username to server
  onEnter(myMessage){
    this.socket.send(JSON.stringify({message: myMessage, username:this.state.currentUser.name}));
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser= {this.state.currentUser.name} onEnter={this.onEnter}/>
      </div>
    );
  }
}
export default App;
