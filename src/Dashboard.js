import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Dashboard() {
  const [bannerData, setBannerData] = useState({
    description: '',
    timer: 0,
    link: '',
    visible: false,
  });


   const[message,setMessage] = useState('');
   const navigate = useNavigate();
  // http://localhost:5000/banner
  useEffect(() => {
    axios.get('https://backend-takeuf.onrender.com/banner')
      .then(
        response => setBannerData(response.data)
      
      )
      .catch(error => console.error(error));
  }, []);

  const updateBanner = () => {
    axios.post('https://backend-takeuf.onrender.com/banner', bannerData)
      .then(
       
        response =>{console.log(response.data);
        setMessage('Banner Updated Successfully Go to Home page');
        }
    
    )
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData({
      ...bannerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="bg-black flex flex-col justify-center items-center h-[100vh]">
      <h1 className='text-green-500'>{message}</h1>
      <h2 className='text-white font-bold text-[50px]'>Dashboard</h2>

        <div className='rounded-xl bg-white m-7 p-7'>
            <label >
              <span className='text-[20px] font-bold'>Banner Description:</span>
              <input
                type="text"
                name="description"
                value={bannerData.description}
                onChange={handleChange}
                className='border-[2px] rounded-md p-1 ml-1 border-gray-700'
              />
            </label>

      <br />
            <label>
            <span className='text-[20px] font-bold'>Timer (seconds):</span> 
              <input
                type="number"
                name="timer"
                value={bannerData.timer}
                onChange={handleChange}
                 className='border-[2px] rounded-md p-1 ml-1 border-gray-700'
              />
            </label>

      <br />

            <label >
            <span className='text-[20px] font-bold'> Link:</span> 
              <input
                type="text"
                name="link"
                value={bannerData.link}
                onChange={handleChange}
                 className='border-[2px] rounded-md p-1 ml-1 border-gray-700'
                
              />
            </label>

      <br />
            
            <div className='flex justify-between mt-3'>
            <label>
            <span className='text-[20px] font-bold'>  Visible:</span> 
              <input
                type="checkbox"
                name="visible"
                checked={bannerData.visible}
                onChange={handleChange}
                 className='border-[2px] rounded-md p-1 ml-1 border-gray-700'
              />
            </label>
            <button className='text-black font-bold rounded-md hover:bg-green-600 p-2' onClick={() => { navigate('take-uf-ospi.vercel.app/') }}>Home</button>
            </div>

      <br />
      </div>
      <button onClick={updateBanner} className='text-white hover:bg-green-700 rounded-md p-2'>Update Banner</button>
    </div>
  );
}

export default Dashboard;
