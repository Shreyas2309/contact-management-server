import express from 'express'

import {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} from '../controller/contactsController.js'

import { validateToken } from '../middleware/validateTokenHandler.js'

const router = express.Router()

router.use(validateToken)

router.route('/').get(getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

export default router;