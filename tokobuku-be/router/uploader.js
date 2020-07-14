const Router = require('express').Router()
const Controller = require('./../controller/uploader')

Router.post('/payment/:transaction_id', Controller.postPaymentConfirmation)
Router.post('/user-profile/:user_id', Controller.postUserProfilePict)
Router.patch('/edit-user-profile/:user_id', Controller.editUserProfilePict)
Router.post('/publisher-image/:id', Controller.postPublisherPict)
Router.post('/product-pict/:id_product', Controller.postProductPict)

module.exports = Router