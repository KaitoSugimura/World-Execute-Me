import { useEffect, useRef, useState } from "react";
import Lyrics from "./Data/Lyrics";
import "./App.css";

let index = 0;
let startTime = 0;

function App() {
  // const audioRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(new Audio("/executeMe.mp3"));

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {/* <audio
        ref={audioRef}
        src="/executeMe.mp3"
        onLoad={() => {
          setLoad(true);
        }}
      /> */}
      {!started ? (
        !load ? (
          <div className="btn">
            Loading...
            <div className="bar"></div>
          </div>
        ) : (
          <button
            className="btn"
            onClick={() => {
              setStarted(true);
              audio.play();
              startTime = Date.now();
              setInterval(() => {
                if (index >= Lyrics.length) return;
                const time = Lyrics[index][0];
                const t = time.split(":");
                const MS = +t[0] * 60000 + +t[1] * 1000 + +t[2] * 10;

                const timeSinceLast = Date.now() - startTime;
                console.log(timeSinceLast, MS);
                if (timeSinceLast >= MS) {
                  setText(Lyrics[index][1]);
                  index++;
                }
              }, 10);
            }}
          >
            Start
          </button>
        )
      ) : (
        <h1 className="text">{text}</h1>
      )}
    </div>
  );
}

export default App;
