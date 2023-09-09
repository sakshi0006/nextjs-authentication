import { getDataFromToken }  from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

    try{
            
              const userId = await getDataFromToken(request);   
              //console.log("user id =",userId);          
              const user = await User.findOne({_id: userId }).select("-password");
              //console.log("user details=",user);
              return NextResponse.json({
                message: "User Found",
                data: user
              });
    }catch(error: any){
        console.log("user details error=",error.message);
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        );
    }
}