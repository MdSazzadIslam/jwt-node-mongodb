require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

exports.getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    return res.status(500).send({ auth: false, message: "Server error" });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        active: user.active,
        role: user.role,
      });
    }
  } catch (error) {
    return res.status(500).send({ auth: false, message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: "Please enter email and password." });
  } else {
    const user = await userService.checUserExist(req.body);
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    //creating a token
    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT_KEY, {
      expiresIn: 86400, // expires in 24 hours
    });

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        active: user.active,
        role: user.role,
        token: token,
      });
    } else {
      return res
        .status(401)
        .send({ auth: false, message: "Please check all the data" });
    }
  }
};

exports.registration = async (req, res, next) => {
  debugger;
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.json({ success: false, msg: "Please fillup required field." });
  } else {
    const userExists = await userService.checkEmailExist(req.body);

    if (userExists) {
      return res
        .status(400)
        .send({ auth: false, message: "Email already exists" });
    }

    const user = await userService.registration(req.body);

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        active: user.active,
        role: user.role,
      });
    } else {
      return res
        .status(400)
        .send({ auth: false, message: "Something went wrong" });
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  const user = await userService.getById(req.params.id);
  if (user) {
    await userService.deleteUser(req.params.id);
    return res.status(200).send({ auth: false, message: "Deleted" });
    console.log(isDeleted);
  } else {
    return res.status(404).send({ auth: false, message: "User not found" });
  }
};

exports.updateUser = async (req, res, next) => {
  const user = await userService.getById(req.params.id);
  console.log(user);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.active = req.body.active || user.active;
    user.role = req.body.role || user.role;

    const newUser = await userService.updateUser(req.params.id, user);
    res.json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      active: user.active,
      role: user.role,
    });
  } else {
    return res.status(404).send({ auth: false, message: "User not found" });
  }
};
