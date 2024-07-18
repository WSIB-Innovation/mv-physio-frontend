import React, {useEffect, useState} from 'react';

function App() {
    const [liveCapture, setLiveCapture] = useState(null)
  
    const toggleLiveCapture = async () => {
        setLiveCapture(null)

    fetch('http://localhost:5000/stop-capture')
        .then(response => response.json())
        .then(data => (
            setLiveCapture(`data:image/png;base64,${data.plot}`)))
    }

    useEffect(() => {
        setLiveCapture('http://localhost:5000/live-capture')
    }, []);

    return (
        <div className="App">
        <button onClick={toggleLiveCapture}>Complete</button>

            {liveCapture && (
            <img src={liveCapture} alt="live-capture" />
            )}

        </div>
    );
}

export default App;

