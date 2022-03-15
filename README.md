# Botpress Test

## Problem statement 
You need to build a “vs-code like” file explorer tree view with multiple collapsible sections. The program needs to take as an argument one or multiple paths to local directories. Each directory needs to be represented as an independent section in the rendered file explorer. When a file on the host is deleted, added, removed or renamed within one of the specified directories, changes should be reflected in the rendered file explorer. 

The file explorer component should be rendered in a web browser. You are allowed to use any library you want 

Example usage: 
`node ./file-explorer.js ~/Desktop/ ./an/index-dir/` 

---

## Design Struct

I created a monorepo for this test. There are 3 different folders which contains different logic and responsibility.

- Web Server
    - location: `/app` 
    - React webserver used as UI for watching files
- File Server
    - location: `/file-server`
    - Express server used to read + watch file directory
- Event Server
    - location: `/event-server`
    - Express server used to fire events to user when a file changed.
    - Maintain list of subscribed clients

![Architect Design](/BotpressDesign.png)

> Please excuse my paint drawing :)

I realise I can keep the merge the file and event server together, however I wanted to separate the server responsibilities. Upon landing on the web server, the client is immediately subscribed to the event server. Upon subscription, the Event Server creates a client ID (`Date.now()`). 

When the client sends the get directory request, the File Server starts watching that directory. Any changes that happen in the directory, will send an HTTP request to the event server which includes the client ID that was subscribed. The File server is in charge of sending out a request for every client that is "watching" the directory.

---

## Set up

I'm using `node 14.19.0`

---
## Frontend

```sh
cd app
npm i
npm start
```

http://localhost:3000

## Servers

### File server

```sh
cd file-server
npm i
npm start
```

http://localhost:3001/

### Event server

```sh
cd evemt-server
npm i
npm start
```

http://localhost:3002/ 