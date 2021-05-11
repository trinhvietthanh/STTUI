import logo from "./logo.svg";
import "./style.css";
import useRecorder from "./component/useRecorder";
// import uploadAudio from "./component/UploadAudio";

function App() {
  // const [Text, SetText] = useState("");
  let [audioURL, isRecording, startRecording, stopRecording, uploadAudio, TextResponse] = useRecorder();
  // useEffect(() => {
  //   SetText(TextResponse);
  // });
  
  return (

    <div className="App">
      <div className="page">
        <div className="container">
          <div className="row">
            <div className="col-md-4 page-left">
              <img src="./logo.png" alt="logo" />
              <h3>Welcome</h3>
              <p>
              {console.log(TextResponse)}
               
              </p>
            </div>
            <div className="col-md-8 page-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="page-heading">Text to speech</h3>

                  <div className="row page-form">
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <audio src={audioURL} controls />
                        <button onClick={startRecording} disabled={isRecording}>
                          start recording
                        </button>
                        <button onClick={stopRecording} disabled={!isRecording}>
                          stop recording
                        </button>

                        <button onClick={uploadAudio}>Upload</button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea
                          name="text"
                          className="input_text"
                          id="text"
                          rows="8"
                        >{TextResponse}</textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
