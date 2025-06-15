"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksModel = exports.TagsModel = exports.PostsModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Types = Schema.Types;
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const TagsSchema = new Schema({
    title: { type: String, required: true, unique: true }
});
const contentTypes = ['text', 'image', 'video', 'audio'];
const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, enum: contentTypes, required: true },
    author: { type: Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tags' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const LinkSchema = new Schema({
    hash: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true }
});
//  Safer model definition
const UserModel = mongoose_1.default.models.Users || mongoose_1.default.model('Users', UserSchema);
exports.UserModel = UserModel;
const PostsModel = mongoose_1.default.models.Posts || mongoose_1.default.model('Posts', PostSchema);
exports.PostsModel = PostsModel;
const TagsModel = mongoose_1.default.models.Tags || mongoose_1.default.model('Tags', TagsSchema);
exports.TagsModel = TagsModel;
const LinksModel = mongoose_1.default.models.Links || mongoose_1.default.model('Links', LinkSchema);
exports.LinksModel = LinksModel;
