import express from "express";
import cors from 'cors';
//import basicAuth from 'express-basic-auth';
import bodyParser from "body-parser";

import bolaoRoutes from "./routes/bolaoRoutes.mjs";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use('/api/bolao', bolaoRoutes);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

 
// REGISTRAR AS ROTAS AQUI


app.listen(4000, function(){
    console.log('servidor rodando na porta:4000 ')
});