"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
// importing the models
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const utils_1 = require("./utils");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const saltRounds = 5;
mongoose_1.default.connect('mongodb+srv://23bcs037:2PNRnxkGdUPdjv4r@cluster0.q5kwrtg.mongodb.net/sweetnest-community');
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add zod validation here
    const { username, password, email } = req.body;
    const UserSchema = zod_1.default.object({
        username: zod_1.default.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long'),
        password: zod_1.default.string().min(6, 'Password must be at least 6 characters long'),
        email: zod_1.default.string().email('Invalid email format')
    });
    const isuserExists = yield db_1.UserModel.findOne({ username });
    if (isuserExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const parsed_data = UserSchema.safeParse({ username, password, email });
    if (!parsed_data.success) {
        res.status(400).json({ errors: parsed_data.error.errors });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    // Check if the user already exists
    yield db_1.UserModel.create({
        username,
        password: hashedPassword,
        email
    });
    res.status(201).json({ message: 'User created successfully' });
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.UserModel.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const isvalid = yield bcrypt_1.default.compare(password, user.password);
    if (!isvalid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id, username: username }, config_1.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
}));
app.post('/api/v1/content', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { title, type, tags, link, content } = req.body;
        const contentTypes = ['text', 'image', 'video', 'audio'];
        const PostSchema = zod_1.default.object({
            title: zod_1.default.string().min(1, 'Title is required'),
            type: zod_1.default.enum(contentTypes),
            tags: zod_1.default.array(zod_1.default.string()).optional(),
            link: zod_1.default.string().url('Link must be a valid URL').optional(),
            content: zod_1.default.string().optional() // Optional for non-text types
        });
        const parsed_data = PostSchema.safeParse({ title, type, tags, link });
        if (!parsed_data.success) {
            return res.status(400).json({ errors: parsed_data.error.errors });
        }
        const { title: validatedTitle, type: validatedType, tags: validatedTags, link: validatedLink, content: validatedContent } = parsed_data.data;
        let tagIds = [];
        if (validatedTags && validatedTags.length > 0) {
            for (const tagName of validatedTags) {
                // Check if tag exists, if not create it
                let existingTag = yield db_1.TagsModel.findOne({ title: tagName }); // Changed from 'name' to 'title'
                if (!existingTag) {
                    // Create new tag
                    existingTag = yield db_1.TagsModel.create({ title: tagName }); // Changed from 'name' to 'title'
                }
                tagIds.push(existingTag._id);
            }
        }
        const newPost = yield db_1.PostsModel.create({
            title: validatedTitle,
            type: validatedType,
            userId: new mongoose_1.default.Types.ObjectId(userId), // Convert string to ObjectId
            tags: tagIds,
            link: validatedLink,
            content: validatedContent || '', // Ensure content is a string
        });
        res.status(201).json({
            message: 'Content created successfully',
            postId: newPost._id
        });
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
// Fixed backend endpoint - the main issue was missing 'await' and 'return'
app.get('/api/v1/content', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fixed: Get userId from req.user (set by middleware)
        // @ts-ignore
        const userId = req.user; // or req.userId depending on your middleware
        // Fixed: Added 'await' and proper error handling
        const content = yield db_1.PostsModel.find({
            userId: new mongoose_1.default.Types.ObjectId(userId)
        }); // Added tags population
        // Fixed: Return the content properly
        res.status(200).json({
            content: content,
            message: 'Content fetched successfully'
        });
    }
    catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
app.delete('/api/v1/content', (req, res) => {
});
app.post('/api/v1/soul/share', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const issharable = req.body.issharable;
    const checkuserlink = yield db_1.LinksModel.findOne({
        userId: new mongoose_1.default.Types.ObjectId(userId)
    });
    if (checkuserlink && issharable) {
        res.status(400).json({ message: 'Link already exists' });
        return;
    }
    if (issharable) {
        const hash = (0, utils_1.hashing)(20);
        yield db_1.LinksModel.create({
            hash,
            userId: new mongoose_1.default.Types.ObjectId(userId)
        });
        res.status(201).json({ message: 'Link created successfully', hash });
        return;
    }
    else {
        yield db_1.LinksModel.deleteOne({
            userId: new mongoose_1.default.Types.ObjectId(userId)
        });
        res.status(200).json({ message: 'Link deleted successfully' });
        return;
    }
}));
app.get('/api/v1/soul/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareLink;
        const userlink = yield db_1.LinksModel.findOne({ hash });
        if (!userlink) {
            return res.status(404).json({ message: 'Link not found' });
        }
        const userdetails = yield db_1.UserModel.findOne({ _id: userlink.userId });
        if (!userdetails) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Fixed: Added proper query object for finding posts by userId
        const userPosts = yield db_1.PostsModel.find({ userId: userlink.userId });
        res.status(200).json({
            message: 'Link found',
            user: {
                userId: userdetails._id,
                username: userdetails.username,
                email: userdetails.email,
                createdAt: userdetails.createdAt,
                updatedAt: userdetails.updatedAt
            },
            link: userlink.hash,
            posts: userPosts // Return all posts instead of just one
        });
    }
    catch (error) {
        console.error('Error fetching shared link:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
app.listen(PORT);
