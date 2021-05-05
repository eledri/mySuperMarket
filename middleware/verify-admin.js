const jwt = require("jsonwebtoken");

// Header:
// authorization: "Bearer the-token"
function verifyAdmin(request, response, next) {
  // If there is no authorization header:
  if (!request.headers.authorization) {
    response.status(401).send("You are not logged-in!");
    return;
  }

  // Take the token:
  const token = request.headers.authorization.split(" ")[1];
  // If no value in the token:
  if (!token) {
    response.status(401).send("You are not logged-in!");
    return;
  }

  // Verify the token:
  jwt.verify(token, "RandomKey", (err, payload) => {
    // payload.user
    if (err && err.message === "jwt expired") {
      response
        .status(403)
        .send("זמן השהייה באתר הסתיים, יש לבצע התחברות מחדש.");
      return;
    }

    if (err) {
      response.status(401).send("You are not logged-in!");
      return;
    }

    if (!payload.user.isAdmin) {
      response
        .status(401)
        .send("אתה לא מנהל מערכת, פעולות אלו למנהל מערכת בלבד");
      return;
    }

    next();
  });
}

module.exports = verifyAdmin;
