export default function Text(props) {
    const pinyinArr = props.line.pinyin.split("|")
    const chineseArr = props.line.chinese.split("|")
    
    const textElements = pinyinArr.map((pinyin, index) => {
        return (
            <div key={crypto.randomUUID()} className="flex flex-col text-center">
                <span className="text-xs">{pinyin}</span>
                <span className="text-2xl">{chineseArr[index]}</span>
            </div>
        )
    })  
    return (
        <div className="flex gap-3 flex-wrap justify-start">
            { textElements }
        </div>
    )
}