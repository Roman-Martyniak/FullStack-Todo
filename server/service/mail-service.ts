import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { SMPT_HOST, SMPT_PORT, SMPT_USER, SMPT_PASSWORD, API_URL } = process.env;

class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: String(SMPT_HOST),
            port: Number(SMPT_PORT),
            secure: true,
            auth: {
                user: String(SMPT_USER),
                pass: String(SMPT_PASSWORD),
            },
        });
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: String(SMPT_USER),
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
