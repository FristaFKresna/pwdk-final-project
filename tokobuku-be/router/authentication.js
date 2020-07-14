const Router = require('express').Router()
const Controller = require('./../controller/authentication')

Router.post('/register', Controller.register)
Router.post('/verify', Controller.verify)
Router.post('/login', Controller.login )
Router.post('/otp', Controller.resendOtp)
Router.post('/reset-password', Controller.resetPassword)
Router.post('/send-reset-code', Controller.forgetPassword)


module.exports = Router
