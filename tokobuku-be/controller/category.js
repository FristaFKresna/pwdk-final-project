const db = require('./../database/mysql')

const getAllCategories = (req,res) => {
    let sql = 'select * from category'

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


const postNewCategories = (req,res) => {
    let data = req.body
    let sql = 'insert into category set ?'

    db.query(sql, data, (err,result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Insert New Category Success!'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const getCategoryFiltered = (req,res) => {
    const category = req.query.category
    let sql = 'select * from category where category = ?'

    db.query(sql, category, (err,result) => {
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
    getAllCategories,
    postNewCategories,
    getCategoryFiltered
}