import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Addaclass = () => {
    const {user}=useContext(AuthContext)
    console.log()
    const [Image,setImage]=useState()

    const handleImageUpload=(event)=>{
        const formData=new FormData();
        const img=event.target.files[0]
        formData.append('image',img)
        console.log(img)
        fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGEDB_API} ` ,{
            method:'POST',
            body : formData
            
        })
        .then(res=>res.json())
        .then(data=>{
            setImage(data.data.url)
        })
    }

    const handleAddProduct=(event)=>{

        event.preventDefault()

        const form=event.target 
        const name=form.name.value 
        const category = form.category.value 
        const price = form.price.value  
        const rating = form.rating.value 
        const description=form.ClassDescription.value 
        const email=form.email.value 
        const img=Image
        const username=user.displayName
        const image=Image;
        const status ='pending';
        const totalEnrolled = 0;
        const feedback=''
        const seats=form.seats.value;
        
        
       

        const product={feedback,name,category,price,rating,description,email,img,name,username,image,status,totalEnrolled,seats}
        console.log(product)

        fetch('https://melodic-adventure-server-ali-ashraf-abir.vercel.app/classes',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify(product),
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })

        toast('your class has been added succesfully')
        form.reset()



    }




    return (
        
        <div className='w-100% bg-base-200 mt-[20px]'>
          <Toaster></Toaster>

            <div className="text-center text-3xl py-10">Add your Class</div>

            <form onSubmit={handleAddProduct} action="" className='flex flex-col justify-center items-center w-100% p-20 '>


                    
                    <div className="flex flex-col lg:flex-row mt-10 justify-center items-center gap-5">
                    <p>Name:</p>
                <input required type="text" name='name' placeholder="Enter Class Name" className="mr-10 input full max-w-xs" />
                <p>Category:</p>
                <select required name='category' className="select w-full max-w-xs">
                    <option disabled select='true'>Category</option>
                    <option>Guitar</option>
                    <option>Violin</option>
                    <option>Piano</option>
                    <option>Drums</option>
                </select>
                    <br></br>
                    </div>
                    <div className="mt-10 flex flex-col lg:flex-row  justify-center items-center gap-5">
                        <p>Price:</p>
                <input required type="text" name='price' placeholder="Price" className="input w-full max-w-xs " />
                <p>Available Seats:</p>
                <input required type="text" name='seats' placeholder="Price" className="input w-full max-w-xs " />
            
                <p>Rating:</p>
                <input required type="number" name='rating' min='1' max='10' placeholder="Rating" className="input w-full max-w-xs" />
        <br></br>
        </div>
        <div  className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-5">
                <p>Description</p>
                <textarea required name="ClassDescription" placeholder="Class Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                <p>Email:</p>
                <input required type="email" name='email' placeholder="email" value={user?.email} className="input w-full max-w-xs" />
                </div>

             
                <input onChange={handleImageUpload} type="file" name='image' className="file-input w-full max-w-xs mt-4"></input>
                <input className='btn btn-warning mt-10 w-[40%] mx-auto' type="submit" value="Submit" />
    

            </form>



        </div>
    );
};

export default Addaclass;