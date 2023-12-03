const loginUser = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");

const sgMail = require("../utils/sendgrid");

module.exports = (app) => {
  app.post("/api/survey", loginUser, requireCredit, async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    let recipient = recipients.split(",").map((email) => ({ email }));
    console.log(recipients);
    let msg = {
      from: "me@samples.mailgun.org",
      to: recipients,
      subject: subject,
      text: body,
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    try {
      await sgMail.send(msg);
      const res = await new Survey({
        title,
        body,
        subject,
        recipients: recipient,
        _user: req.user.id,
        dateSend: Date.now(),
      }).save();

      console.log(`mongoose save ${res}`);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }

    // mg.messages().send(msg, function (error, resBody) {
    //   console.log("mail gun Body:", resBody);
    //   if (error) {
    //     console.log(`mailgun error ${error}`);
    //   } else {
    //     new Survey({
    //       title,
    //       body,
    //       subject,
    //       recipients: recipient,
    //       _user: req.user.id,
    //       dateSend: Date.now(),
    //     })
    //       .save()
    //       .then((res) => {
    //         console.log(`mongoose save ${res}`);
    //       })
    //       .catch((e) => console.log(e));
    //   }
    // });
  });
};
