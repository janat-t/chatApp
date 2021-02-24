const server = require("http").createServer();
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", function (socket) {
	socket.on("count", function (data) {
		socket.broadcast.emit("count", { count: data.count });
		console.log(data);
	});
	socket.on("reset", () => {
		socket.broadcast.emit("count", { count: 0 });
		console.log({ count: 0 });
	});
	socket.on("emit", function (data) {
		socket.broadcast.emit("message", { ...data });
		console.log(data);
	});
});

server.listen(8080, function (err) {
	if (err) throw err;
	console.log("Server is listening to port 8080");
});
