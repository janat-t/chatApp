import React, { Component } from "react";
import { Table } from 'reactstrap';
// import withRequest from "../lib/withRequest";

class Posts extends Component {
	render() {
		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>Id</th>
							<th>UserId</th>
							<th>Title</th>
							<th>Body</th>
						</tr>
					</thead>
					<tbody>
						{this.props.data === undefined ? (
							<div></div>
						) : (
							this.props.data.map(post => (
								<tr key={post.id}>
									<th scope="row">{post.id}</th>
									<td>{post.userId}</td>
									<td>{post.title}</td>
									<td>{post.body}</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Posts;
