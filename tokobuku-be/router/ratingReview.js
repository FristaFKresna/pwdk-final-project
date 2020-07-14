const Router = require('express').Router()
const Controller = require('./../controller/ratingReview')

Router.get('/:id_product', Controller.getRatingReviewByIdProduct)
Router.post('/', Controller.postNewRatingReview)


module.exports = Router