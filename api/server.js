const express = require('express');
const server = express();


const { logger, validateProject } = require('./projects/projects-middleware');


server.use(express.json());


server.use(logger);


const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');


server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// Do NOT `server.listen()` inside this file!
module.exports = server;
