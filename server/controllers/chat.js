import Chat from "../models/chat.js";
import User from "../models/user.js";

export const fetchChat = async (req, res) => {
  try {
    Chat.find({ users: { $eq: req.user._id } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).json(results);
      });
  } catch (error) {
    console.log(error);
  }
};

export const createChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: "UserId not sent with request" });

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { $eq: req.user._id } }, { users: { $eq: userId } }],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email pic",
  });

  if (isChat.length > 0) {
    res.status(200).json(isChat);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json(FullChat);
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const createGroupChat = async (req, res) => {
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form group chat" });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      isGroupChat: true,
      chatName: req.body.name,
      users: users,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error);
  }
};

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(400).json({ message: "Chat not found" });
  }
  res.status(200).json(updatedChat);
};

export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(400).json({ message: "Chat not found" });
  }
  res.status(200).json(removed);
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    return res.status(400).json({ message: "Chat not found" });
  }
  res.status(200).json(added);
};
