import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import { AuthContext } from '../AuthProvider/AuthProvider';





const CheckoutForm = ({price,singleClass}) => {

    const [cardError,setCardError]=useState()
    const stripe = useStripe();
    const elements = useElements();
    const {user,setEnrolled} = useContext(AuthContext)
    const [clientSecret,setClientSecret]=useState('')
    const [processing,setProcessing]=useState()

    const [id,setId]=useState()


    useEffect(()=>{

        fetch('https://melodic-adventure-server-ali-ashraf-abir.vercel.app/create-payment-intent',{
            method:'post',
            headers:{

                'content-type':'application/json'
            },
            body:JSON.stringify({price:price})
        })
        .then(res=>res.json())
        .then(result=>{
           
            setClientSecret(result.clientSecret)
        })

    },[])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        
        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError(null)
            
        }
        setProcessing(false)
        const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || 'anonymous',
                  name: user?.email || 'anonymous',
                },
              },
            },
          );
          if(confirmError){
            
            setProcessing(false)
        }
        console.log(paymentIntent)
        if(paymentIntent.status=='succeeded'){
            
            setProcessing(false)
            const transactionID=paymentIntent.id 
            setId(transactionID)
            swal("Payment Done!!", "visit your dashboard now", "success");

            const totalEnrolled=parseInt(singleClass.totalEnrolled)+1
            const seats=parseInt(singleClass.seats)-1 

            const newData={totalEnrolled,seats}
            console.log(newData)
            
            const Class=singleClass
            const paymentData={
                Class,transactionID
            }
            
        fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/updateclassseats/${singleClass._id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newData),
        })
            .then(res => res.json())
            .then(data => {

            })
            fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/manageuserpayment/${user.email}`,{
                method:'put',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({payments:[paymentData]})
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
            })

            
            setEnrolled(true)
            

        }
    };


   

    return (
        <form onSubmit={handleSubmit}>
            
            <h1>Please Enter Your Payment Details</h1>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
          <div className="mt-4">
              {
                  id?'Transaction ID : '+id:''
              }
          {
                cardError?cardError:''
            }
          </div>
          <Toaster></Toaster>
            <button className='btn btn-warning mt-5 ml-12' type="submit" disabled={!stripe || !clientSecret || processing }>
                Pay
            </button>
        </form>
    );

};

export default CheckoutForm;