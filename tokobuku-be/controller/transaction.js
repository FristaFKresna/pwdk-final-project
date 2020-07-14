const db = require('./../database/mysql')


const onCheckOut = (req,res) => {
    let data = req.body
    let transaction = data.dataTransaction
    let transactionDetail = data.dataTransactionDetail
    const sql_1 = 'insert into transaction set ?'
    const sql_2 = 'INSERT INTO transaction_detail (product_name, product_price, qty, transaction_id) VALUES ?'
    const sql_3 = 'delete from cart where id_user = ?'
    
    db.beginTransaction((err) => {
        if(err) throw err
        db.query(sql_1 , transaction,(err,result) => {
            if(err){
                return db.rollback(() => {
                    throw err
                })
            }
            const dataTransactionDetailArr = transactionDetail.map((val) => {
                return [val.product_name, val.product_price, val.qty, result.insertId]
            })

            db.query(sql_2 ,[dataTransactionDetailArr],(err,result) => {
                if(err){
                    return db.rollback(() => {
                        throw err
                    })
                }
                db.query(sql_3 , transaction.users_id,(err,result) => {
                    if(err){
                        return db.rollback(() => {
                            throw err
                        })
                    }
                    db.commit((err) => {
                        if(err){
                            return db.rollback(() => {
                                throw err
                            })
                        }
                        res.json({
                            error : false,
                            message : "Checkout Berhasil"
                        })
                    })
                })
            })
        })
    })
    // insert ke transaction
    // insert ke transaction detail
    // hapus data di cart
}



const getDataTransaction = (req,res) => {
    let user_id = req.params.user_id
    let sql = `select t.id, t.users_id, t.date, t.total_transaction, t.total_item, t.url_payment_proof,
    t.name_bank_account, t.bank_account, t.notes, ts.status, ts.id as status_id from transaction t 
    join transaction_status ts on t.transaction_status_id = ts.id where t.users_id = ?;`

    db.query(sql, user_id, (err,result) => {
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



const getTransactionDetailByIdTransactionId = (req,res) => {
    let transaction_id = req.params.transaction_id
    let sql = `select td.id, td.product_name, td.product_price, td.qty, td.transaction_id, t.total_transaction, t.transaction_status_id, t.url_payment_proof, t.name_bank_account, t.bank_account, t.notes 
    from transaction_detail td join transaction t on td.transaction_id = t.id where transaction_id = ?`
    
    db.query(sql, transaction_id, (err,result) => {
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


const getAllTransaction = (req,res) => {
    let sql = `select t.id, t.users_id, t.date, t.total_transaction, t.total_item, t.url_payment_proof,
    t.name_bank_account, t.bank_account, t.notes, ts.status, ts.id as status_id from transaction t 
    join transaction_status ts on t.transaction_status_id = ts.id`

    db.query(sql, (err,result) => {
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


const getTopTenProducts = (req,res) => {
    let sql = `select product_name, product_price, sum(qty) as qty from transaction_detail group by product_name order by qty desc`

    db.query(sql, (err,result)=>{
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


module.exports = {
    onCheckOut,
    getDataTransaction,
    getTransactionDetailByIdTransactionId,
    getAllTransaction, 
    getTopTenProducts
}