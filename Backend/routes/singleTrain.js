const express = require("express");
const router = express.Router();
const {getToken}=require('../Infromation/Inf')

router.get('/train/trains/:id',async function getTrain(req,res){
    try {
        const token=await getToken()
        console.log('token',token)
        const data=await fetch(`http://20.244.56.144/train/trains/${req.params.id}`,{
            method:'GET',
            headers: { Authorization: `Bearer ${token.access_token}` }
        })
        const result=await data.json();
        res.send({data:result})
        
    } catch (err) {
        res.status(401).send({data:null,message:err.message})
    }
})

module.exports=router