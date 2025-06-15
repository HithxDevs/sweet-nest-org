import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import zod from 'zod';
import bcrypt from 'bcrypt';
import {JWT_SECRET} from './config';
// importing the models
import { UserModel, PostsModel, TagsModel, LinksModel } from './db';
import {middleware} from './middleware';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3000;
const app = express();

const saltRounds = 5;

mongoose.connect('mongodb+srv://23bcs037:2PNRnxkGdUPdjv4r@cluster0.q5kwrtg.mongodb.net/sweetnest-community');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.post('/api/v1/signup' , async(req , res:any) => {
    // add zod validation here
    const {username, password, email} = req.body;

    const UserSchema = zod.object({
        username: zod.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long') ,
        password: zod.string().min(6, 'Password must be at least 6 characters long'),
        email: zod.string().email('Invalid email format')
    })

    const isuserExists = await UserModel.findOne({ username });
    if(isuserExists) {
         return res.status(400).json({ message: 'Username already exists'});
    }
    const parsed_data = UserSchema.safeParse({ username, password, email });
    
    if (!parsed_data.success) {
        res.status(400).json({ errors: parsed_data.error.errors });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Check if the user already exists
    await UserModel.create({
        username ,
        password : hashedPassword,
        email
    });
    
    res.status(201).json({message: 'User created successfully'});
});
app.post('/api/v1/signin' , async(req , res:any) => {
    const {username , password} = req.body;

    const user =await UserModel.findOne({ username });
    if(!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const isvalid = await bcrypt.compare(password, user.password );

    if(!isvalid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id , username : username }, JWT_SECRET, { expiresIn: '1h' });
    
    
    
    res.cookie('token', token, {
    httpOnly: true,
    secure: true, // use false if not using HTTPS in dev
    maxAge: 3600000 // 1 hour
    });
    res.status(200).json({ message: 'Login successful', token });


    
});
app.post('/api/v1/content' ,middleware , (req , res) => {
    res.status(200).json({ message: 'Content created successfully' });
});
app.get('/api/v1/content' , (req , res:any) => {
    
});
app.delete('/api/v1/content' , (req , res:any) => {

});
app.post('/api/v1/soul/share' , (req , res:any) => {
    
});
app.get('/api/v1/soul/:shareLink' , (req , res:any) => {
    
});


app.listen(PORT);