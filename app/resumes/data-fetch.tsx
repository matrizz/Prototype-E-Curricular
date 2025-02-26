import { use } from "react"
import Card from "../components/card"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";


export function ResumesList() {
    //@ts-ignore
    return resumes.map(async (resume, key) => {
        console.log(resume.user_image)
        const blob = new Blob(resume.user_image.data, { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob)
        return <Card key={key} img={url} {...resume} />
    })

}



export const getCurriculumById = async (curriculumId: string) => {
    try {
        const docRef = doc(db, "curriculums", curriculumId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());  
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("Nenhum documento encontrado!");
            return null;
        }
    } catch (e) {
        console.error("Erro ao recuperar currículo: ", e);
        return null;
    }
};

export const getCurriculumsByUser = async (uid: string) => {

    const q = query(
        collection(db, "curriculums"),
        where("userId", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    let curriculums: any[] = [];
    querySnapshot.forEach((doc) => {
        curriculums.push({ id: doc.id, ...doc.data() });
    })
    return curriculums;
};

export const getAllCurriculums = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "curriculums"));
        const curriculums: any[] = [];
        querySnapshot.forEach((doc) => {
            curriculums.push({ id: doc.id, ...doc.data() });
        });
        return curriculums;
    } catch (e) {
        console.error("Erro ao recuperar currículos: ", e);
        return [];
    }
};

async function getCurriculumsByName(nome: string) {
    const curriculosRef = collection(db, "curriculos");
    const q = query(curriculosRef, where("pessoal.nome", "==", nome));

    const querySnapshot = await getDocs(q);
    const resultados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return resultados;
}