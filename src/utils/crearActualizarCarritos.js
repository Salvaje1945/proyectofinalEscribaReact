import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
} from "firebase/firestore";


export const crearNuevoCarrito = (datos) => {
    return new Promise((resolve, reject) => {
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

        const db = getFirestore();
        const coleccionCarritos = collection(db, 'carritos');

        addDoc(coleccionCarritos, carrito)
            .then(({ id }) => {
                resolve(id)
            })
            .catch((error) => {
                reject(error)
            });
    });
};

export const actualizarCarrito = async (coleccion, documentoId, objetoNuevo, cantidadTotal, importeTotal) => {
    const db = getFirestore();
    const documentoRef = doc(db, coleccion, documentoId);

    try {
        await updateDoc(documentoRef, {
            items: arrayUnion(objetoNuevo),
            totalcant: cantidadTotal,
            totalimp: importeTotal,
        });
        console.log('Producto añadido al carrito con éxito.');
        return true
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
    }
};

export const actualizarProductoDeCarrito = async (coleccion, documentoId, itemId, nuevasPropiedades) => {
    const db = getFirestore();
    const documentoRef = doc(db, coleccion, documentoId);

    try {
        // Obtener el documento actual
        const documentoSnap = await getDoc(documentoRef);
        if (documentoSnap.exists()) {
            // Obtener el campo "items" del documento
            const items = documentoSnap.data().items;
            
            // Buscar el índice del item en el array "items"
            const indiceItem = items.findIndex(item => item.idp === itemId);
            
            if (indiceItem !== -1) {
                // Actualizar las propiedades del item
                items[indiceItem].cant = nuevasPropiedades.cant;
                items[indiceItem].imp = nuevasPropiedades.imp;
                
                // Actualizar el documento con los cambios
                await updateDoc(documentoRef, {
                    items,
                    totalcant: nuevasPropiedades.cantTotal,
                    totalimp: nuevasPropiedades.impTotal
                });
                
                console.log('Producto actualizado con éxito');
                return true;
            } else {
                console.error('No se encontró el Producto con el ID especificado');
            }
        } else {
            console.error('No se encontró el documento especificado');
        }
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
    }
};

export const eliminarProductoDeCarrito = async (coleccion, documentoId, itemId, nuevaCantidadTotal, nuevoImporteTotal) => {
    const db = getFirestore();
    const documentoRef = doc(db, coleccion, documentoId);

    try {
        // Obtener el documento actual
        const documentoSnap = await getDoc(documentoRef);
        if (documentoSnap.exists()) {
            // Obtener el campo "items" del documento
            const items = documentoSnap.data().items;

            // Filtrar los items para eliminar el mapa con el ID especificado
            const nuevosItems = items.filter(item => item.idp !== itemId);

            if (nuevosItems.length === 0) {
                // Si no quedan más items, eliminar el documento completo
                await deleteDoc(documentoRef);
                console.log('Documento eliminado con éxito');
            } else {
                // Actualizar el documento con los cambios
                await updateDoc(documentoRef, {
                    items: nuevosItems,
                    totalcant: nuevaCantidadTotal,
                    totalimp: nuevoImporteTotal
                });
                console.log('Item eliminado y totales actualizados con éxito');
            }

            return true;
        } else {
            console.error('No se encontró el documento especificado');
        }
    } catch (error) {
        console.error('Error al eliminar el item y actualizar los totales:', error);
    }
};