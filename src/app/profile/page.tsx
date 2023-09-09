"use client"

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage () {
     const router = useRouter();
     const [data, setData] = React.useState("nothing");
    const logout = async () =>{
        try{
             await axios.get("/api/users/logout");
             toast.success("Logout successful");
             router.push("/login");
        }catch(error){
            toast.error("Not able to logout!");
            console.log(error);
        }
    };

    const getUserDetails = async () => {
             const response = await axios.get("/api/users/me");
             console.log("response =>",response.data);
             setData(response.data.data._id);
    }
    return (
        <div>
             <b><h1>Profile</h1></b>
             <hr/>
             <p>profile page</p>
             <h2 className="p-1 rounded bg-green-500"
             >{data === "nothing" ? "Nothing" : 
               <Link href={`/profile/${data}`}>{data}</Link>
             }</h2>
             <hr/>
             <button
             className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
             onClick={logout}
             >Logout</button>
              <button
             className="bg-purple-500 mt-4 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
             onClick={getUserDetails}
             >Get User Details</button>
        </div>
    );
}