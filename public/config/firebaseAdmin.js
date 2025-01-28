import admin from 'firebase-admin';
import fs from 'fs';

// Leer el archivo de credenciales y configurar Firebase Admin
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf-8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

export { db };