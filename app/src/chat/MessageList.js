import React, { Component } from "react";
import Message from "./Message"

class MessageList extends Component {
	render() {
		const {messages} = this.props;
		return messages.map(message => (
			<ul className="Messages-list">
				<Message message={message} {...this.props} />
			</ul>
		));
	}
}

export default MessageList;
