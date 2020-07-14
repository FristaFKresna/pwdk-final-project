const db = require('./../database/mysql')


const addToCart = (req,res) => {
    let data = req.body
    let sql = 'insert into cart set ?'

    db.query(sql, data, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Add To Cart Success!'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const getDataCart = (req,res) => {
    let id_user = req.params.id_user
    let sql = `select c.id, c.id_user, c.id_product, qty, p.name, p.author, p.price, p.stock, pi.url_image from cart c
    join products p on c.id_product = p.id
    join product_images pi on p.id = pi.product_id where c.id_user = ?;`

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


const getDataCartByUserIdAndProductId = (req,res) => {
    let data = req.body
    let sql = `select c.id, c.id_user, c.id_product, qty, p.name, p.price, p.stock, pi.url_image from cart c
    join products p on c.id_product = p.id
    join product_images pi on p.id = pi.product_id where c.id_user = ? AND c.id_product = ?;`

    db.query(sql, [data.id_user, data.id_product], (err, result) => {
        try{
            if(err) throw err
            res.json({
                error :false,
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


const updateQtyCart = (req,res) => {
    let id = req.params.id
    let data = req.body
    let sql = 'update cart set ? where id = ?'

    db.query(sql, [data,id], (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Update Qty Cart Success!'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}



const deleteCart = (req,res) => {
    let id = req.params.id
    let sql = 'delete from cart where id = ?'

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
    addToCart,
    getDataCart,
    updateQtyCart,
    deleteCart,
    getDataCartByUserIdAndProductId
}