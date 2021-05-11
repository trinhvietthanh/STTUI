import audioBase64 from './useRecorder';
import axios from 'axios';
import {useState} from 'react';

let TextResponse = null
const uploadAudio = () => {
  
  
  axios.post('https://192.168.1.14:5000/api/asr', {
    text: audioBase64,
  })
  .then(function (response) {
    TextResponse =response.data.text;
    console.log(TextResponse);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default uploadAudio;