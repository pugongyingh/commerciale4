const FAUNADB_SECRET = `fnADshmn64ACCXnpy3mH1lGsIS7YHLZbzwGLhg91`;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const NETLIFY_FUNCTIONS_URL = process.env.REACT_APP_NETLIFY_FUNCTIONS_URL;
const NODEMAILER_ACCOUNT = process.env.REACT_APP_NODEMAILER_ACCOUNT;
const NODEMAILER_PASSWORD = process.env.REACT_APP_NODEMAILER_PASSWORD;

const VERIFY_EMAIL_SUBJECT = "Verify your account";
const RESET_PASSWORD_SUBJECT = "Reset password";
const VERIFY_EMAIL_MESSAGE = `<h3>Hello</h3>
                    <h4>Thanks for your registering to COMMERCIALE4.0</h4>
                    We will check your information and allow to access our site.<br/>
                    `;
// const VERIFY_EMAIL_MESSAGE = `<h3>Hello</h3>
//                     <h4>Thanks for your registering to COMMERCIALE4.0</h4>
//                     We now need to verify your email address.<br/>
//                     Please check the link in that email to coutinue.
//                     `;
const RESET_PASSWORD_MESSAGE = `<h3>Hello</h3>
                    We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link:
					`;

const MESSAGE_FOOTER = `<p>Thank you</p><p>Commercials4.0 team</p>`;

const EMAIL_STYLE = `style="background-color: green; margin-top: 30px; text-align: center; border-radius: 5px; font-weight: bold; line-height: 44px; 
                    text-decoration: none; font-size: 14px; color: #ffffff; display: block; width: 20%"`;

const VERIFY_SUCCESS_PAGE = `<html lang="en"><head><title>Verify</title></head>
							<body><div style="background-color: green; margin-top: 30px; text-align: center; border-radius: 5px; font-weight: bold; 
							line-height: 44px; font-size: 15px; color: #ffffff; display: block; width: 50%; margin-left: auto; margin-right: auto;">
							Welcome to the COMMERCIALE4.0! You have been successfully verified.<div></body></html>`;
module.exports.Utils = {
	FAUNADB_SECRET,
	SERVER_URL,
	NETLIFY_FUNCTIONS_URL,
	NODEMAILER_ACCOUNT,
	NODEMAILER_PASSWORD,
	VERIFY_EMAIL_SUBJECT,
	RESET_PASSWORD_SUBJECT,
	VERIFY_EMAIL_MESSAGE,
	RESET_PASSWORD_MESSAGE,
	MESSAGE_FOOTER,
	EMAIL_STYLE,
	VERIFY_SUCCESS_PAGE
};
