const merchant_model = require('./merchant_model')

merchant_model.createCompanyTable()
    .then(() => merchant_model.fillingCompanyTable())

merchant_model.createObjectTable()
    .then(() => merchant_model.fillingObjectTable())

merchant_model.createContactsTable()
    .then(() => merchant_model.fillingContactTable())

merchant_model.createYurTable()
    .then(() => merchant_model.fillingYurTable())