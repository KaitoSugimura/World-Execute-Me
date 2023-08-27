import { useEffect, useState } from "react";
import Lyrics from "./Data/Lyrics";
import "./App.css";

let index = 0;
let startTime = 0;
let doOnce = true;

function App() {
  const [load, setLoad] = useState(false);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(
    new Audio(process.env.PUBLIC_URL + "/Music/Execute.mp3")
  );

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 3000);

    // event listener when audio starts
    if (doOnce) {
      audio.addEventListener("play", () => {
        startTime = Date.now();
        setInterval(() => {
          if (index >= Lyrics.length) return;
          const time = Lyrics[index][0];
          const t = time.split(":");
          const MS = +t[0] * 60000 + +t[1] * 1000 + +t[2] * 10;

          const timeSinceLast = Date.now() - startTime;
          if (timeSinceLast >= MS) {
            setText(Lyrics[index][1]);
            index++;
          }
        }, 10);
      });
      doOnce = false;
    }
  }, []);

  return (
    <div className="App">
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
