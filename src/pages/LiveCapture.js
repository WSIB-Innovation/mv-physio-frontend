import React, {useEffect, useState} from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function App() {
    const [liveCapture, setLiveCapture] = useState(null)
    const { user } = useAuthContext();
    const { logout } = useLogout();
  
    const toggleLiveCapture = async () => {
        setLiveCapture(null)

        fetch('http://localhost:5000/get_results')
            .then(response => response.json())
        
        logout()
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            console.log(`${key}: ${localStorage.getItem(key)}`);
        }
    }

    useLogout()

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

