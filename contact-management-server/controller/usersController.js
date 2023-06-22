import User from '../models/userModel.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async(req,res) => {
    try {
        const { username, email, password } = req.body;
        if(username == "" || email == "" || password == ""){
            res.status(400).json({message: "All fields are mandatory"})
            return
        }

        const userAvailable = await User.findOne({email})

        if(userAvailable){
            res.status(400).json({ message: "User already exists"})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({message: `${user.id} ${user.email}`, response: "User creation successfull"})
    } catch (error) {
        res.status(400).json({message: "User creation failed", error: error})
    }
}

export const loginUser = async(req,res) => {
   try {
    const {email, password} = req.body

    if(email == "" || password == ""){
        res.status(400).json({ message: "All fields are mandatory" })
        return
    }
    
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m"}
        )
        res.status(201).json({ accessToken: accessToken , message: "Login user"})
    }else{
        res.status(401).json({message: "Invalid Credentials"})
    }
   } catch (error) {
    
   }
}

export const currentUser = async(req,res) => {
    res.status(201).json({user: req.user})
}