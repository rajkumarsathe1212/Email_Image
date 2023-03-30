
let nodemailer = require('nodemailer');

class Mail{
   async sendemail(name, email, password){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'satheraj1400@gmail.com',
            //   pass: 'cznkvigqkajldgrx'
                pass: 'enter your 2-step verification generated password'
            }
          });
          
          var mailOptions = {
            from: 'satheraj1400@gmail.com',
            to: email,
            subject: "Welcome To email",
            html: `<h1>Welcome ${name}</h1>
                  <p>Your email is- ${email}</p>
                  <p>Your password is - ${password}</p>`
          };
          
         await transporter.sendMail(mailOptions, function(error, info){
            console.log(error);
            if (error==null) {
                return true;
            } else {                
                return false;
            }
          });
    }
}

module.exports = Mail;
