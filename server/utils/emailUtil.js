const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const configs = require('../config');
async function sendEmail(sendEmailAddress, verifyCode) {
  const mailOptions = {
    from: configs.smtp.auth.user,
    to: sendEmailAddress,
    subject: 'CMS验证码',
    html: `<p>欢迎注册NUXT博客，您的验证码是 ${verifyCode}, 请勿泄露给其他人,大爷要常来玩啊！</p>`
  };
  const transport = nodemailer.createTransport(smtpTransport(configs.smtp));
  let transporter = await transport.sendMail(mailOptions);
}
module.exports = sendEmail;
