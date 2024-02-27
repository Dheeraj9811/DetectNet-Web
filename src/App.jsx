import React, { useState, useEffect } from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import Webcam from "react-webcam";
import * as cocossd from '@tensorflow-models/coco-ssd';
import { drawRect } from './utilities';

function App() {
  const [modelRunning, setModelRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [model, setModel] = useState(null);
  const [webcamDevices, setWebcams] = useState([]);
  const [selectedWebcam, setSelectedWebcam] = useState(null);

  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);


  // loading model in memory in start of the app
  useEffect(() => {
    const loadModel = async () => {
      const model = await cocossd.load();
      setModel(model);
      console.log('Model loaded');
    }

    // loading all webcam devices
    const fetchWebcams = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setWebcams(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedWebcam(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error enumerating video devices:', error);
      }
    };
    loadModel();
    fetchWebcams();
    console.log(webcamDevices)
  }, []);
  
  // function to run model which call predict function after every 10ms
  useEffect(() => {
    if (modelRunning) {
      const id = setInterval(() => {
        console.log("handelstart = "+modelRunning);
        detect(model);
      }, 10);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [modelRunning, model]);

  const runCoco = () => {
    setModelRunning(true);
  };

  const handleStart = () => {
    if (!modelRunning) {
      console.log("handel start"+modelRunning);
      runCoco();
    }
  };

  const handleStop = () => {
    console.log('stopping model');
    setModelRunning(false);
    
  };


  const detect = async function(net){
    try{

    
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        console.log(webcamRef.current, webcamRef.current.offsetHeight);
        
        // perform detection
        const startTime = performance.now(); // Record start time
        const obj = await net.detect(video);
        const endTime = performance.now(); // Record end time
        // console.log('model took ' + (endTime - startTime) + 'ms');
        const ctx = canvasRef.current.getContext("2d");
        // console.log(obj);
        drawRect(obj, ctx);  
      }
    }
    catch(e){
      console.log(e);
    }
  };


  const handleWebcamChange = (event) => {
    setSelectedWebcam(event.target.value);
  };

  return (
    <>
      <div className='overflow-hidden'>
        <div className="  flex  bg-slate-700 p-6 place-content-center " id="Heading " >
          <div className='flex items-center '>
            <h1 className="text-5xl" >
              Welcome to Object Detection
            </h1>
          </div>
        </div>

        {/* Details about app */}
        <div className=''>
          <div id='Intro' className='flex p-5 text-2xl font-bold underline capitalize ' >
            <p>Introduction to App:</p> 
            
          </div>
          <div id='Details' className='flex p-5  font-mono ' >
            <p>
              This is a simple object detection app which uses tensorflow.js and coco-ssd model to detect objects in real time.
              It uses your webcam to capture the video and then perform detection on it.
              It can detect multiple objects at a time and draw a bounding box around them.
            </p>
        </div>
        </div>
        {/* web cam and canva  check all the camera avaliable and used one which is slsected by user*/}
        <div className=" border border-black max-md flex flex-col justify-center items-center ">
      <div className="text-center ">
        <h1 className=" text-xl text-indigo-300  font-semibold p-2">Select Webcam</h1>
        <select
          value={selectedWebcam}
          onChange={handleWebcamChange}
          className="  m-7 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
        >
          {webcamDevices.map(webcam => (
            <option key={webcam.deviceId} value={webcam.deviceId}>{webcam.label}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 relative ">
        <Webcam
          className=' border border-spacing-6 border-orange-900 w-640 h-480 top-0 left-0 z-10'
          ref={webcamRef}
          audio={false}
          videoConstraints={{ deviceId: selectedWebcam }}
        />
        <canvas
          ref={canvasRef}
          className=" absolute   w-auto h-auto top-0 left-0 z-10"
        />
      </div>
    </div>
    {/* button div */}
    <div className='flex flex-col items-center place-content-center' >

      <div className="z-20 flex flex-row gap-6 items-center place-content-center p-5">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleStart}>
          Start Detection
        </button>
        <button className="z-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleStop}>
          Stop Detection
        </button>
      </div>

    </div>
            
      
      
    
    
    
    </div>  

    </>
  )
}

export default App;
