const sendEmail = require("../utils/sendEmail");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      // JWT Token Generate
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Login Email Notification
      try {
        await sendEmail(
          user.email,
          "Login Successful - Food Waste Management System",
          `Hello ${user.full_name},

You have successfully logged into your Food Waste Management account.

Login Details:
Email: ${user.email}
Role: ${user.role}

If this login was not performed by you, please contact the administrator immediately.

Thank you,
Food Waste Management Team`
        );
      } catch (emailError) {
        console.log("Email sending failed:", emailError);
      }

      // Send Response to React
      res.json({
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      });

    }
  );
};