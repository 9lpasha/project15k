const merchant_model = require('./merchant_model')

merchant_model.createFirstTable()
    .then(() => merchant_model.fillingFirstTable())

merchant_model.createSecondTable()
    .then(() => merchant_model.fillingSecondTable())