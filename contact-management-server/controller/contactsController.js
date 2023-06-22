import asyncHandler from 'express-async-handler'

import Contact from '../models/contactModel.js'

export const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id})
    if(!contacts){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contacts)
})

export const getContact = asyncHandler(async(req, res) => {
    
        const contact = await Contact.findById(req.params.id)
        if(!contact){
            res.status(404)
            throw new Error("Contact not found")
        }
    
        res.status(200).json({message: `got contacts for ${req.params.id}`, contact: contact})
    
})

export const createContact = asyncHandler(async(req, res) => {
    try {
        const {name, email, phone} = req.body


        if(name == "" || email == "" || phone == ""){
            res.status(400).json({message: "All fields are mandatory"})
        }
    
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id
        })
        
        res.status(201).json(contact)
    } catch (error) {

        res.status(400).json({error: error})
    }
   
})

export const updateContact = asyncHandler(async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)

        if(contact.user_id.toString() !== req.user.id){
            res.status(403)
            throw new Error("User dont have the permission to update the contact")
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json(updatedContact)
    } catch (error) {
        
    }
})

export const deleteContact = asyncHandler(async(req, res) => {
    try {

        const contact = await Contact.findById(req.params.id)
        if(contact.user_id.toString() !== req.user.id){
            res.status(403)
            throw new Error("User dont have the permission to update the contact")
        }
        await Contact.deleteOne({ _id: req.params.id });
        res.status(201).json({message: "Successfully deleted"})
    } catch (error) {
        res.send(error)
        
    }
    
})

