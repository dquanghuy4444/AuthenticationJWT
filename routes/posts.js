const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/' , verify , (req , res) =>{
    res.json({
        posts:{
            title:"123123",
            text:"12312312",
        }
    })
})

module.exports = router;