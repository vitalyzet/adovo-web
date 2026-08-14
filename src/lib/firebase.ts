import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDnaPYMpGI5X_VwcMQStGKDOM8qfY6GggY",
  authDomain: "adovo-14382.firebaseapp.com",
  projectId: "adovo-14382",
  storageBucket: "adovo-14382.firebasestorage.app",
  messagingSenderId: "659684844671",
  appId: "1:659684844671:web:03c30ba5575b0dbceb4b4a",
  measurementId: "G-4RFYCMHZ0F"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export let analytics: Analytics | null = null;

// Analytics is only initialized on client-side (browser)
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;
