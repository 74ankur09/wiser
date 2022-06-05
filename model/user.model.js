const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true

    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    
}, {
    timestamps: true
})


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })

    if (!user) {
        return {error: "Wrong Credentials"}
    }

    const isMatch = await bcrypt.compare(password, user.password)


    if (!isMatch) {
        return {error: "Wrong Credentials"}
    }

    return { user }
}

userSchema.methods.qualifySave = async function () {
    
    const user = this;

    if (!validator.isEmail(user.email)) {
        return { ok: false, error: "Invalid Email" };
    }

    if (!validator.matches(user.username, "^[a-zA-Z0-9]*$")) {
        return { ok: false, error: "Username can only contain letters and numbers" };
    }

    if (!validator.matches(user.name, "^[a-zA-Z ]*$")) {
        return { ok: false, error: "Name is incorrect" };
    }
    
    if (user.password.length < 7) {
        return { ok: false, error: "Use a Strong Password" };
    }
    console.log(user.email)
    const existEmail = await User.findOne({ email: user.email });
    console.log(existEmail)
    //console.log(existEmail)

    if (existEmail != null) {
        return { ok: false, error: "Email already registered" };
    }

    const existUsername = await User.findOne({ username: user.username });

    //console.log(existUsername)

    if (existUsername != null) {
        return { ok: false, error: "Username already registered" };
    }

    return { ok: true, error: "" };
}



userSchema.pre('save', function (next) {

    const user = this
    console.log('ankur jainnnnnnnnnnnnnnnnnnnnn')
    if (user.isModified('password')) {
        console.log('111111111')
        bcrypt.hash(user.password, 8).then((hashedPassword) => {
            console.log('222222222222')
            user.password = hashedPassword;
            next();
        });
    } else {
        next();
    }
})


const JWT_SECRET = process.env.JWT_SECRET
userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(JWT_SECRET)
    const token = jwt.sign({
        _id: user._id.toString()
    },  JWT_SECRET);


    return token;

}

const User = mongoose.model('User', userSchema);

module.exports = User