const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { patternURL } = require('../utils/constants');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

router.get('/', getCards); // возвращает все карточки

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(patternURL),
  }),
}), createCard); // создает карточку

router.delete('/:cardId', validateCardId, deleteCard); // запрос удаляет карточку

router.put('/:cardId/likes', validateCardId, likeCard); // поставить лайк карточке

router.delete('/:cardId/likes', validateCardId, dislikeCard); // убрать лайк с карточки

module.exports = router;
