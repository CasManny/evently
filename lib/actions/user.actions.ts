"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import Event from "../database/models/event.model";
import { Order } from "../database/models/order.models";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDatabase()
        const newUser = await User.create(user)
        console.log(newUser)
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
  }
};

export const getUserById = async (userId: string) => {
    try {
        await connectToDatabase()
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    try {
        await connectToDatabase()
        const updateUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })
        if (!updateUser) {
            throw new Error("User update failed")
        }
        return JSON.parse(JSON.stringify(updateUser))
    } catch (error) {
        handleError(error)
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await connectToDatabase()
        // find the user to delete
        const userToDelete = await User.findOne({ clerkId })
        if (!userToDelete) {
            throw new Error("User not found")
        }
        // unlink relationships
        await Promise.all([
            // Update the 'events' collection to remove references to the user 
            Event.updateMany(
                { _id: { $in: userToDelete.events } },
                {$pull: { organiser: userToDelete}}
            ),
            // Update the 'orders' collection to remove references to the user
            Order.updateMany(
                { _id: { $in: userToDelete.orders } },
                {$unset: { buyer: 1}}
            )
        ])
        // Delete User
        const deletedUser = await User.findByIdAndDelete(userToDelete._id)
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deleteUser)): null
    } catch (error) {
        handleError(error)
    }
}
