const nodemailer = require("nodemailer");
const loginUser = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_HOST_NAME,
  port: process.env.ETHEREAL_PORT,
  auth: {
    user: process.env.ETHEREAL_USER_NAME,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

module.exports = (app) => {
  app.post("/api/survey", loginUser, requireCredit, async (req, res) => {
    const { title, body, subject, recipients } = req.body;

    let surveyEmails = recipients.split(",").map((email) => ({ email }));

    let msg = {
      from: "me@samples.mailgun.org",
      to: recipients,
      subject: subject,
      text: body,
      html: `<p>${title}</p> <br /><strong>and easy to do anywhere, even with Node.js</strong> `,
    };

    let survey = null,
      info;
    try {
      info = await transporter.sendMail(msg);

      survey = await new Survey({
        title,
        body,
        subject,
        recipients: surveyEmails,
        _user: req.user.id,
        dateSend: Date.now(),
      }).save();

      console.log(`mongoose save ${res}`);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
        return res.send(error.response);
      }
      return res.send(error);
    }
    res.send({ survey, mail: info });
  });
};
