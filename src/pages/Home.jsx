import { Link } from "react-router-dom"
import UploadMP3File from "../components/UploadMp3File"

export default function Home(props) {
    return (
        <div className="h-screen border-4 border-red-300">
            <UploadMP3File setLessonData={ props.setLessonData } />
            {
                (props.lessonData.text !== undefined && props.lessonData.text.length > 0) ? <p><Link to="/steps">Start</Link> || { props.lessonData.info.lessonSubtitle }: { props.lessonData.info.lessonTitle }</p> : <h1>No Lesson Text Found</h1>
            }
        </div>
    )
}