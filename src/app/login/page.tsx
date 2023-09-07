"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage (){

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{

        try{ 
            setLoading(true);
            const response = await axios.post("/api/users/login", user);

            toast.success('Successfully Logged In!');
            console.log("user logged in", response);
            router.push("/profile");
        }catch(error: any){
           toast.error(error.message);
        }finally{
            setLoading(false);
        }

    };

    React.useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0)
        {
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return ( 
    <div style={{"display": "flex", "flexDirection": "column", "margin": "6rem 20rem 3rem 21rem",
    "border":"4px ridge", "padding": "2rem 1rem 3rem 3rem"}}>
        <h1><b>{loading ? "Processing":"Login"}</b></h1>
        <hr/>
        <br/>
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
             onClick={onLogin}     
        >
           {buttonDisabled? "No Login": "Login"}
        </button>
        <Link href="/signup" style={{"marginTop":"1rem", "marginLeft":"6rem"}}>
             Visit Signup Page
        </Link>
    </div>);
}