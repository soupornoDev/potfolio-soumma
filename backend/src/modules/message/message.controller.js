import Message from "./message.model.js";
import ApiError from "../../utils/ApiError.js";

export async function createMessage(req, res) {
  const message = await Message.create(req.validatedBody);

  res.status(201).json({
    success: true,
    message: "Your message has been sent successfully",
    data: {
      id: message._id,
    },
  });
}

export async function getMessages(req, res) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);

  const filter = {};

  if (
    req.query.status &&
    ["new", "read", "replied", "archived"].includes(req.query.status)
  ) {
    filter.status = req.query.status;
  }

  const [messages, total] = await Promise.all([
    Message.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),

    Message.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: messages,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function updateMessageStatus(req, res) {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { status: req.validatedBody.status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  res.status(200).json({
    success: true,
    data: message,
  });
}

export async function deleteMessage(req, res) {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
}