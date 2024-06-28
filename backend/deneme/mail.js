import express from "express";
import mailgun from 'mailgun-js';




const mg = () => mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.DOMAIN,
})

const sendmail = (req, res) => {
    const { email, subject, message } = req.body;
    console.log(req.body)
    mg().messages().send({
        from: "Mehmet Kahraman <mehmet123000kahraman@gmail.com>",
        to: `[${email}]`,
        subject: `${subject}`,
        text:"Testing some Mailgun awesomeness!",
        html: `<p> ${message} </p>`
    }, (error, body) => {
        if (error) {
            console.log(error.message);
            res.status(500).send({ message: "mail gönderilemedi" })
        }
    }
    )
}

export { sendmail };