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
app.post('/api/v1/content', middleware, async (req, res : any) => {
    try {
        const userId = (req as any).user;
        const { title, type, tags , link } = req.body;
        
        const contentTypes = ['text', 'image', 'video', 'audio'] as const;
        const PostSchema = zod.object({
            title: zod.string().min(1, 'Title is required'),
            type: zod.enum(contentTypes),
            tags: zod.array(zod.string()).optional(),
            link: zod.string().url('Link must be a valid URL').optional()
        });

        const parsed_data = PostSchema.safeParse({ title, type, tags , link});
        if (!parsed_data.success) {
            return res.status(400).json({ errors: parsed_data.error.errors });
        }

        const { title: validatedTitle, type: validatedType, tags: validatedTags , link: validatedLink } = parsed_data.data;

        let tagIds: mongoose.Types.ObjectId[] = [];
        
        if (validatedTags && validatedTags.length > 0) {
            for (const tagName of validatedTags) {
                // Check if tag exists, if not create it
                let existingTag = await TagsModel.findOne({ title: tagName }); // Changed from 'name' to 'title'
                
                if (!existingTag) {
                    // Create new tag
                    existingTag = await TagsModel.create({ title: tagName }); // Changed from 'name' to 'title'
                }
                
                tagIds.push(existingTag._id);
            }
        }

        const newPost = await PostsModel.create({
            title: validatedTitle,
            type: validatedType,
            userId: new mongoose.Types.ObjectId(userId), // Convert string to ObjectId
            tags: tagIds,
            link: validatedLink
        });

        res.status(201).json({ 
            message: 'Content created successfully',
            postId: newPost._id 
        });

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ 
            message: 'Internal server error'
        });
    }
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