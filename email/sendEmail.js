const transporter = require('./email.config');

const create = {
   feedback(name, email, feedback){
        return `
        <div class="welcome">
            <h3>Feedback from ${name},</h3>
            <p>
                email: ${email}
            </p>
            <p>
               ${feedback}
            <p>
        </div>
        `
    }
}

const send={
    async feedback(name, email, message){
        let info = await transporter.sendMail({
            from: '"Floods Donors Book" <help@floodsdonorsbook.life>', // sender address
            to: "ceomorrismusau@gmail.com, craftydesigner.x@gmail.com", // list of receivers
            subject: "User Feedback", // Subject line
            text: "Feedback", // plain text body
            html:  create.feedback(name, email, message), // html body
          });
          console.log(info)
    }
}

module.exports = send;