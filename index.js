const connectToMongo=require('./db');
const express=require( 'express')
connectToMongo();
const app=express()
const port=3000
app.get('/',(req,res)=>{
    res.send('chl padiii behinchod!')
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port,()=>{
    console.log(`listen at${port}`)
})  