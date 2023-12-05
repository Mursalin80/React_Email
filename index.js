const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
require("./models/User");
require("./models/Survey");
require("./services/passport");

// App const
const PORT = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "client", "build");
const app = express();

// serve public contents

app.use(express.static(publicPath));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// express cookie setup
app.use(
  cookieSession({
    name: "session",
    maxAge: 60 * 60 * 24 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

// passport use cookie
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected! at " + process.env.DB_URL));

// routers
require("./routes/authRouters")(app);
require("./routes/billingRouter")(app);

//  ********  Send mails  Production         *********
/** SendGrid Email service, Use for production 
      require("./routes/surveyRouter")(app);   //  @@@@@ uncommit this line for production  @@@@
*/

//  ********  Send mails  Development         *********
require("./services/sendEmailForTest")(app); //  @@@@@ commit this line for production  @@@@

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
