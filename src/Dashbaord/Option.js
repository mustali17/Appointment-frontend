import React from 'react';

const Option =({Value="info",})=>{
    

    return(
        <button type="button" 

        
        className="btn btn-outline-info p-2 m-1 w-75 h-100"> 
      
            <h5 >{Value}</h5>
        
       </button>
    )

}

export default Option;