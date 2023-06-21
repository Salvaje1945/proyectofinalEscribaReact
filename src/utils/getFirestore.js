import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export const getCollection = async (collections) => {
    const db = getFirestore();
    const categoriaCollection = collection(db, collections);
    const result = await getDocs(categoriaCollection);
    return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocument = async (collections, idDocuments) => {
    const db = getFirestore(); // nos conecta a la base de datos
    const categoryRef = doc(db, collections, idDocuments); // conectarse a la coleccion y traer el documento del id que se paso por parametro
    const result = await getDoc(categoryRef);
    if (result.exists()) {
        const documento = { id: result.id, ...result.data() };
        return documento;
    }
};

export const getCarrito = async (collectionName, fieldName, value) => {
  const db = getFirestore();
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(query(collectionRef, where(fieldName, '==', value)));

  let documento = null;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    documento = { id: doc.id, ...data };
    return;
  });

  return documento;
};