const Router = require('express').Router()
const Controller = require('./../controller/category')

Router.get('/',Controller.getAllCategories)
Router.post('/',Controller.postNewCategories)
Router.get('/categoryfiltered',Controller.getCategoryFiltered)

module.exports = Router