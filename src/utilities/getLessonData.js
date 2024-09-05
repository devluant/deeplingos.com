import firebaseApp from "../firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";

function getLessonData(lessonHash) {
  const db = getFirestore(firebaseApp);
  getDoc(doc(db, "chinese-english", lessonHash))
    .then((docSnap) => {
      if (docSnap.exists()) {
        console.log("docSnap id:", docSnap.id);
        const { lessonData } = docSnap.data();
        console.log("docSnap data: lessonData:", JSON.parse(lessonData));
      } else {
        console.info("No such document!");
      }
    })
    .catch((e) => {
      console.error("Error reading document: ", e);
    });
}

export default getLessonData;
