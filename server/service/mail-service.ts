import nodemailer from "nodemailer";

const { SMPT_HOST } = process.env;
const { SMPT_PORT } = process.env;
const { SMPT_USER } = process.env;
const { SMPT_PASSWORD } = process.env;
const { API_URL } = process.env;

class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.ukr.net",
            port: 2525,
            secure: true,
            auth: {
                user: "roman.martyniakdev@ukr.net",
                pass: "MRdBMo4XyQcKopWk",
            },
        });
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: "roman.martyniakdev@ukr.net",
            to,
            subject: "Activation account" + API_URL,
            text: "",
            html: `
            <div>
                <h1>For activation click the link</h1>
                <a href="${link}">${link}</a>
            </div>
            `,
        });
    }
}

export default new MailService();
