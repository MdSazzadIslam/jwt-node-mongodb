const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

class userService {
  static async login(data) {
    return await userModel.create({ data });
  }

  static async registration(data) {
    const user = new userModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8), //encrypting password with Bcrypt’s hashing method
      active: data.active,
      role: data.role,
    });

    return await userModel(user).save();
  }

  static async updateUser(id, data) {
    return await userModel.findOneAndUpdate(id, { $set: data });
  }

  static async checkEmailExist(data) {
    const { email } = data;
    return await userModel.findOne({ email });
  }

  static async checUserExist(data) {
    const { email, password } = data;
    return await userModel.findOne({ email }).select("+password");
  }

  static async deleteUser(id) {
    console.log(id);
    return await userModel.findOneAndDelete(id);
  }

  static async getAll() {
    return await userModel.find({});
  }

  static async getById(id) {
    return await userModel.findById(id);
  }
}

module.exports = userService;
