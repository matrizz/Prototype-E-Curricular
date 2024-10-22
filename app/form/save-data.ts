import { auth, db, storage } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getCurriculumById } from "../resumes/data-fetch";

export async function SaveImageData(img, uid) {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);

  let image = img;
  let in_progress = 0;
  let imageUrl;

  if (!image) return;

  if (userDoc.exists() && userDoc.data().hasDocument) {
    const resume = await getCurriculumById(userDoc.id)
    console.log(userDoc)
    UpdateImageData(image, resume)
  }

  const storageRef = ref(storage, `images/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      in_progress = progress;
    },
    (error) => {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  );

  await uploadTask;
  imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
  return imageUrl;
}
export async function UpdateImageData(newImage, existingImagePath) {
  if (!newImage || !existingImagePath) {
    console.error("Imagem nova ou caminho da imagem existente não fornecidos.");
    return null;
  }

  try {
    // Cria uma referência para o local da imagem existente
    const storageRef = ref(storage, existingImagePath);

    // Faz o upload da nova imagem para o mesmo local, sobrescrevendo a existente
    const uploadTask = uploadBytesResumable(storageRef, newImage);

    // Retorna uma promise que espera o upload ser concluído
    const updatedImageUrl = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Opcional: Log de progresso do upload
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`Progresso do upload: ${progress}%`);
        },
        (error) => {
          console.error("Erro ao atualizar a imagem:", error);
          reject(error); // Rejeita a promise em caso de erro
        },
        async () => {
          // Upload completo, obtém a URL da imagem atualizada
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url); // Resolve a promise com a nova URL
        }
      );
    });

    return updatedImageUrl; // Retorna a nova URL da imagem
  } catch (error) {
    console.error("Erro durante a atualização da imagem:", error);
    return null; // Em caso de erro, retorna null ou trata conforme necessário
  }
}

export async function UpdateCurriculumData(data, uid, resumeId) {
  const docRef = doc(db, "curriculums", resumeId);

  await updateDoc(docRef, {
    userId: uid,
    ...data,
    updatedAt: new Date(),
  });

  return docRef;
}

export async function SaveCurriculumData(data, uid) {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists() && userDoc.data().hasDocument) {
    await setDoc(doc(db, "curriculums", uid), {
      userId: uid,
      ...data,
      updatedAt: new Date(),
    });
  } else {
    const docRef = await addDoc(collection(db, "curriculums"), {
      userId: uid,
      ...data,
      createdAt: new Date(),
    });
    return docRef;
  }
}
