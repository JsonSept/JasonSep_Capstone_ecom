import express from 'express'
import controller from '../controller/users.js'
const router = express.Router()

router
    .route('/')
            .get(controller.getUsers)
            .post(controller.addUser)
         

router
    .route('/:id')
            .delete(controller.deleteUser )
            .patch(controller.editUser)
            .get(controller.getUser)

export default router