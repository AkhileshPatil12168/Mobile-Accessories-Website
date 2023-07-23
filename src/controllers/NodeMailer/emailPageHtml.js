function body(reason, link) {
    const message = {
        signup: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sign Up Confirmation</title>
      <style>
        /* Add your email styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #666666;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0088cc;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <table align="center" bgcolor="#ffffff" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" style="padding: 20px;">
            <h1>Sign Up Confirmation</h1>
            <p>Thank you for signing up! Please click the button below to confirm your email address.</p>
            <p><a class="button" href=${link}>Confirm Email</a></p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,

        login: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Logged In</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #666666;
        }
      </style>
    </head>
    <body>
      <table align="center" bgcolor="#ffffff" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" style="padding: 20px;">
            <h1>Welcome Back!</h1>
            <p>You have successfully logged in to your account.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,

        resetPassword: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password</title>
      <style>
        /* Add your email styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #666666;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0088cc;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <table align="center" bgcolor="#ffffff" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" style="padding: 20px;">
            <h1>Forgot Password?</h1>
            <p>No worries! Click the button below to reset your password.</p>
            <p><a class="button" href=${link}>Reset Password</a></p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
    };
    switch (reason) {
        case "login":
            return message.login;

        case "singUp":
            return message.signup;

        case "resetPassword":
            return message.resetPassword;

        default:
            console.log("error from nodeMailer");
    }
}

module.exports= body