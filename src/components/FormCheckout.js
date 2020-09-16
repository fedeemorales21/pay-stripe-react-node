import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

export default function formCheckout() {
    const stripe    = useStripe()
    const elements  = useElements()
  
    const handleSubmit = async e => {
      
        e.preventDefault()

        if (!stripe || !elements) return
     
        const cardElement = elements.getElement(CardElement)
  
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        })

        if (error) {
            console.log('[error]', error)
            return
        } 
        
        const { id } = paymentMethod
        const amount = e.taget.getAttribute('price')*100 //in cents
        const { data } = await axios.post('https://localhost:6000/api/payments', {id , amount} )
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit} className='card card-body'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <CardElement className="form-control" />
                        <button 
                            type="submit"
                            className="btn btn-primary">
                            BUY
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

