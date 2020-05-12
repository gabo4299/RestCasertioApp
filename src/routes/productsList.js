const {Router} = require("express");
const router = Router ();
const Products=require('../models/Products')



 async function saveProduct(name ,stock,price,description ,category){
    
    var newProduct = new Products
    ({
        price : price,
        stock : stock,
        description: description,
        category   : category,
        name : name
    })

     const product = await newProduct.save()
     return product    
}

async function showProducts()
{
    const products = await Products.find()
    return products
} 
async function getProduct(nameNew)
{
    const product=await Products.findOne({name:nameNew})
    return product
}
async function deleteProduct(name)
{
    const del=Products.deleteOne({name:name})
    return del
}

async function changePrice(name,newPrice)
{
    updates= await Products.updateOne({name:name},{price:newPrice})
    return updates
}
async function addStock(name,incremento)
{
    const product=Products.updateOne({name:name},{$inc:{stock:incremento}})
    return product
}
async function resStock(name,incremento)
{
    incremento=incremento*(-1)
    const product=Products.updateOne({name:name},{$inc:{stock:incremento}})
    return product
}
async function changeDescription(name,newDescription)
{
    const product=Products.updateOne({name:name},{description:newDescription})
    return product
}





//routes
router.get('/',(req,res)=>
{

    showProducts()
    .then
    (
        products=>
        {
            console.log (products )
            res.json({"Users":products});
        }

    )
    .catch(
        err=>
        {
            console.log(err)
            res.status(500).json({"Error":err})
        }
    )
    
})
router.get('/:producName',(req,res)=>
{
    const {producName} = req.params
    getProduct(producName)
    .then(
        product=>{
            console.log(product)
            res.json(product);
        }
    )
    
})
router.post('/add',(req,res)=>
{
    const {name ,stock,price,description ,category}=req.body;
    console.log(name ,stock,price,description ,category)
    if (name  && price && description && category && stock >=0)
    {
        
      
        saveProduct(name ,stock,price,description ,category)
        .then(
            product=>
            {console.log(product)
                res.status(201).json({"message":'Creado Satisfactoriamente'})
            }
            
        )
        .catch(
            err=>
            {console.log(err['errmsg'])
            res.status(406).json({"message":err['errmsg']})
        }
        )
      
    }
    else
    {
        res.status(500).json( { "error":"incoplete data" } );
    }

})

router.put('/:productName/stock/add',(req,res)=>
{
    const {productName} = req.params
    console.log(req.body)

     if (req.body["stock"])
     {
            addStock(productName,req.body["stock"])
            .then
            (
                updates=>
                {
                    //console.log(updates)
                    res.json(updates)
                }
            )
            .catch
            (
                err => (res.json(err))
            )
     }
       
    
})
router.put('/:productName/stock/rest',(req,res)=>
{
    const {productName} = req.params
    console.log(req.body)

     if (req.body["stock"])
     {
            resStock(productName,req.body["stock"])
            .then
            (
                updates=>
                {
                    //console.log(updates)
                    res.json(updates)
                }
            )
            .catch
            (
                err => (res.json(err))
            )
     }
       
    
})
router.put('/:productName/description',(req,res)=>
{
    const {productName} = req.params
    console.log(req.body)

     if (req.body["description"])
     {
            changeDescription(productName,req.body["description"])
            .then
            (
                updates=>
                {
                    //console.log(updates)
                    res.json(updates)
                }
            )
            .catch
            (
                err => (res.json(err))
            )
     }
       
    
})
router.put('/:productName/price',(req,res)=>
{
    const {productName} = req.params
    console.log(req.body)

     if (req.body["price"])
     {
            changePrice(productName,req.body["price"])
            .then
            (
                updates=>
                {
                    //console.log(updates)
                    res.json(updates)
                }
            )
            .catch
            (
                err => (res.json(err))
            )
     }
       
    
})
router.delete('/del/:ProductnameDel',(req,res)=>
{
    const {ProductnameDel} = req.params
    deleteProduct(ProductnameDel)
    .then(del=>res.json(del))
    .catch(err=>res.json(err))
        
})


module.exports = router;