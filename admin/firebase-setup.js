import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function loginAdmin(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export function monitorAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function logoutAdmin() {
  await signOut(auth);
}

export async function saveSiteConfig(siteConfig) {
  await setDoc(doc(db, "siteConfig", "home"), siteConfig, { merge: true });
}

export async function loadSiteConfig() {
  const refDoc = await getDoc(doc(db, "siteConfig", "home"));
  return refDoc.exists() ? refDoc.data() : {};
}

export async function saveProduct(product) {
  await setDoc(doc(db, "productos", String(product.id)), product, { merge: true });
}

export async function saveProducts(products) {
  await Promise.all(products.map(saveProduct));
}

export async function saveCatalogSnapshot(products) {
  await setDoc(doc(db, "catalog", "current"), {
    productos: products,
    updatedAt: new Date().toISOString(),
    total: products.length
  });
}

export async function loadProducts() {
  const q = query(collection(db, "productos"), orderBy("nombre"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function loadCatalogSnapshot() {
  const snapshot = await getDoc(doc(db, "catalog", "current"));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function uploadImage(file, path) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function savePromoBanner(data) {
  await setDoc(doc(db, "siteConfig", "promoBanner"), data, { merge: true });
}

export async function loadPromoBanner() {
  const refDoc = await getDoc(doc(db, "siteConfig", "promoBanner"));
  return refDoc.exists() ? refDoc.data() : {};
}
