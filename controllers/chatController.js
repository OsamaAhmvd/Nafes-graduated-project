const Chat = require('../models/Chat');

// إنشاء أو استرجاع المحادثة بين user و doctor
exports.getOrCreateChat = async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, otherUserId] }
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, otherUserId],
        messages: []
      });
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// إرسال رسالة
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const userId = req.user._id;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ msg: 'Chat not found' });

    const message = { sender: userId, text };
    chat.messages.push(message);
    await chat.save();

    res.json(message);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// استرجاع كل الرسائل في محادثة
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate('messages.sender', 'name email personType');
    if (!chat) return res.status(404).json({ msg: 'Chat not found' });

    res.json(chat.messages);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
