const db = require('./../database/mysql')
const {uploader} = require('../helpers/uploader')
const fs = require('fs')


const postPaymentConfirmation = (req,res) => {
    const upload = uploader('/payment', 'PAY').single('pay_image')
    
    upload (req, res, (err) => {
        if(err) throw err
        const image = req.file
        const data = JSON.parse(req.body.data)
        const id = req.params.transaction_id

        const dataToUpdate = {
            transaction_status_id : 2,
            url_payment_proof : req.file.path,
            name_bank_account : data.name_bank_account,
            bank_account : data.bank_account
        }

        const sql = 'update transaction set ? where id = ?'
        db.query(sql, [dataToUpdate, id], (err,result) => {
            try{
                if(err) throw err
                res.json({
                    error : false,
                    message : 'Payment Proof Updated'
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })
    })
}



const postUserProfilePict = (req,res) => {
    const upload = uploader('/profile', 'PROFILE').single('profile_image')

    upload(req, res, (err) => {
        if(err) throw err
        const image = req.file
        const id = req.params.user_id

        const dataToUpdate = {
            url_profile_image : req.file.path
        }

        const sql = 'update user_detail set ? where users_id = ?'
        db.query(sql, [dataToUpdate, id], (err, result) => {
            try{
                if(err) throw err
                res.json({
                    error : false,
                    message : 'Profile Picture Updated'
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })
    })
}


const editUserProfilePict = (req,res) => {
    const upload = uploader('/profile', 'PROFILE').single('edit_profile_image')
    const user_id = req.params.user_id

    upload(req, res, (err) => {
        if(err) throw err

        let sql = 'select * from user_detail where users_id = ?'
        db.query(sql, user_id, (err,result) => {
            try{
                if(err) throw err
                const newPath = req.file.path
                const oldPath = result[0].url_profile_image
                let dataPath = {url_profile_image : newPath}
                fs.unlinkSync(oldPath)

                let sql = 'update user_detail set ? where users_id = ?'
                db.query(sql, [dataPath, user_id], (err,result) => {
                    try{
                        if(err) throw err
                        res.json({
                            error : false,
                            message : 'Update Image Success!'
                        })
                    }catch(err){
                        res.json({
                            error : true,
                            message : err.message
                        })
                    }
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })
    })
}


const postPublisherPict = (req,res) => {
    const upload = uploader('/publisher', 'PUBLISHER').single('publisher')

    upload(req, res, (err) => {
        if(err) throw err
        const image = req.file
        const id = req.params.id

        const dataToUpdate = {
            url_publisher_logo : req.file.path
        }

        const sql = 'update publishers set ? where id = ?'
        db.query(sql, [dataToUpdate,id], (err, result) => {
            try{
                if(err) throw err
                res.json({
                    error : false,
                    message : 'Publisher Logo Updated'
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })
    })
}


const postProductPict = (req,res) => {
    const upload = uploader('/products', 'PRD-IMG').single('post_product_image')

    upload(req, res, (err) => {
        if(err) throw err
        const image = req.file
        const id = req.params.id_product

        const dataToUpdate = {
            url_image : req.file.path,
            product_id : id
        }

        const sql = 'insert into product_images set ?'
        db.query(sql, dataToUpdate, (err, result) => {
            try{
                if(err) throw err
                res.json({
                    error : false,
                    message : 'Product Image Posted'
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })
    })
}



module.exports = {
    postPaymentConfirmation,
    postUserProfilePict,
    editUserProfilePict,
    postPublisherPict,
    postProductPict
}