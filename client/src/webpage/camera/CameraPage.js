import { useRef, useEffect, useState } from 'react';
import './Camera.css';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

import btn_close from './icons/btn_close.svg';
import btn_switch from './icons/btn_switch.svg';
import btn_gallery from './icons/btn_gallery.svg';

let maxProbability = 0;
let maxExpression = "";

function Camera() {
  const videoRef = useRef()
  const [buttonClicked, setButtonClicked] = useState(false);
  const [currentExpression, setCurrentExpression] = useState("");

  // Load useEffect
  useEffect(() => {
    startVideo()
    videoRef && loadModels()

  }, [])

  // Membuka kamera
  const startVideo = async () => {
    const currentStream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = currentStream;
  }
  // LOAD MODELS FROM FACE API

  const loadModels = () => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")

    ]).then(() => {
      faceMyDetect()
    })
  }

  const faceMyDetect = () => {
    setInterval(async () => {
      maxProbability = 0;
      maxExpression = "";
  
      const detections = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceExpressions();
  
      // Pastikan 'detections' tidak null atau undefined sebelum mengakses 'expressions'
      if (detections && detections.expressions) {
        // Mencari ekspresi dengan probabilitas tertinggi
        Object.entries(detections.expressions).forEach(([expression, probability]) => {
          if (probability > maxProbability) {
            maxProbability = probability;
            maxExpression = expression;
          }
        });
      }else{
        maxProbability = 0;
        maxExpression = "Tidak Terdeteksi";
      }  

      console.log(`Ekspresi : ${maxExpression} (${maxProbability})`);
      console.log(1);
      
      const percentage = (maxProbability * 100).toFixed(2);
      setCurrentExpression(`${maxExpression} (${percentage}%)`);
    }, 1000)
  }
  
  const [scanHappy, setScanHappy] = useState(0);
  const [scanAngry, setScanAngry] = useState(0);
  const [scanFear, setScanFear] = useState(0);
  const [scanSad, setScanSad] = useState(0);
  const [scanDisgust, setScanDisgust] = useState(0);
  const [scanSurprise, setScanSurprise] = useState(0);
  const [scanNeutral, setScanNeutral] = useState(0);
  const tokoId = localStorage.getItem("id_toko");
  
  function processExpression() {
    // Pindah ke halaman sesuai dengan jenis ekspresi terbanyak
    if (maxExpression === "neutral") {
      window.location.href = "neutral";

      Axios.post('http://localhost:5000/stats/scan-neutral', { tokoId: tokoId })
      .then(response => {
        setScanHappy(response.data.scanHappy);
        setScanAngry(response.data.scanAngry);
        setScanFear(response.data.scanFear);
        setScanSad(response.data.scanSad);
        setScanDisgust(response.data.scanDisgust);
        setScanSurprise(response.data.scanSurprise);
        setScanNeutral(response.data.scanNeutral);
      })
      .catch(error => {
        console.error('Error updating scan count:', error);
      });

    } else if (maxExpression === "happy") {
      window.location.href = "happy";

      Axios.post('http://localhost:5000/stats/scan-happy', { tokoId: tokoId })
      .then(response => {
        setScanHappy(response.data.scanHappy);
        setScanAngry(response.data.scanAngry);
        setScanFear(response.data.scanFear);
        setScanSad(response.data.scanSad);
        setScanDisgust(response.data.scanDisgust);
        setScanSurprise(response.data.scanSurprise);
        setScanNeutral(response.data.scanNeutral);
      })
      .catch(error => {
        console.error('Error updating scan count:', error);
      });

    } else if (maxExpression === "sad") {
      window.location.href = "sad";

      Axios.post('http://localhost:5000/stats/scan-sad', { tokoId: tokoId })
      .then(response => {
        setScanHappy(response.data.scanHappy);
        setScanAngry(response.data.scanAngry);
        setScanFear(response.data.scanFear);
        setScanSad(response.data.scanSad);
        setScanDisgust(response.data.scanDisgust);
        setScanSurprise(response.data.scanSurprise);
        setScanNeutral(response.data.scanNeutral);
      })
      .catch(error => {
        console.error('Error updating scan count:', error);
      });

    } else if (maxExpression === "angry") {
      window.location.href = "angry";

      Axios.post('http://localhost:5000/stats/scan-angry', { tokoId: tokoId })
      .then(response => {
        setScanHappy(response.data.scanHappy);
        setScanAngry(response.data.scanAngry);
        setScanFear(response.data.scanFear);
        setScanSad(response.data.scanSad);
        setScanDisgust(response.data.scanDisgust);
        setScanSurprise(response.data.scanSurprise);
        setScanNeutral(response.data.scanNeutral);
      })
      .catch(error => {
        console.error('Error updating scan count:', error);
      });

    } else if (maxExpression === "fearful") {
      window.location.href = "fear";

      Axios.post('http://localhost:5000/stats/scan-fear', { tokoId: tokoId })
      .then(response => {
        setScanHappy(response.data.scanHappy);
        setScanAngry(response.data.scanAngry);
        setScanFear(response.data.scanFear);
        setScanSad(response.data.scanSad);
        setScanDisgust(response.data.scanDisgust);
        setScanSurprise(response.data.scanSurprise);
        setScanNeutral(response.data.scanNeutral);
      })
      .catch(error => {
        console.error('Error updating scan count:', error);
      });

    } else if (maxExpression === "disgusted") {
      window.location.href = "disgust";

      Axios.post('http://localhost:5000/stats/scan-disgust', { tokoId: tokoId })
      .then(response => {
        setScanHappy(response.data.scanHappy);
        setScanAngry(response.data.scanAngry);
        setScanFear(response.data.scanFear);
        setScanSad(response.data.scanSad);
        setScanDisgust(response.data.scanDisgust);
        setScanSurprise(response.data.scanSurprise);
        setScanNeutral(response.data.scanNeutral);
      })
      .catch(error => {
        console.error('Error updating scan count:', error);
      });

    } else if (maxExpression === "surprised") {
      window.location.href = "surprise";

      Axios.post('http://localhost:5000/stats/scan-surprise', { tokoId: tokoId })
      .then(response => {
        setScanHappy(response.data.scanHappy);
        setScanAngry(response.data.scanAngry);
        setScanFear(response.data.scanFear);
        setScanSad(response.data.scanSad);
        setScanDisgust(response.data.scanDisgust);
        setScanSurprise(response.data.scanSurprise);
        setScanNeutral(response.data.scanNeutral);
      })
      .catch(error => {
        console.error('Error updating scan count:', error);
      });
    }

    // localStorage.removeItem('maxExpressions');
  }

  const navigate = useNavigate();
  return (
    <div className="myapp">
      <div className="appvide">
        <video className="screencamera" crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <div className='text-container'>
        {currentExpression !== "" ? (
          <h5 className='cameratext'>{currentExpression}</h5>
        ) : <h5 className='cameratext'>Load Models...</h5>}
      </div>
      <div className='button-container'>
      <button className="closebtn"><img alt="closebtnimg" onClick={() => navigate(-1)} className="closebtnimg" src={ btn_close }/></button>
      {/* <button className="lightningbtn"onClick={() => { setButtonClicked(true); localStorage.removeItem('maxExpressions') }}><img className="lightningbtnimg" src={ btn_lightning }/></button> */}
      <button className="switchbtn"><img alt="switchbtnimg" className="switchbtnimg" src={ btn_switch }/></button>
      {currentExpression !== "" ? (
        <button className="capturebtn" onClick={() => { setButtonClicked(true); processExpression() }}></button>
        ) : <button className="capturebtn" style={{ backgroundColor: "#fff", outline: "5px solid #FFF" }} onClick={() => { setButtonClicked(false); processExpression() }}></button>
      }
      <button className="gallerybtn"><img alt="gallerybtnimg" className="gallerybtnimg" src={ btn_gallery }/></button>
      </div>
    </div>
  )
}
export default Camera;