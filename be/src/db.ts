import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Types = Schema.Types;




const UserSchema = new Schema({
    username : {type: String , required: true , unique: true},
    password : {type: String , required: true},
    email : {type: String , required: true , unique: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const TagsSchema = new Schema({
    title : { type : String , required: true  , unique: true }
})

const contentTypes = ['text', 'image', 'video', 'audio'];

const PostSchema = new Schema({
    title : { type : String , required: true },
    type : { type : String ,enum:contentTypes, required: true },
    content : { type : String , required: false }, // Optional for non-text types
    userId : { type : Types.ObjectId , ref: 'User' , required: true },
    tags : [{ type : Types.ObjectId , ref: 'Tags' }],
    link: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const LinkSchema = new Schema({
    hash : {type: String , required: true , unique: true},
    userId : { type: Types.ObjectId , ref: 'User' , required: true }
})

//  Safer model definition
const UserModel  = mongoose.models.Users  || mongoose.model('Users', UserSchema);
const PostsModel = mongoose.models.Posts  || mongoose.model('Posts', PostSchema);
const TagsModel  = mongoose.models.Tags   || mongoose.model('Tags', TagsSchema);
const LinksModel = mongoose.models.Links  || mongoose.model('Links', LinkSchema);


export {
  UserModel,
  PostsModel,
  TagsModel,
  LinksModel
};