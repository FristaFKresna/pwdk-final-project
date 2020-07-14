const db = require('./../database/mysql')


const getRatingReviewByIdProduct = (req,res) => {
    let id_product = req.params.id_product
    let sql = 'select * from rating where products_id = ?'
    
    db.query(sql, id_product, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}



const postNewRatingReview = (req,res) => {
    let data = req,body
    let sql = 'insert into rating set ?'

    db.query(sql, data, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error :false,
                message : 'Post New Rating & Review Success!'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
} 


module.exports = {
    getRatingReviewByIdProduct,
    postNewRatingReview
}