import Joi from "joi";

export const createRoomParamsSchema = Joi.object({
  friendId: Joi.string().uuid().required(),
});
