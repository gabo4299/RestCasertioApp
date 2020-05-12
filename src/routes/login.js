const {Router} = require("express");
const router = Router ();
const Users=require('../models/User')



 async function saveUser(username ,password,mail,phone ,name,seller){
    
    var newuser = new Users
    ({
        username : username,
        password : password,
        mail      : mail,
        phone   : phone,
        name : name,
        seller:seller
    })

     const user = await newuser.save()
     return user    
}

async function showUsers()
{
    const users = await Users.find()
    return users
} 
async function getUser(usernameNew)
{
    const user=await Users.findOne({username:usernameNew})
    return user 
}
async function deleteUser(usernameDel)
{
    const del=Users.deleteOne({username:usernameDel})
    return del
}


async function updateUser(idusername , parameter , newValue)
{
    var updates;
    switch (parameter){
        case "phone":
              
            updates= await Users.updateOne({username:idusername},{phone:newValue})
            return updates
            break;
        case "password":
            // console.log("pasword")    
             updates= await Users.updateOne({username:idusername},{password:newValue})
             return updates
            break;
        case "mail":
            // console.log("age")    
             updates= await Users.updateOne({username:idusername},{mail:newValue})
             return updates
            break;
        case "name":
            // console.log("geder")    
             updates= await Users.updateOne({username:idusername},{name:newValue})
             return updates
            break;

        default:
             updates = {"err":"parametro no valido"}
             return updates
            break

    }

    
   
    
}
//routes
router.get('/',(req,res)=>
{

    showUsers()
    .then
    (
        users=>
        {
            console.log (users )
            res.json({"Users":users});
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
router.get('/:username',(req,res)=>
{
    const {username} = req.params
    getUser(username)
    .then(
        user=>{
            console.log(user)
            res.json(user);
        }
    )
    
})
router.post('/add',(req,res)=>
{
    const {username ,password,mail,phone ,name,seller}=req.body;
    if (username && password && mail && phone && name &&seller )
    {
        
      
        saveUser(username ,password,mail,phone ,name,seller)
        .then(
            user=>
            {console.log(user)
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

router.put('/update/:uservar',(req,res)=>
{
    const {uservar} = req.params
    console.log(req.body)

     if (req.body["password"])
     {
            updateUser(uservar,'password',req.body["password"])
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
     if (req.body["mail"])
     {
            updateUser(uservar,'mail',req.body["mail"])
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
     if (req.body["phone"])
     {
            updateUser(uservar,'phone',req.body["phone"])
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
     if (req.body["name"])
     {
            updateUser(uservar,'name',req.body["name"])
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
router.delete('/del/:usernameDel',(req,res)=>
{
    const {usernameDel} = req.params
    deleteUser(usernameDel)
    .then(del=>res.json(del))
    .catch(err=>res.json(err))
        
})


module.exports = router;