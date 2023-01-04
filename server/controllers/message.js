import Message from "../models/message.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) return res.status(400).json("Invalid message");

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    console.log(error);
  }
};
