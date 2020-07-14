const Router = require('express').Router()
const Controller = require('./../controller/statusTrans')

Router.get('/', Controller.getTransactionStatus)
Router.patch('/', Controller.updateStatus)
Router.patch('/rejected', Controller.rejectStatus)


module.exports = Router