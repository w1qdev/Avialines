import { Router } from 'express'
import Admin from '../models/Admin.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export const adminRouter = Router()

// [GET] http://localhost:3000/api/admins/
adminRouter.get('/', async (req, res) => {
    try {
        // TODO: Get all admins [only for main admins]
        const allAdmins = await Admin.find()

        return res.send({ message: "Admins", body: allAdmins })
    } catch (e) {
        console.log(`Some Internal Error ${e}`)
        return res.send({ message: "Some Internal Error" })
    }
})

// [POST] http://localhost:3000/api/admins/create
adminRouter.post('/create', async (req, res) => {
    try {
        // FIXME: Get all admins [only for main admins]
        const { fullName, password } = req.body

        const existsAdmin = await Admin.findOne({ fullName })

        if (existsAdmin) {
            return res.send({ message: "The admin with this full name exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt)
        const token = jwt.sign({
            fullName
        }, process.env.JWT_SECRET, { expiresIn: '325d' })

        const admin = new Admin({
            ...req.body,
            password: hasedPassword
        })

        await admin.save()
        .then(() => {
            return res.send({ 
                message: "New admin has been successfully created", 
                body: { token, fullName, role: admin.role } })
        })
        .catch(() => {
            return res.send({ message: "Something gone wrong" })
        })
    } catch (e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal error", status: 500 })
    }
})


// [POST] http://localhost:3000/api/admins/login
adminRouter.post('/login', async (req, res) => {
    try {
        const { fullName, password, secretWord } = req.body

        const admin = await Admin.findOne({ fullName })

        if (!admin) {
            return res.send({ message: "Full name, password or secret word is uncorrect" })
        }

        const passwordCheck = await bcrypt.compare(password, admin.password)

        if (!passwordCheck || secretWord !== admin.secretWord) {
            return res.send({ message: "Full name, password or secret word is uncorrect" })
        }

        return res.send({ message: "Successfully logged in" })
    } catch (e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal error", status: 500 })   
    }
    
})


// [PUT] http://localhost:3000/api/admins/change
adminRouter.put('/change', async (req, res) => {
    try {
        // TODO: change admin data
        // FIXME: Admin data not changing
        const { id, password, fullName } = req.body

        const admin = await Admin.findOne({ fullName })
        
        if (!admin) {
            return res.send({ message: "Admin not found" })
        }

        // const passwordCheck = await bcrypt.compare(password, admin.password)
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(password, salt)

        await Admin.findOneAndUpdate({ _id: id }, { ...req.body, password: HashedPassword })

        return res.send({ message: "Admin found, changes successfully applied" })
    } catch (e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal error", status: 500 })   
    }
})

// [DELETE] http://localhost:3000/api/admins/remove
adminRouter.delete('/remove', async (req, res) => {
    try {
        // TODO: remove admin [only main admin]
        const { id } = req.body

        const removedAdmin = await Admin.findOneAndRemove({ _id: id })

        console.log(removedAdmin)

        if (!removedAdmin) {
            return res.send({ message: "Admin not exists" })
        }

        return res.send({ message: "Admin has been successfully removed" })
    } catch (e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})