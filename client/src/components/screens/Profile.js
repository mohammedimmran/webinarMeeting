// rafce
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [myPics , setMyPics] = useState([]);
    useEffect(()=>{
        fetch("/mypost" , {
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            setMyPics(result.mypost)
        })






        
    },[])
    return (
        <>
            <div className="container" >
            <div class="alert alert-primary font-weight-bold text-center mt-4 text-uppercase p-4" role="alert">
  My posts
</div>



<div class="container">
  <div class="row">
    

    
                {/* <img className="card-img-top" style={{width:"10rem" ,margin:"auto", height:"10rem" , borderRadius:"50%"}}  src="https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcnNvbiUyMGFuaW1hdGVkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""/>
                <div className="card-body">
                    <h5 className="card-title">Name : </h5>
                    <p className="card-text">Followers : </p>
                    <a href="" className="btn btn-primary">Following</a>
                </div> */}
                {
                    myPics.map(item=>{
                        return(
                            <>
                            <div class="col-lg-4">
                            <div className="card mt-4" style={{width: "100%" }} >
                            <img key={item._id} src={item.photo} alt={item.titile}  style={{height: "12rem"}}/>
                            <p className="text-center font-weight-bold">{item.title}</p>
                            {/* <p className="m-4">{item.body}</p> */}
                           
                           <div className="container">
                           <a href={item.photo} className="btn btn-primary mb-2 " >Edit</a>
                            <a href={item.photo} className="btn btn-danger ml-4 mb-2" >Delete</a>
                           </div>
                            </div>
                            
                            </div>
                            
                            </>
                            
                        )

                        }
                    )
                }
          
            </div>
      
    </div>
    
  </div>


          


        </>

    )
}

export default Profile
