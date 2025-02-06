// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;

  let date;

  if (!dateString) {
    date = new Date();
  } else {
    if (/^\d+$/.test(dateString)) {
      let timestamp = parseInt(dateString);

      // Check for potential overflow (important!)
      if (timestamp > 2147483647) { // Max value for 32 bit signed integer
        timestamp = Math.floor(timestamp / 1000); // Divide by 1000 to convert seconds to milliseconds
      }

      date = new Date(0);
      date.setUTCMilliseconds(timestamp * 1000);
    } else {
      date = new Date(dateString);
    }
  }

  if (isNaN(date)) {
    return res.json({ error: "Invalid Date" });
  }

  const unixTimestamp = date.getTime();
  const utcString = date.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcString });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
