const Company = require('../models/company');

exports.addCompany = (req, res) => {
    const companyObj = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        para: req.body.para
    };

    const company = new Company(companyObj);
    company.save((error, company) => {
        if(error) return res.status(400).json({error});
        if(company) {
            return res.status(201).json({ company: company })
        }
    })
}

exports.getCompanies = (req, res) => {
    Company.find({}).exec((error, company) => {
        if(error) return res.status(400).json({ error });
        if(company) {
            return res.status(200).json({
                apiStatus: true,
                companies: company
            })
        }
    })
}