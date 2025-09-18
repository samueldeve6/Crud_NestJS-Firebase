
import * as admin from 'firebase-admin';
import * as path from 'path';

// Ruta a tu archivo JSON de Service Account. Ajusta si lo moviste fuera de src/.
const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export const firestore = firebaseApp.firestore();


