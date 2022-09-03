const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { patternURL } = require('../utils/constants');
const {
  getUsers,
  getUserById,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
});

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', validateUserId, getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile); // обновляет профиль

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(patternURL),
  }),
}), updateAvatar); // обновляет аватар

module.exports = router; // экспортировали роутер
