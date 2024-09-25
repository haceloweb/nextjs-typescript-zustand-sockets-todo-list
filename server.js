const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const port = 4000;
const clientPort = 3000;
const hostname = "localhost";
const io = new Server(httpServer, {
  pingInterval: 2000,
  pingTimeout: 5000,
  cors: {
    origin: `http://${hostname}:${clientPort}`,
    methods: ["POST", "GET"],
  },
});

let users = [];
let todos = [];

io.on("connection", (socket) => {
  io.emit("loadUsers", users);
  io.emit("loadTodos", todos);
  socket.on("addUser", (user) => users.push(user));
  socket.on(
    "removeUser",
    (userId) => (users = users.filter((user) => user.id !== userId))
  );
  socket.on("addTodo", (task) =>
    todos.push({
      id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
      task,
      done: false,
    })
  );
  socket.on("updateTodo", (todoTask) => {
    todos = todos.map((todo) => ({
      ...todo,
      done: todo.id === todoTask.id ? todoTask.done : todo.done,
      owner:
        todo.id === todoTask.id && todoTask.owner !== ""
          ? todoTask.owner
          : todo.owner,
    }));
  });
  socket.on(
    "removeTodo",
    (todoId) => (todos = todos.filter((todo) => todo.id !== todoId))
  );
});

setInterval(() => {
  io.emit("loadUsers", users);
  io.emit("loadTodos", todos);
}, 100);

httpServer
  .once("error", (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
