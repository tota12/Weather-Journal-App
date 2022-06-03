// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require('express'); 
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'))
// Spin up the server
const port = 8000;
app.listen(port, ()=>
  console.log(`running on localhost: ${port}`));
app.get('/data', (req, res) =>{
    setTimeout(function(){  res.send(projectData) },2000);
})
app.post('/post', (req, res) =>{
    projectData = req.body;
    console.log(projectData);
})