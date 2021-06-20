import React, { Component } from 'react';
import * as io from 'socket.io-client';
import { relativeTime } from './../../../utils/dateUtil';
import { notify } from './../../../utils/toaster';
import './MessageComp.css';

const socket_url = process.env.REACT_APP_SOCKET_URL;

export class MessageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageBody: {
        message: '',
        senderId: '',
        receiverId: '',
        senderName: '',
        receiverName: '',
        time: '',
        state: 'sent',
      },
      messages: [],
      users: [],
    };
  }

  componentDidMount() {
    this.socket = io(socket_url);
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.runSocket();
  }

  runSocket = () => {
    // this.socket.on('hi', (data) => {
    //   console.log('at hi event >>', data);
    //   this.socket.emit('hello', 'hello from clinet');
    // });
    this.socket.emit('new-user', this.currentUser.username);

    this.socket.on('reply-message-own', (data) => {
      const { messages } = this.state;
      messages.push(data);
      this.setState({
        messages,
      });
    });

    this.socket.on('reply-message', (data) => {
      const { messages, messageBody } = this.state;
      messageBody.receiverId = data.senderId;
      messageBody.receiverName = data.senderName;
      data.state = 'received';
      messages.push(data);
      this.setState(
        {
          messages,
          messageBody: {
            ...messageBody,
          },
        },
        () => {
          console.log('message body after replying..', this.state.messageBody);
        }
      );
    });

    this.socket.on('users', (users) => {
      this.setState({
        users,
      });
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((preState) => ({
      messageBody: {
        ...preState.messageBody,
        [name]: value,
      },
    }));
  };

  send = (e) => {
    e.preventDefault();
    const { messageBody } = this.state;
    debugger;
    if (!messageBody.receiverId) {
      return notify.showInfo('Please Select a user to continue');
    }
    // append data in messageBody
    messageBody.time = Date.now();
    messageBody.senderName = this.currentUser.username;
    const currentSender = this.state.users.find(
      (user) => user.name === this.currentUser.username
    );
    messageBody.senderId = currentSender.id;

    this.socket.emit('new-message', messageBody);
    this.setState((preState) => ({
      messageBody: {
        ...preState.messageBody,
        message: '',
      },
    }));
  };

  selectUser = (user) => {
    console.log('user >>', user);
    this.setState((preState) => ({
      messageBody: {
        ...preState.messageBody,
        receiverId: user.id,
        receiverName: user.name,
      },
    }));
  };

  render() {
    return (
      <>
        <h2>Lets chat</h2>
        <div className="row">
          <div className="col-md-8">
            <p>
              {' '}
              <strong>Messages</strong>
            </p>
            <div className="chat-box">
              {this.state.messages.map((msg, index) => (
                <div className="container-msg" key={index}>
                  <img
                    src="https://pbs.twimg.com/profile_images/1176237957851881472/CHOXLj9b_400x400.jpg"
                    alt="Avatar"
                  />
                  <h3>{msg.senderName}</h3>
                  <p>{msg.message}</p>
                  <span className="time-right">{relativeTime(msg.time)}</span>
                  <small>{msg.state}</small>
                </div>
              ))}
            </div>
            <div className="message-block">
              <form onSubmit={this.send} className="form-group" noValidate>
                <input
                  type="text"
                  placeholder="Your Message Here..."
                  value={this.state.messageBody.message}
                  name="message"
                  onChange={this.handleChange}
                  className="form-control input-message"
                ></input>
                <button className="btn btn-success btn-submit" type="submit">
                  SEND
                  <i
                    style={{ color: 'green' }}
                    className="fa fa-paper-plane"
                  ></i>
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-4">
            <p>
              {' '}
              <strong>Users</strong>
            </p>

            <div className="chat-box">
              {this.state.users.map((user, index) => (
                <button
                  key={index}
                  className="btn btn-default"
                  style={{ display: 'block' }}
                  onClick={() => this.selectUser(user)}
                >
                  {user.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MessageComponent;
