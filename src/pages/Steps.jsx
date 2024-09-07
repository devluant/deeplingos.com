import React from "react"
import { Link } from "react-router-dom"

export default function Steps(props) {
    const endOfLineElementsRef = React.useRef(null)
    const [lines, setLines] = React.useState([props.lessonData[0]])

    React.useEffect(() => {
        if (endOfLineElementsRef.current) {
            endOfLineElementsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }
    } , [lines])

    const lineElements = lines.map((line, index) => {
        const setRef = node => {
            if (index === lines.length - 1) {
                endOfLineElementsRef.current = node
            }
        }

        return <div className="h-10" ref={ setRef } key={ line.id }>{ line.pinyin }</div>
    })

    function handleContinue() {
        if (lines.length < props.lessonData.length) {
            setLines(prev => [...prev, props.lessonData[prev.length]])
        } else {
            console.log("done")
        }            
    }

    return (
        <div className="h-screen flex flex-col justify-evenly border-4 border-yellow-300">
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