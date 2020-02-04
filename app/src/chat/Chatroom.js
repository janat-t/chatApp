import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Chatroom extends Component {
	state = {
		socket: null,
		messages: []
	};

	componentCleanup = () => {
		this.onMessageSend({
			text: "has left the chat",
			user: this.props.location.username,
			time: new Date()
		});
		this.setState({ socket: null });
	};

	async componentDidMount() {
		await axios.get("http://localhost:3030/chat").then(result => {
			let mgs = [];
			result.data.map(message => {
				let m = message;
				m.time = new Date(Date.parse(message.time));
				mgs = [...mgs, m];
			});
			this.setState({ messages: mgs });
		});
		window.addEventListener("beforeunload", this.componentCleanup);
		if (this.state.socket == null) {
			await this.connectServer();
			this.onMessageSend({
				text: "joined the chat",
				user: this.props.location.username,
				time: new Date()
			});
		}
	}

	connectServer = () => {
		const socket = socketIOClient("127.0.0.1:8080");
		this.setState({ socket: socket });
		socket.on("message", this.addMessage);
	};

	onMessageSend = message => {
		if (this.state.socket == null) return;
		this.state.socket.emit("emit", message);
		this.addMessage(message);
		axios.post("http://localhost:3030/chat", message);
	};

	addMessage = message => {
		this.setState({ messages: [...this.state.messages, message] });
	};

	render() {
		if (this.props.location.username == null) {
			return <Redirect to="/chat" />;
		}

		const { username } = this.props.location;

		return (
			<div>
				<MessageList
					messages={this.state.messages}
					currentUser={username}
				/>
				<MessageForm
					onMessageSend={this.onMessageSend}
					currentUser={username}
				/>
			</div>
		);
	}

	componentWillUnmount() {
		this.componentCleanup();
		window.removeEventListener("beforeunload", this.componentCleanup);
	}
}

export default Chatroom;
