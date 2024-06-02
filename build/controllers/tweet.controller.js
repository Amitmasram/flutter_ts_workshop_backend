"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweetController = exports.updateTweetController = exports.createTweetController = exports.getTweetController = void 0;
const tweet_repository_1 = require("../repositories/tweet.repository");
const user_repository_1 = require("../repositories/user.repository");
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const tweet = yield (0, tweet_repository_1.getTweetRepo)(tweetId);
        if (tweet) {
            res.status(200).json({ data: tweet });
        }
        else {
            res.status(500).json({ error: "Tweet not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.getTweetController = getTweetController;
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        const succes = yield (0, tweet_repository_1.createTweetRepo)(tweet);
        if (succes) {
            const userUpdateSuccess = yield (0, user_repository_1.updateUserWithTweetIdRepo)(tweet.adminId, tweet.tweetId);
            if (userUpdateSuccess) {
                res.status(200).json({ data: tweet });
            }
            else {
                res.status(500).json({ error: "User not updated" });
            }
        }
        else {
            res.status(500).json({ error: "User not created" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.createTweetController = createTweetController;
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTweet = req.body;
    try {
        const succes = yield (0, tweet_repository_1.updateTweetRepo)(updatedTweet.tweetId, updatedTweet);
        if (succes) {
            res.status(200).json({ data: "Tweet updated" });
        }
        else {
            res.status(500).json({ error: "Tweet not updated" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.updateTweetController = updateTweetController;
// export const deleteTweetController = async (req: Request, res: Response) => {
//     const tweetId = req.params.tweetId as string;
//     const adminId = req.body.tweetId as string;
//     try {
//         const succes = await deleteTweetRepo(tweetId);
//         res.status(200).json({ data:"Tweet successfully deleted from TweetModel " });
//         if (succes) {
//             const userDeleteSuccess = await deleteUserWithTweetIdRepo(adminId,tweetId);
//          if(userDeleteSuccess){
//             res.status(200).json({ data: tweetId,message:"User Tweet deleted " });
//          }else{
//             res.status(500).json({ error: "User Tweet not deleted" });
//          }
//         } else {
//             res.status(500).json({ error: "Tweet not deleted" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error });
//     }
// };
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const adminId = req.body.adminId; // Ensure the correct extraction of adminId
    try {
        const success = yield (0, tweet_repository_1.deleteTweetRepo)(tweetId);
        if (success) {
            const userDeleteSuccess = yield (0, user_repository_1.deleteUserWithTweetIdRepo)(adminId, tweetId);
            if (userDeleteSuccess) {
                res.status(200).json({ data: tweetId, message: "Tweet successfully deleted from both TweetModel and UserModel" });
            }
            else {
                res.status(500).json({ error: "Tweet deleted from TweetModel but not from UserModel" });
            }
        }
        else {
            res.status(500).json({ error: "Tweet not deleted from TweetModel" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.deleteTweetController = deleteTweetController;
