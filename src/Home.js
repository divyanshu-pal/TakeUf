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
    <div className="bg-black flex flex-col justify-center items-center text-white h-[100vh]  ">
      <header className="App-header">
        <h1 className="font-bold text-[50px]">My Dynamic Website</h1>

        <div className="">
          {bannerData.visible && (
            <div className=" mt-5 rounded-lg  bg-white p-5 ">
              <p className="text-black">{bannerData.description}</p>
             
              <div className="flex justify-between items-center text-black">
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
      </header>
    </div>
  );
}

export default App;
