import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Whether a Firebase project is configured. In the static GitHub Pages build
 * there are no env vars, so we must NOT call getAuth()/getFirestore() — they
 * throw `auth/invalid-api-key` at module load and crash the whole app.
 *
 * Every consumer of `auth` / `db` runs only after a user is authenticated,
 * which can't happen when Firebase is disabled, so the casts below are safe.
 */
export const isFirebaseEnabled = Boolean(firebaseConfig.apiKey);

let app: FirebaseApp | undefined;
let auth: Auth;
let db: Firestore;

if (isFirebaseEnabled) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  auth = undefined as unknown as Auth;
  db = undefined as unknown as Firestore;
}

export { app, auth, db };
