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
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // use false if not using HTTPS in dev
        maxAge: 3600000 // 1 hour
    });
    res.status(200).json({ message: 'Login successful', token });
}));
app.post('/api/v1/content', middleware_1.middleware, (req, res) => {
    res.status(200).json({ message: 'Content created successfully' });
});
app.get('/api/v1/content', (req, res) => {
});
app.delete('/api/v1/content', (req, res) => {
});
app.post('/api/v1/soul/share', (req, res) => {
});
app.get('/api/v1/soul/:shareLink', (req, res) => {
});
app.listen(PORT);
