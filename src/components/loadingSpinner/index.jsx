import React from 'react'
import Loader from 'rsuite/Loader';
import "rsuite/dist/rsuite.min.css";
// import './spinner.css'
const Spinner = () => {
  return (
    <center>
      
        <div style={{ marginTop: 20, width: 400 }}>
          <Loader center
            content="loading ..." 
            size="md"
            style = {{backgroundColor:"black",opacity:"0.40", pointerEvents: "none", zIndex:1}}
            inverse
          />
        </div>
     
    </center>
  )
}

export default Spinner;