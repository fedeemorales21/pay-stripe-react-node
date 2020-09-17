const express = require('express')
const Stripe = require('stripe')
const cors = requiere('cors')

const app = express()

const stripe = new Stripe('sk_test_51HS5NiI3jHmWNZxOtEnG1SvlNEteeKND6fMpN6m0u2k97q3m2ArT6fkAcXjSUSPn850I9MJZ96ThHrVxNoGXKiGB00I59DSmSo')

app.set('port', process.env.PORT || 6000)
const link = `http://localhost:${app.get('port')}`
app.use(cors({origin: link}))
app.use(express.json())

app.post('/api/payments/', async (req, req) =>{    
    try {
        console.log('saving ', req.body)
        const {id,amount} = req.body
        const pay = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "description",
            payment_method: id,
            confirm: true
        })
    
        // save pay
        console.log(pay)
    
        res.send({success:true})
        
    } catch (error) {
        res.send({error:error.row.message}) 
    }

})


app.listen(app.get('port'),() => console.log('server on ',link ) )