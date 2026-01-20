import { transporter } from "../config/mail.js";

export const sendStudentCredentials = async (email, tempPassword) => {
  const mailingOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Your Student Account Credentials",
    html: `
      <h2>Welcome to Student Management System</h2>
      <p>Your account has been created by the administrator.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p>Please log in and change your password immediately.</p>
    `,
  };

  await transporter.sendMail(mailingOptions);
};
