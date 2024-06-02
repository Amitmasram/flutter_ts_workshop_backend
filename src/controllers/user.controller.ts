import { Request, Response } from "express";
import { getUserRepo, deleteUserRepo, createUserRepo, updateUserRepo } from "../repositories/user.repository";
import { IUserInterface } from "../database/interfaces/user.interface";
import { error } from "console";


export const getUserController = async (req: Request, res: Response) => {

    const userId = req.params.userId as string;
    try {
        const user = await getUserRepo(userId);
        if (user) {
            res.status(200).json({ data: user });

        } else {
            res.status(500).json({ error: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

export const createUserController = async (req: Request, res: Response) => {
    const user: IUserInterface = req.body;

    try {
        const succes = await createUserRepo(user);
        if (succes) {
            res.status(200).json({ data: user });
        } else {
            res.status(500).json({ error: "Usser not created" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });

    }
};


export const updateUserController = async (req: Request, res: Response) => {
    const updatedUser: IUserInterface = req.body;
    try {
        const succes = await updateUserRepo(updatedUser.uid, updatedUser);
        if (succes) {
            res.status(200).json({ data: "User updated" });

        } else {
            res.status(500).json({ error: "User not updated" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};



export const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    try {
        const succes = await deleteUserRepo(userId);
        if (succes) {
            res.status(200).json({ data: "User deleted" });

        } else {
            res.status(500).json({ error: "User not deleted" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });

    }
};