const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : { type: String },
    hashPassword: { type: String }
}, { timestamps: true })

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hashPassword)
    }
}

module.exports = mongoose.model('User', userSchema)