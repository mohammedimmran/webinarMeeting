
// rfce
import React , {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from "../App"


const  Navbar= ()=> {

    const {state , dispatch} =useContext(UserContext)
    const history = useHistory();
    
    const renderList =()=>{
        if(state){
            // console.log(state);
            return[<li className="nav-item">
                    
            <Link className="nav-link" to="/profile">My post</Link>
        </li>,
        <li className="nav-item">
            
            <Link className="nav-link" to="/create">Create Post</Link>
        </li>,
        
        <button onClick={()=>{localStorage.clear()
                             dispatch({type:"CLEAR"})
                             history.push("/signin")
                             }
                             }>logout</button>

            ]
        }
        else{
            return[  <li className="nav-item">
            <Link className="nav-link" to="/signin">Login</Link>
           
        </li>,
        <li className="nav-item">
           
            <Link className="nav-link" to="/signup">Signup</Link>
           
        </li>

            ]
        }
    }
    return (

        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">WebinarMeeting</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to={state?"/":"/signin"}>Home <span className="sr-only">(current)</span></Link>
                </li>
                {renderList()}
                
              
                
                </ul>   
            </div>
        </nav>
        </>
    )
}

export default Navbar
