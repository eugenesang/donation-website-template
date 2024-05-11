const nodemailer= require ('nodemailer')

const transporter = nodemailer.createTransport({
    host: "floodsdonorsbook.life",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'help@floodsdonorsbook.life', // your cPanel email address
      pass: 'x%7}+AC611ad', // your cPanel email password
    },
  });



module.exports = transporter