import React, {useState, useEffect} from 'react'

function Timer() {

    const [timeInSeconds, setTimeInSeconds] = useState(0);

    const tick = () => {
        setTimeInSeconds((previousTimeInSeconds) => previousTimeInSeconds + 1);
    }

    useEffect(() => {
        const intervalHandle = setInterval(tick, 1000)
        return () => {
            // Cleanup the memory
            clearInterval(intervalHandle);
        }
    }, []);


    const formattedTimeString = new Date(1000 * timeInSeconds).toISOString().substr(11, 8);


    return (
        <div>
            {`Duration: ${formattedTimeString}`}
        </div>
    )
}

export default Timer
