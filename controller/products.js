import {getProducts,getProduct,addProduct,editProduct,deleteProduct} from '../models/productDB.js'

export default {
    getProducts: async (req,res)=>{
        try{
            res.send(await getProducts())
        }catch(err){
            console.error(err);
            res.json({
                msg: 'An error has occurred when retrieving the data.'
            }) 
        }
    },
    getProduct :async (req,res)=>{
        try {
        res.send(await getProduct(+req.params.id))
    }catch(err){
        console.log(err);
        res.json({
            msg: 'An error has occurred when retrieving the data.'
        })
    }
    },
    addProduct : async(req,res)=>{
        try {
        const {name,description,price,image} = req.body;
        const post = await addProduct(name,description,price,image)
        res.send(await getProducts())
    }catch(err) {
        console.log(err);
        res.json({
            msg: 'An error has occured with posting new data.'
        })
    }
},
editProduct : async(req,res)=>{
    try{
    const [item] = await getProduct(+req.params.id)
    let {name, description, price} = req.body   
    name ? name = name: {name} = item
    description ? description = description: {description} = item
    price ? price = price: {price} = item
    await editProduct(name, description, price, +req.params.id)
    res.json(await editProduct())
}catch(err) {
    console.log(err);
    res.json({
        msg: 'An error has occured with updating data.'
    })
}
},

deleteProduct : async(req,res)=>{
    try{
    res.send(await deleteProduct(+req.params.id))
    // alert('product has been removed from the database')
}catch(err){
    console.log(err);
    res.json({
        msg: 'An error has occurred while removing the data.'
    })
}
}

}   