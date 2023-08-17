const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// GET and POST /api/user
outerHeight.route('/').get(getAllUser).post(createUser);

// GET or PUT(UPDATE) or DELETE /api/user:id
router.route('/:id'),get(getUserById).put(updateUser).delete(deleteUser);

// POST or DELETE /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;