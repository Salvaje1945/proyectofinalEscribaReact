// import {
//     getFirestore,
//     doc,
//     getDoc,
//     collection,
//     getDocs,
//     addDoc,
// } from "firebase/firestore";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";

export const crearNuevoCarrito = async (datos)=> {

    const carrito = {

        idu: datos.idu,
        items: [{
            idp: datos.idp,
            nom: datos.nombre,
            cant: datos.cantidad,
            imp: datos.importe
        }],
        totalcant: datos.totalcant,
        totalimp: datos.totalimp,
    }
    const db = getFirestore()
    const coleccionCarritos = collection(db, 'carritos')
    addDoc(coleccionCarritos, carrito).then(({id})=> {
        return id
    })

}

// export const actualizarCarrito = async (coleccion, documentoId, objetoNuevo, cantidadTotal, importeTotal) => {
//     const db = getFirestore();
//     const documentoRef = doc(db, coleccion, documentoId);
  
//     try {
//       await updateDoc(documentoRef, {
//         items: [objetoNuevo, documentoRef.items],
//         totalcant: cantidadTotal,
//         totalimp: importeTotal,
//       });
//       console.log('Documento actualizado con éxito');
//     } catch (error) {
//       console.error('Error al actualizar el documento:', error);
//     }
//   };

export const actualizarCarrito = async (coleccion, documentoId, objetoNuevo, cantidadTotal, importeTotal) => {
    const db = getFirestore();
    const documentoRef = doc(db, coleccion, documentoId);

    try {
        await updateDoc(documentoRef, {
            // items: [objetoNuevo, ...documentoRef.items],
            items: arrayUnion(objetoNuevo),
            totalcant: cantidadTotal,
            totalimp: importeTotal,
        });
        console.log('Documento actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
    }
};




  