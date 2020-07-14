const Router = require('express').Router()
const Controller = require('./../controller/users')

Router.get('/:id_user', Controller.getUserDetailById)
Router.post('/', Controller.postUserProfileDetail)
Router.patch('/:id_user', Controller.editUserDetail)

module.exports = Router