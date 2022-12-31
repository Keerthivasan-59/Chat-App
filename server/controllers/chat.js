import Chat from "../models/chat.js";
import User from "../models/user.js";

export const fetchChat = async (req, res) => {
  try {
    Chat.find({ users: { $eq: req.userId } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage").sort({updatedAt: -1})
      .then(async (results)=>{
       results=await User.populate(results,{
        path: "latestMessage.sender",
        select:"name pic email"
       })

       res.status(200).json(results)
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
    $and: [{ users: { $eq: req.userId } }, { users: { $eq: userId } }],
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
      users: [req.userId, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json(FullChat);
    } catch (error) {
      console.log(error);
    }
  }
};

export const createGroupChat = async (req, res) => {};

export const renameGroup = async (req, res) => {};

export const removeFromGroup = async (req, res) => {};

export const addToGroup = async (req, res) => {};
