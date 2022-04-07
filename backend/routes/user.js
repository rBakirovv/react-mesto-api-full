const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  findUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

const {
  validateUserData,
  validateUserAvatar,
  validateId,
} = require('../middlewares/validations');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:id', validateId, findUser);

router.patch('/users/me', validateUserData, updateProfile);

router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
