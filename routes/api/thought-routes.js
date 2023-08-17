const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

// GET or POST /api/thoughts
router.route('/').get(getAllThought).post(createThought);

// GET or PUT(UPDATE) or DELETE /api/thoughts:id
router
    .route('/id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// POST /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;