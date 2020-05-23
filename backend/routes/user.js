const router = require("express").Router();
const nodemailer = require("nodemailer");
const { Utils } = require("../utils");
const faunadb = require("faunadb"),
	q = faunadb.query;
const client = new faunadb.Client({
	secret: `fnADshmn64ACCXnpy3mH1lGsIS7YHLZbzwGLhg91`
});

function sendMailer(emailData, response, message) {
	const transporter = nodemailer.createTransport({
		host: "smtp.sina.com.cn",
		port: 587,
		secure: true,
		auth: {
			user: `zyybin@sina.com.cn`,
			pass: `6017837`
		}
	});

	const mailOption = {
		from: `zyybin@sina.com.cn`,
		to: emailData.address,
		subject: emailData.subject,
		html: emailData.html
	};

	transporter.sendMail(mailOption, (error, info) => {
		if (error) {
			if (response) {
				response.send({
					status: 0,
					message: "Email has not been sent due to an error"
				});
			}
		} else {
			if (response) {
				response.send({ status: 1, message: message });
			}
		}
	});
}

router.post("/verify-pec", async (req, res) => {
	let data = req.body;
	// let html = `${Utils.VERIFY_EMAIL_MESSAGE}
	//       <br/><br/><a href="${Utils.SERVER_URL}${Utils.NETLIFY_FUNCTIONS_URL}/user/get-verified?id=${data.id}" ${Utils.EMAIL_STYLE}>Verify your email</a>${Utils.MESSAGE_FOOTER}`;
	sendMailer(
		{
			address: data.pec,
			subject: Utils.VERIFY_EMAIL_SUBJECT,
			html: Utils.VERIFY_EMAIL_MESSAGE + Utils.MESSAGE_FOOTER
		},
		null,
		null
	);
	res.send({ status: 2, message: "Email has been sent" });
});

router.get("/hello", (req, res) => {
	res.send({ express: "Hello!!!!!!!" });
});

// login route
router.post("/login", async (req, res) => {
	let data = req.body;

	client
		.query(
			q.Paginate(
				q.Match(
					q.Index("findUserByEmail"),
					data.email,
					data.password
				)
			)
		)
		.then(result => {
			if (result.data.length) {
				res.send({ status: 1, data: { email: data.email } });
			} else {
				res.send({
					status: 0,
					message: "Email or password is incorrect"
				});
			}
		})
		.catch(err => {
			res.send({ status: 0, message: "Connection failed!" });
		});
});

// register route
router.post("/register", async (req, res) => {
	let data = req.body;

	client
		.query(q.Paginate(q.Match(q.Index("findUserByEmail"), data.email)))
		.then(result => {
			if (result.data.length) {
				console.log("The email already exists");
				res.send({ status: 0, message: "The email already exists" });
			} else {
				client
					.query(
						q.Create(q.Collection("User"), {
							data: {
								email: data.email,
								password: data.password,
								officalName: data.officalName,
								city: data.city,
								vatNumber: data.vatNumber,
								atecoCode: data.atecoCode,
								pec: data.pec,
								active: "0"
							}
						})
					)
					.then(result => {
						res.send({
							status: 1,
							id: result.ref.id
						});
					})
					.catch(err => {
						res.send({
							status: 0,
							message:
								"An error occured while create your account"
						});
					});
			}
		})
		.catch(err => {
			res.send({
				status: 0,
				message: "Connection failed!"
			});
		});
});

// verifcation route
router.get("/get-verified", (req, res) => {
	client
		.query(
			q.Update(q.Ref(q.Collection("User"), req.query.id), {
				data: { active: "1" }
			})
		)
		.then(result => {
			// res.render("index");
			res.send(Utils.VERIFY_SUCCESS_PAGE);
		})
		.catch(err => {
			console.log("Database cann't be connected!");
		});
});

// forgetpassword route
router.post("/forgotpwd", (req, res) => {
	let data = req.body;
	client
		.query(q.Paginate(q.Match(q.Index("findUserByEmail"), data.email)))
		.then(result => {
			if (result.data.length) {
				let html = `${Utils.RESET_PASSWORD_MESSAGE}
          <br/><br/><a href="${Utils.SERVER_URL}/reset-password?id=${result.data[0].id}" ${Utils.EMAIL_STYLE}>Reset your password</a>${Utils.MESSAGE_FOOTER}`;
				sendMailer(
					{
						address: data.email,
						subject: Utils.RESET_PASSWORD_SUBJECT,
						html: html
					},
					null,
					"We've sent an email to reset your password. Please check your email inbox."
				);
				res.send({
					status: 1,
					message:
						"We've sent an email to reset your password. Please check your email inbox."
				});
			} else {
				res.send({
					status: 0,
					message:
						"The email address doesn't exist.Please enter the email corretly."
				});
			}
		})
		.catch(err => {
			res.send({ status: 0, message: "Database cann't be connected!" });
		});
});

//reset password
router.post("/resetpwd", (req, res) => {
	let data = req.body;
	client
		.query(
			q.Update(q.Ref(q.Collection("User"), data.userId), {
				data: { password: data.password }
			})
		)
		.then(result => {
			res.send({ status: 1, message: "Password has been changed" });
		})
		.catch(err => {
			res.send({ status: 0, message: "Database cannont be connected!" });
		});
});

module.exports = router;
