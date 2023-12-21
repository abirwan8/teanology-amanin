import { useRef, useEffect, useState } from 'react';
import './Camera.css'
import * as faceapi from 'face-api.js'
import { useNavigate } from 'react-router-dom';

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
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // LOAD MODELS FROM FACE API

  const loadModels = () => {
    Promise.all([
      // Mengambil model
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
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
        .withFaceLandmarks()
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

      // // Menambahkan nilai ke dalam array maxExpressions
      // if (maxExpressions.length < 100) {
      //   maxExpressions.push(maxExpression);
      // } else {
      //   maxExpressions.shift();
      //   maxExpressions.push(maxExpression);
      // }

      // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(maxExpressions));

      // console.log(maxExpressions);
      const percentage = (maxProbability * 100).toFixed(2);
      setCurrentExpression(`${maxExpression} (${percentage}%)`);
    }, 3000)
  }

  function processExpression() {
    // let expressionCounts = {
    //   "neutral": 0,
    //   "happy": 0,
    //   "sad": 0,
    //   "angry": 0,
    //   "fearful": 0,
    //   "disgusted": 0,
    //   "surprised": 0,
    // };

    // // Mencari jumlah kemunculan setiap jenis ekspresi dalam array maxExpressions
    // maxExpressions.forEach(expression => {
    //   expressionCounts[expression]++;
    // });

    // // Mencari jenis ekspresi terbanyak
    // let modusExpression = Object.keys(expressionCounts).reduce((a, b) => expressionCounts[a] > expressionCounts[b] ? a : b);

    // // Pindah ke halaman sesuai dengan jenis ekspresi terbanyak
    // if (modusExpression === "neutral") {
    //   window.location.href = "neutral";
    // } else if (modusExpression === "happy") {
    //   window.location.href = "happy";
    // } else if (modusExpression === "sad") {
    //   window.location.href = "sad";
    // } else if (modusExpression === "angry") {
    //   window.location.href = "angry";
    // } else if (modusExpression === "fearful") {
    //   window.location.href = "fear";
    // } else if (modusExpression === "disgusted") {
    //   window.location.href = "disgust";
    // } else if (modusExpression === "surprised") {
    //   window.location.href = "surprise";
    // }

    // localStorage.removeItem('maxExpressions');

    // Pindah ke halaman sesuai dengan jenis ekspresi terbanyak
    if (maxExpression === "neutral") {
      window.location.href = "neutral";
    } else if (maxExpression === "happy") {
      window.location.href = "happy";
    } else if (maxExpression === "sad") {
      window.location.href = "sad";
    } else if (maxExpression === "angry") {
      window.location.href = "angry";
    } else if (maxExpression === "fearful") {
      window.location.href = "fear";
    } else if (maxExpression === "disgusted") {
      window.location.href = "disgust";
    } else if (maxExpression === "surprised") {
      window.location.href = "surprise";
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
        ) : <h5 className='cameratext' style={{ display: "none" }}>{currentExpression}</h5>}
      </div>
      <div className='button-container'>
      <button className="closebtn"><img alt="closebtnimg" onClick={() => navigate(-1)} className="closebtnimg" src={ btn_close }/></button>
      {/* <button className="lightningbtn"onClick={() => { setButtonClicked(true); localStorage.removeItem('maxExpressions') }}><img className="lightningbtnimg" src={ btn_lightning }/></button> */}
      <button className="switchbtn"><img alt="switchbtnimg" className="switchbtnimg" src={ btn_switch }/></button>
      <button className="capturebtn" onClick={() => { setButtonClicked(true); processExpression() }}></button>
      <button className="gallerybtn"><img alt="gallerybtnimg" className="gallerybtnimg" src={ btn_gallery }/></button>
      </div>
    </div>
  )
}
export default Camera;