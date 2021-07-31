import React, { useState  } from 'react'
import {useHistory} from "react-router-dom"

const Signup = () => {
    const history = useHistory();

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const PostData = () =>{
        
        fetch("/signup", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email
            })
    
            
        }).then(res=>res.json()).then(
            
            data=>{
                if(data.error)
                {
                    console.log(data.error)
                    alert(data.error)
                    
                }
                else{
                    history.push("/signin")
                }
            
            }).catch(err=>{
                console.log(err)
            })

    }

    return (
        <>
       
       <div className="container mt-4 pt-4" style={{width:"30rem"}} >
            <div className="row">
                <div className="col">
                <h4 className="mb-4">Signup Here</h4>
       
                    
                            
                                <label >User name</label>
                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"  aria-describedby="emailHelp" placeholder="Enter User Name"/>
                           
                            
                            
                                <label >Email address</label>
                                <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control"  aria-describedby="emailHelp" placeholder="Enter email"/>
                            
                            
                                <label >Password</label>
                                <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" placeholder="Password"/>
                            
                            <button  onClick={()=>PostData()} className="btn btn-primary">Submit</button>
                       
                 </div>
            </div>
       </div>
       </>
    )
}

export default Signup
