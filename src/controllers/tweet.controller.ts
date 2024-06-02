import { Request, Response } from "express";
import { getTweetRepo, deleteTweetRepo, createTweetRepo, updateTweetRepo } from "../repositories/tweet.repository";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { deleteUserWithTweetIdRepo, updateUserWithTweetIdRepo } from "../repositories/user.repository";


export const getTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;

    try {
        const tweet = await getTweetRepo(tweetId);
        if (tweet) {
            res.status(200).json({ data: tweet });

        } else {
            res.status(500).json({ error: "Tweet not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

export const createTweetController = async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body;


    try {
        const succes = await createTweetRepo(tweet);
        if (succes) {

        const userUpdateSuccess = await updateUserWithTweetIdRepo(tweet.adminId, tweet.tweetId);
         if(userUpdateSuccess){
            res.status(200).json({ data: tweet });
         }else{
            res.status(500).json({ error: "User not updated" });
         }

           
        } else {
            res.status(500).json({ error: "User not created" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });

    }
};


export const updateTweetController = async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body;
    try {
        const succes = await updateTweetRepo(updatedTweet.tweetId, updatedTweet);
        if (succes) {
            res.status(200).json({ data: "Tweet updated" });

        } else {
            res.status(500).json({ error: "Tweet not updated" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};



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




export const deleteTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    const adminId = req.body.adminId as string;  // Ensure the correct extraction of adminId
    try {
        const success = await deleteTweetRepo(tweetId);
        if (success) {
            const userDeleteSuccess = await deleteUserWithTweetIdRepo(adminId, tweetId);
            if (userDeleteSuccess) {
                res.status(200).json({ data: tweetId, message: "Tweet successfully deleted from both TweetModel and UserModel" });
            } else {
                res.status(500).json({ error: "Tweet deleted from TweetModel but not from UserModel" });
            }
        } else {
            res.status(500).json({ error: "Tweet not deleted from TweetModel" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};