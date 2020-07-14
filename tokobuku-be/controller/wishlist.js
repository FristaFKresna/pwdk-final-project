const db = require('./../database/mysql')


const addToWishList = (req,res) => {
    let data = req.body
    let sql = 'insert into wishlist set ?'

    db.query(sql, data, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Add To Wishlist Success'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}



const getDataWishlistByIdUser = (req,res) => {
    let id_user = req.params.id_user
    let sql = `select w.id, w.id_user, w.id_product, p.name, p.price, p.author, p.description, p.stock, pi.url_image from wishlist w
    join products p on w.id_product = p.id
    join product_images pi on p.id = pi.product_id where w.id_user = ?;`

    db.query(sql, id_user, (err,result) => {
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


const deleteWishlist = (req,res) => {
    let id = req.params.id
    let sql = 'delete from wishlist where id = ?'

    db.query(sql, id, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Delete Success!'
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
    addToWishList,
    getDataWishlistByIdUser,
    deleteWishlist
}