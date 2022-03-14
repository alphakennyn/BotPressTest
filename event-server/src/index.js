const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3002;

// server will take care of client data
let clients = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/status", (request, response) =>
  response.json({ clients: clients.length })
);

app.get("/event/init", (request, response, next) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  response.write('Subscribed!!\n\n');

  const clientId = Date.now();

  response.write(`data: ${(JSON.stringify({ clientId }))}\n\n`);
  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
});

app.get('/event/fileChange', (req, res) => {
  // TODO pass clientId into query
    const {path} = req.query; 
    clients.forEach(client => client.response.write(`data: ${JSON.stringify({ path })}\n\n`))
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
