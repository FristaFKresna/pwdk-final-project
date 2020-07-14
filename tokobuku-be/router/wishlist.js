const Router = require('express').Router()
const Controller = require('./../controller/wishlist')

Router.get('/:id_user', Controller.getDataWishlistByIdUser)
Router.post('/', Controller.addToWishList)
Router.delete('/:id', Controller.deleteWishlist)

module.exports = Router