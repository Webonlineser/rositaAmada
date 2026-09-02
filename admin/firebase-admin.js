import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
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
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function saveSiteConfig(siteConfig) {
  await setDoc(doc(db, "siteConfig", "home"), siteConfig, { merge: true });
}

export async function loadSiteConfig() {
  const snapshot = await getDoc(doc(db, "siteConfig", "home"));
  return snapshot.exists() ? snapshot.data() : {};
}

export async function saveProducts(products) {
  for (const product of products) {
    await setDoc(doc(db, "productos", String(product.id)), product, { merge: true });
  }
}

export async function loadProducts() {
  const q = query(collection(db, "productos"), orderBy("nombre"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function uploadImage(file, path) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
