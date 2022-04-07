const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

const { validateUserCard, validateId } = require('../middlewares/validations');

router.get('/cards', getCards);

router.post('/cards', validateUserCard, createCard);

router.put('/cards/:id/likes', validateId, likeCard);

router.delete('/cards/:id', validateId, deleteCard);

router.delete('/cards/:id/likes', validateId, dislikeCard);

module.exports = router;
