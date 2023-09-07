"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast  from 'react-hot-toast';
     
export default function SignUpPage (){
    const router = useRouter();

     const [user, setUser] = React.useState({
        email: "",
        userName: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () =>{

     try{
        setLoading(true);
        const response = await axios.post("/api/users/signup",user);

        toast.success('Successfully Signed Up!');
        console.log("Signup success! ",response.data);

        router.push("/login");

     }catch(error: any){
         toast.error(error.message);
     }finally {
          setLoading(false);
     }
     
    
    };

    React.useEffect(()=>{
       if(user.email.length > 0 && user.password.length > 0
          && user.userName.length >0)
          {
               setButtonDisabled(false);
          }else{
               setButtonDisabled(true);
          }
    },[user]);

    return ( 
    <div style={{"display": "flex", "flexDirection": "column", "margin": "6rem 20rem 3rem 21rem",
    "border":"4px ridge", "padding": "2rem 1rem 3rem 3rem"}}>
        <h1><b>{loading ? "Processing": "Sign-Up"}</b></h1>
        <hr/>
        <br/>
        <div style={{"display": "flex", "flexDirection": "row","marginTop": "0.5rem"}}>
        <label>User Name : </label>
        <input
             id="username"
             type="text"
             value={user.userName}
             onChange={(e)=>setUser({...user,userName:e.target.value})}
             placeholder='username'
             style={{"marginLeft": "0.5rem"}}
        />
        </div>
        <div style={{"display": "flex", "flexDirection": "row","marginTop": "0.5rem"}}>
        <label>Email : </label>
        <input
             id="email"
             type="text"
             value={user.email}
             onChange={(e)=>setUser({...user,email:e.target.value})}
             placeholder='email'
             style={{"marginLeft": "3.25rem"}}
        />
        </div>
        <div style={{"display": "flex", "flexDirection": "row", "marginTop": "0.5rem"}}>
        <label>Password : </label>
        <input
             id="password"
             type="password"
             value={user.password}
             onChange={(e)=>setUser({...user,password:e.target.value})}
             placeholder='password'
             style={{"marginLeft": "1.1rem"}}
        />
        </div>
        <button 
             style={{"margin":"2rem 8rem 0rem 6rem", "border":"2px solid grey", "borderRadius":"1rem"}}
             onClick={onSignup}     
        >
            {buttonDisabled? "No Signup" : "Signup"}
        </button>
        <Link href="/login" style={{"marginTop":"1rem", "marginLeft":"6rem"}}>
             Visit Login Page
        </Link>
    </div>);
}