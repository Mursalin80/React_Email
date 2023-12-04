const loginUser = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");

const sgMail = require("../utils/sendgrid");

module.exports = (app) => {
  app.post("/api/survey", loginUser, requireCredit, async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    let recipientEmails = recipients.split(",");
    let surveyEmails = recipientEmails.map((email) => ({ email }));

    let msg = {
      from: "me@samples.mailgun.org",
      to: recipientEmails,
      subject: subject,
      text: body,
      html: `<p>${title}</p> <br /><strong>and easy to do anywhere, even with Node.js</strong> `,
    };

    let survey = null;
    try {
      await sgMail.sendMultiple(msg);
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
    res.send(survey);
  });
};
