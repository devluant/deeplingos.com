import React from "react"
import { Link } from "react-router-dom"

export default function Steps(props) {
    const endOfLineElementsRef = React.useRef(null)
    const audioRef = React.useRef(null)
    const endTime = React.useRef(0)

    React.useEffect(() => {
        if (endOfLineElementsRef.current) {
            endOfLineElementsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }

        // Play audio every time there's a new line added
        if(props.lines.at(-1)) {
            const lastLine = props.lines.at(-1)
            playAudio(lastLine.start)           
            endTime.current = lastLine.end
        }
    } , [props.lines])

    const lineElements = props.lines.map((line, index) => {
        const setRef = node => {
            if (index === props.lines.length - 1) {
                endOfLineElementsRef.current = node
            }
        }

        return <div className="mb-10" ref={ setRef } key={ line.id }>{ line.pinyin }</div>
    })

    function handleContinue() {
        if (props.lines.length < props.lessonData.length) {
            props.setLines(prev => [...prev, props.lessonData[prev.length]])                                        
        } else {
            console.log("done")
        }        
    }

    // Audio Player
    function playAudio(start) {
        audioRef.current.currentTime = start
        audioRef.current.play()
    }

    function handleTimeUpdate() {
        const currentTime = audioRef.current.currentTime
        
        if (currentTime >= endTime.current ) {
            audioRef.current.pause()
        }
    }
    return (
        <div className="h-screen flex flex-col justify-evenly border-4 border-yellow-300">
            <audio ref={ audioRef } src={ props.audioFile } onTimeUpdate={ handleTimeUpdate } controls></audio>
            <div className="h-[7%] bg-neutral-300">
                <Link to="/">Back</Link>
            </div>
            <div className="h-5/6 overflow-y-auto bg-neutral-200">
                { lineElements }
            </div>

            <div className="h-[7%] bg-neutral-300">
                <button onClick={ handleContinue }>Continue</button>
            </div>
        </div>            
    )
}