import React, { useState  , useContext , } from 'react'
import {useHistory} from "react-router-dom"
import {UserContext} from "../../App"

const Signin = () => {
    const {state , dispatch} =useContext(UserContext)



    
    const history = useHistory();

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const sendData = () =>{
        
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
               
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

                    
                    localStorage.setItem("jwt" , data.token)
                    localStorage.setItem("user" ,JSON.stringify(data.user))
                    dispatch({type:"USER" , payload:data.user})
                    history.push("/")
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
                <h4 className="mb-4">Signin Here</h4>
       
                    
                            <div className="form-group">
                                <label >Email address</label>
                                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" />
                            </div>
                            <button  onClick={()=>sendData()}  className="btn btn-primary">Submit</button>
                        
                 </div>
            </div>
       </div>
       </>

    )
}

export default Signin
