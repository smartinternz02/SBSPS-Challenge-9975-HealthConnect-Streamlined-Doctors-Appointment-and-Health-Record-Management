const nodemailer = require('nodemailer');

// Function to send verification email
async function sendVerificationEmail(email, otp) {
  // Create a transporter object using your SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587, 
    secure: false, 
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
  });

  // Email content
  const mailOptions = {
    from: 'support@gmail.com', 
    to: email,
    subject: 'Email Verification',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Email Verification Code</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Our App. Use the following otp to complete your Sign Up procedures.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />HealthConnect Backend Team</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>HealthConnect Backend Team</p>
      </div>
    </div>
  </div>`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

module.exports = { sendVerificationEmail };
