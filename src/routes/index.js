const {Router} = require("express");
const router = Router ();


//routes
router.get('/',(req,res)=>
{
    res.json({"Message":"HelloWord"});
})


module.exports = router;