"use server"

import { CreateEventParams, DeleteEventParams, GetAllEventsParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import { revalidatePath } from "next/cache"
import { Category } from "../database/models/category.model"

const populateEvent = async (query: any) => {
    return query.populate({ path: 'organiser', model: User, select: "_id firstName lastName" }).populate({
        path: "category", model: Category, select: "_id, name"
    })
}



export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDatabase()
        const organiser = await User.findById(userId)
        if (!organiser) {
            throw new Error("Organiser not found")
        }

        const newEvent = await Event.create({ ...event, category: event.categoryId, organiser: userId })
        return JSON.parse(JSON.stringify(newEvent))
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        handleError(error)
    }
}

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase()
        const event = await populateEvent(Event.findById(eventId))
        if (!event) { 
            throw new Error("Event not found")
        }
        return JSON.parse(JSON.stringify(event))
    } catch (error) {
        handleError(error)
    }
}


export const getAllEvents = async ({query, limit = 6, page, category}: GetAllEventsParams) => {
    try {
        await connectToDatabase()
        const conditions = {}
        const eventQuery = Event.find(conditions).sort({ createdAt: 'desc' }).skip(0).limit(limit)
        const events = await populateEvent(eventQuery)
        const totalEventsCount = await Event.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(totalEventsCount / limit)
        }
    } catch (error) {
        handleError(error)
    }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
    try {
        await connectToDatabase()
        const deletedEvent = await Event.findOneAndDelete(eventId)
        if (deletedEvent) {
            revalidatePath(path)
        }

    } catch (error) {
        handleError(error)
    }
}