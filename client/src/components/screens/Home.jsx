import React, { useEffect, useState }  from 'react'

const Home= ()=> {
    const [data , setData] = useState([])

    useEffect(()=>
    {
        fetch("/allpost"  ,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            setData(result.posts)
        })

    },[])
    return (
        <>
            <div className="container mt-2" >

            {
                data.slice().reverse().map(item=>{
                    return(
                        <div className="card mb-4" style={{maxWidth:"700px" , margin:"auto" , backgroundColor:"rgba(255, 217, 0, 0.884)"}} >
                        {/* <img className="card-img-top " style={{width: "6%" , height:"1rem"}}} alt="not found"/> */}

                       
                        {/* <p className="circle" style={{backgroundColor:"red",width:"15px"}}>{item.postedBy.name}</p> */}
                       
                        <p className="card-title ml-4 m-4 text-uppercase" >{item.postedBy.name}</p>
                    <img className="card-img-top" style={{width: "100%" , height:"30rem"}} src={item.photo} alt="not found"/>
                    <div className="card-body">
                    <p className="card-text font-weight-bold ">{item.title}</p><hr style={{backgroundColor:"white"}}></hr>
                        <p className="card-text">{item.body}</p>
                        <a href={item.photo} className="btn btn-dark pl-4 pr-4" >Register</a>
                    </div>
                </div>

                    )
                })
            }
                
                
            </div>
            
        </>

    )
}

export default Home
