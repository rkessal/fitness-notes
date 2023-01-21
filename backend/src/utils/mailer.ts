import nodemailer from "nodemailer";
import config from "../../config/config";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: config.MAILUSER,
    pass: config.MAILPASS,
  },
});

export default transporter;
