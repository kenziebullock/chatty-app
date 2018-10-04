// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
      console.log(client.send(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  // ws.send('User connected');
  // console.log(wss.clients);
  
  wss.clients.forEach((client) => {
    
    console.log(wss.clients.size);
    client.send(wss.clients.size);
  });

  ws.on('message', (message) => {
    let newMessage = JSON.parse(message);
    // console.log(newMessage);
    // if (newMessage.type === 'postNotification')
    switch (newMessage.type) {
      case 'postMessage':
        newMessage.id = uuidv4();
        newMessage.type = 'incomingMessage';
        break;
    }
    // if (newMessage.type === 'postMessage') {
    //   // console.log(newMessage);
    //   // ws.send(newMessage);
    // }
    newMessage = JSON.stringify(newMessage);
    wss.clients.forEach((client) => {
      client.send(newMessage);
    })
    // console.log(`User ${newMessage.username} said ${newMessage.content} id:${newMessage.id}`);

  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach((client) => {
      client.send(wss.clients.size);
    })
  });
});