import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function contact() {
  const [data, setData] = useState([])
  const getData = async () => {

    const res = await axios.get("http://localhost:3000/api/get");
    console.log(res.data);
    setData([...res.data])
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>


<div className="container">
     
      <div className="contacts-header">
        <h1>Contacts</h1>
        <Link to={'/add'}>         <button className="add-button">add contact</button>
        </Link>
      </div>
      <Link to={'/user'}>         <button className="add-button">sgn n</button>
      </Link>
    
      <div className="contact-list">

      {data.map((dt,index)=>(
                <div className='contact' key={index}>
           
  
                  

            

                    <span> {dt.name}</span>
                 
           
                </div>
            
             

              ))}




       
      </div>
    </div>
















    </>
  )
}

export default contact
