# yelpcamp
App created as an output from the course "The Web Development Bootcamp".

Front-end has Bootstrap, CSS3, HTML5, and a bit of JavaScript.
Back-end has Node, Passport.JS, Mongoose, Express.JS.
Database: MongoDB.

Simply push it to your environment, start the mongo services (localhost) and run "node app.js".
This app was developed at Cloud9, so you have to change this line (at the end of app.js):

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});

To connect on your premises.
