import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"

const CreatePost = () => {

    const history = useHistory()

    const [title , setTitle] = useState("")
    const [body , setBody] = useState("")
    const [image , setImage] = useState("")
    const [url ,setUrl ]= useState("")

    // only if url is updated or changed we have to run this below code or useEffect
    // but  first postDetails will run and uplaod the photo in cloud ince the photo is 
    // uploaded then url is changed  using useState as url changes use effect will run
    useEffect(()=>{

        // only if url is present 
        if(url){

            fetch("/createpost", {
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                   
                    title:title,
                    body:body,
                    pic:url
                })
            }).then(res=>res.json())
              .then(data=>{
                    if(data.error)
                    {
                        console.log(data.error)
                        alert(data.error)
                        
                    }
                    else{
                        history.push("/profile")
                    }
                
            }).catch(err=>{
                    console.log(err)
                })
        }


    }, [url])



    const postDetails = ()=>{
        // for image uploading we use this code
        const data = new FormData()
        data.append("file" , image)
        data.append("upload_preset" , "socialmediaApp")
        data.append("cloud_name" , "mohammedimmran")

        


        fetch("https://api.cloudinary.com/v1_1/mohammedimmran/image/upload" , {
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>{
            setUrl(data.url)
            
        }).catch(err=>{
            console.log(err)
        })
        // console.log(data.url)
       


    }


    return (
        <>
       
        <div className="container mt-4 pt-4" style={{width:"30rem"}} >
             <div className="row">
                 <div className="col">
                 <h4 className="mb-4">Post</h4>
        
                   
                             <div className="form-group">
                                 <label >Title</label>
                                 <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control" id="title" aria-describedby="emailHelp" />
                             </div>
                             
                             <div className="form-group">
                                 <label>Body</label>
                                 <textarea type="text" value={body} onChange={(e)=>{setBody(e.target.value)}} className="form-control" id="body" aria-describedby="emailHelp" />
                             </div>

                             <div className="form-group">
                                <label >Image</label>
                                <input type="file"  onChange={(e)=>setImage(e.target.files[0])} className="form-control-file" id="image"/>
                            </div>
                             
                             <button   onClick={()=>postDetails()} className="btn btn-primary">Submit</button>
                         
                  </div>
             </div>
        </div>
        </>
    )
}

export default CreatePost
