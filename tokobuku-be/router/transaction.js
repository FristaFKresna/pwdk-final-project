const Router = require('express').Router()
const Controller = require('./../controller/transaction')

Router.post('/', Controller.onCheckOut)
Router.get('/:user_id', Controller.getDataTransaction)
Router.get('/detail/:transaction_id', Controller.getTransactionDetailByIdTransactionId)
Router.get('/', Controller.getAllTransaction)
Router.post('/top-ten', Controller.getTopTenProducts)

module.exports = Router