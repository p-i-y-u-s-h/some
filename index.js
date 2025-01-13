const express = require("express");

const app = express();

const users = [{
    name: "Jhon",
    kidneys:[{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/", function (req,res){
    const johnkidneys = users[0].kidneys;
    const numberofkidneys = johnkidneys.length;
    let numberofhealthykidneys = 0;
    for(let i = 0 ; i<johnkidneys.length ; i++){
        if (johnkidneys[i].healthy){
            numberofhealthykidneys = numberofhealthykidneys+1;
        }   
    }
    const numberofunhealthykidneys = numberofkidneys - numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys
    })
})
// hi
app.post("/", function(req,res){
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    })
    res.json({
        msg: "done"
    })
})

app.put("/",function(reeq,res){
    for(let i=0; i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({});
})

app.delete("/",function(reeq,res){
    if(isthereatleastoneunhealthykidney()){
        const newkidneys = [];
        for (let i = 0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newkidneys.push({
                    healthy:true
                })
            }
        }
        users[0].kidneys = newkidneys;
        res.json({msg:"kidney is succesfull changed!!!!!"})     
    }
    else{
        res.sendStatus(411).json({
            msg:"No unhealthy kidneys!!!"
        })
    }

})

function isthereatleastoneunhealthykidney(){
    let atlestonunhealthykidney = false;
    for(let i = 0 ; i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atlestonunhealthykidney = true;
        }
    }
    return atlestonunhealthykidney
}

app.listen(3000);