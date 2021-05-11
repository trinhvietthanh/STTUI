import { useEffect, useState } from "react";
import axios from 'axios';



const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioBase64, setAudioBase64] = useState(null);
  const [TextResponse, setTextResponse] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready
    const handleData = e => {
      audioToBase64(e.data).then(result => setAudioBase64(result));
      setAudioURL(URL.createObjectURL(e.data));
    };
    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };
  const uploadAudio = () =>{
    axios.post('https://192.168.1.14:5000/api/asr', {
      text: audioBase64,
    })
    .then(function (response) {
      setTextResponse(response.data.text);
      console.log(TextResponse);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return [audioURL, isRecording, startRecording, stopRecording, uploadAudio, TextResponse];
};

async function audioToBase64(audioFile) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(audioFile);
  });
}

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
