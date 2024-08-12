import React, { useState, useEffect } from "react";
import axios from "axios";
// import './App.css';

function App() {
  const [bannerData, setBannerData] = useState({
    description: "",
    timer: 0,
    link: "",
    visible: false,
  });
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    axios
      .get("https://backend-takeuf.onrender.com/banner")
      .then((response) => {
        setBannerData(response.data);
        setCountdown(response.data.timer);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (bannerData.visible && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setBannerData((prev) => ({ ...prev, visible: false }));
    }
  }, [countdown, bannerData.visible]);

  return (
    <div className="flex bg-black h-[100vh] flex-col justify-center items-center">
    <h1 className="font-bold text-[30px] text-white  md:text-[50px]">My Dynamic Websit</h1>

    
      {bannerData.visible && (
        <div className="mt-5 rounded-lg bg-white p-5 max-w-[80%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] word-wrap break-word">
          <p className="text-black">{bannerData.description}</p>

          <div className="flex justify-between items-center text-black mt-4">
            <p>Time left: {countdown}s</p>
            {bannerData.link && (
              <a
                href={bannerData.link}
                className="rounded-xl hover:bg-green-700 p-2 text-black font-bold"
              >
                Go To Dashboard
              </a>
            )}
          </div>
        </div>
      )}
    
  </div>
  );
}

export default App;
