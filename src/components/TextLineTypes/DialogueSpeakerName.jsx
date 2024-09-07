export default function DialogueSpeakerName(props) {
    return (
        <>
            <div className="text-xs">{props.line.speakerName.pinyin}</div>
            <div className="text-2xl">{props.line.speakerName.chinese}</div>
        </>  
    )
}