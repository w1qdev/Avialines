import { Router } from 'express'
import { error } from '../utils/chalk.js'
import Admin from '../models/Admin.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AdminActions from '../models/AdminActions.js'


export const adminRouter = Router()

// [GET] http://localhost:3000/api/admins/
adminRouter.get('/', async (req, res) => {
    try {
        // TODO: Get all admins [only for main admins]
        const allAdmins = await Admin.find()

        return res.send({ message: "Admins", body: allAdmins })
    } catch (e) {
        console.log(error(`Some Internal Error ${e}`))
        return res.send({ error: "Some Internal Error" })
    }
})

// [GET] http://localhost:3000/api/admin/actions
adminRouter.get('/actions', async (req, res) => {
    try {
        const allActions = await AdminActions.find()

        return res.send({ body: allActions })
    } catch (e) {

    }
})

// [POST] http://localhost:3000/api/admins/create
adminRouter.post('/create', async (req, res) => {
    try {
        // FIXME: Get all admins [only for main admins]
        const { fullName, password } = req.body

        const existsAdmin = await Admin.findOne({ fullName })

        if (existsAdmin) {
            return res.send({ error: "The admin with this full name exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt)
        const token = jwt.sign({
            fullName
        }, process.env.JWT_SECRET, { expiresIn: '325d' })

        const admin = new Admin({
            ...req.body,
            id: Date.now().valueOf(),
            password: hasedPassword
        })

        await admin.save()
        .then(() => {
            return res.send({ 
                message: "New admin has been successfully created", 
                body: { token, fullName, role: admin.role } })
        })
        .catch(() => {
            return res.send({ error: "Something gone wrong" })
        })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal error", status: 500 })
    }
})


// [POST] http://localhost:3000/api/admins/login
adminRouter.post('/login', async (req, res) => {
    try {
        const { fullName, password, secretWord } = req.body

        console.log(req.body)

        const admin = await Admin.findOne({ fullName })

        if (!admin) {
            return res.send({ error: "Full name, password or secret word is uncorrect" })
        }

        const passwordCheck = await bcrypt.compare(password, admin.password)

        if (!passwordCheck || secretWord !== admin.secretWord) {
            return res.send({ error: "Full name, password or secret word is uncorrect" })
        }

        const token = jwt.sign({
            fullName
        }, process.env.JWT_SECRET, { expiresIn: '325d' })

        const adminData = { fullName, role: admin.role, token }

        return res.send({ message: "Successfully logged in", adminData })
        // return res.send({ message: "Successfully logged in", adminData })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal error", status: 500 })   
    }
})


// [PUT] http://localhost:3000/api/admins/change
adminRouter.put('/change', async (req, res) => {
    try {
        // TODO: change admin data
        // FIXME: Admin data not changing
        let { id, fullName, role } = req.body
        role = role === 'Главный администратор' ? 'mainAdmin' : 'subAdmin'

        const admin = await Admin.findOne({ id })
        
        if (!admin) {
            return res.send({ error: "Admin not found" })
        }

        await Admin.findOneAndUpdate({ id }, {
            fullName,
            role
        })

        return res.send({ message: "Admin found, changes successfully applied" })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal error", status: 500 })   
    }
})

// [DELETE] http://localhost:3000/api/admins/remove
adminRouter.delete('/remove/:id', async (req, res) => {
    try {
        // TODO: remove admin [only main admin]
        const { id } = req.params

        const removedAdmin = await Admin.findOneAndRemove({ id })

        if (!removedAdmin) {
            return res.send({ error: "Admin not exists" })
        }

        return res.send({ message: "Admin has been successfully removed" })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})


