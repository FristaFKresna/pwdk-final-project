const Router = require('express').Router()
const Controller = require('./../controller/publishers')

Router.get('/', Controller.getDataPublishers)
Router.post('/', Controller.postNewPublisher)
Router.get('/filtered', Controller.getPublisherFiltered)

module.exports = Router
