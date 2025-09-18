import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;
    if (!admin.apps.length) {
      const serviceAccountPath = path.join(
        __dirname,
        '../../../firebase/firebase-service-account.json',
      );
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
      });
    }
    this.initialized = true;
  }

  get firestore() {
    this.init();
    return admin.firestore();
  }
}
