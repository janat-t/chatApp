import React, { Component } from "react";

class Message extends Component {
	render() {
		const { message, currentUser } = this.props;
		if (message.user === currentUser)
			return (
				<li>
					<div className="currentMember">
						<div className="Message-content">
							<div className="username">{message.user}</div>
							<div className="time">
								{message.time ? message.time.toISOString().slice(11, 16) : "xx:xx"}
							</div>
							<div className="text">{message.text}</div>
						</div>
					</div>
				</li>
			);
		return (
			<li>
				<div className="Message-content">
					<div className="username">{message.user}</div>
					<div className="time">
						{message.time.toISOString().slice(11, 16)}
					</div>
					<div className="text">{message.text}</div>
				</div>
			</li>
		);
	}
}

export default Message;
