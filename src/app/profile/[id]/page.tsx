export default function UserProfile ({params}:any) {
    return (
        <div className="flex flex-col py-2 text-4xl justify-center">
             <b><h1>Profile</h1></b>
             <hr/>
             <p className="text-2xl">profile page 
             <span className="p-2 rounded bg-orange-500 text-black ml-2">{params.id}</span>
             </p>
        </div>
    );
}