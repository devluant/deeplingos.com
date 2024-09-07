import { Link } from "react-router-dom"
import UploadMP3File from "../components/UploadMp3File"

export default function Home(props) {
    return (
        <div className="h-screen border-4 border-red-300">
            <UploadMP3File setLessonData={ props.setLessonData } />
            {
                props.lessonData.length > 0 ? <p><Link to="/steps">Start</Link></p> : <h1>No Lesson Text Found</h1>
            }
        </div>
    )
}