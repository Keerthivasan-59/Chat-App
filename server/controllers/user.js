import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const keyword = req.query.search?{
    $or:[
      {name: {$regex: req.query.search, $options:'i'}},
      {email:{$regex: req.query.search,$options:'i'}}
    ]
  }:{}
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
res.status(200).json(users)
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { name: existingUser.name, id: existingUser._id },
      "test",
      { expiresIn: "3h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error.message);
  }
};

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword, pic } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Enter all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });
    const token = jwt.sign({ name: newUser.name, id: newUser._id }, "test", {
      expiresIn: "3h",
    });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error.message);
  }
};
