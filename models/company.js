const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    title: { type: String },
    subTitle: { type: String },
    para: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('category', companySchema)