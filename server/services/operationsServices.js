var db = require("../database/models");

module.exports = {
    async createOperation(req){
        body = req.body
        let category = await db.Categories.findOne({
            where:{
                category: body.category
            }
        })
        let operation = await db.Operations.create({
            concept: body.concept,
            date: body.date,
            sum: body.sum,
            type: body.type,
            category_id: category.id
        })
        await db.Lists.create({
            user_id: req.session.userLogged.id, 
            operation_id: operation.id
        })
    }
}