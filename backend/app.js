const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = 3001;

//Connect to local DB
var db = require('./models/db.js');

//Print all API calls
function logRequests(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
app.use(logRequests);

//Handle preflight requests
app.use(cors());

//Middleware to parse JSON
app.use(express.json()); 

//Express session (for persistent authentication)
app.use(
  session({
    secret: '123456',
    resave: 'false'
  })
)

//Define routes
var authRouter = require('./routes/auth');
app.use('/auth', authRouter);

//Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;