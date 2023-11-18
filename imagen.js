const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('./apis/keyimagen.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'credencailes',
});

async function listStorageFiles() {
    const storage = admin.storage();
    const storageRef = storage.bucket();
    const links = [];

    try {
        const [files] = await storageRef.getFiles({ prefix: 'img_products/' });

        for (const file of files) {
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '01-01-2100',
            });
            links.push(url);
        }

        fs.writeFileSync('enlaces.txt', links.join('\n'), 'utf-8');
        console.log('Enlaces guardados en enlaces.txt');
    } catch (error) {
        console.error('Error al listar archivos en la carpeta:', error);
    }
}

listStorageFiles();

/* node imagen.js para generar el archivo */