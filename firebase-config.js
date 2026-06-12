import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey:            "AIzaSyCHdohv0tfLf8taODtLfMKQDPROJN_lwug",
  authDomain:        "rental-manager-da0fa.firebaseapp.com",
  projectId:         "rental-manager-da0fa",
  storageBucket:     "rental-manager-da0fa.firebasestorage.app",
  messagingSenderId: "470999148120",
  appId:             "1:470999148120:web:2fde820f24ca194f2c4c2d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

const provider = new GoogleAuthProvider();

export const login  = async () => {
  try {
    // Pokušaj popup (radi lokalno i na nekim hostovima)
    await signInWithPopup(auth, provider);
  } catch (err) {
    // Ako popup blokiran (COOP / GitHub Pages), koristi redirect
    if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
      await signInWithRedirect(auth, provider);
    } else {
      // Za COOP grešku koja se ne hvata kao error code, idi odmah na redirect
      await signInWithRedirect(auth, provider);
    }
  }
};
export const logout = () => signOut(auth);

// Obradi redirect rezultat pri učitavanju stranice
getRedirectResult(auth).catch(() => {/* tišina — nema redirect rezultata */});

// Master admin — vidi sve, bez ownerId filtera
export const MASTER_ADMIN_UID   = 'HCH4eYH0cYTsmRTUv4rDXfiHg173';
export const MASTER_ADMIN_EMAIL = 'ilija.djinovic@gmail.com';
