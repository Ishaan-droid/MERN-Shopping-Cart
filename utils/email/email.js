const nodemailer = require('nodemailer');

module.exports = module.exports = async options => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'MERN CART <ishaanthakur24@yahoo.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
  });
};
