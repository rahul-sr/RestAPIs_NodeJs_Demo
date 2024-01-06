const express = require("express");
let { products, users, roles } = require("./data");
const { randomUUID } = require("crypto");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportMiddleware = require("./passport");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

const PORT = 3000;
const productRoute = require("./routes/product");
const allowRoles = require("./authorization");

app.use(express.json());
app.use(passport.initialize());
passportMiddleware(passport);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(
  "/api",
  passport.authenticate("jwt", { session: false }),
  allowRoles([roles.ADMIN, roles.MEMBER]),
  (req, res) => {
    console.log("Test API", req.user);
    res.send("Test API");
  }
);

app.use("/api/products", passport.authenticate("jwt", { session: false }), productRoute);

app.post("/login", (req, res) => {
  let { username } = req.body;
  let user = users.find((user) => user.username == username);
  if (user) {
    var token = jwt.sign(user, "secretkey");
    res.json({
      token: `Bearer ${token}`,
    });
  } else {
    res.status(403).send("User doesn't exist");
  }
});

app.listen(PORT, () => {
  console.log("App is running on PORT:", PORT);
});
