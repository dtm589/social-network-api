const { User, Thought } = require("../models");

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No user found with this id!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    // create a user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.jsoin(err));
    },

    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.stataus(404).json({ message: "No user found with this id." });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No user found with this id." });
                }
                // get ids of users's 'thoughts' and delete them
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.json({ message: "User and their thoughts deleted!" });
            })
            .catch((err) => res.json(err));
    },

    //add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No user found with this id." });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    //delete friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.UserId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No user found with this id." });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = userController;