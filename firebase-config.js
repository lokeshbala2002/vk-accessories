// Firebase Configuration (v8 compat API)
const firebaseConfig = {
  apiKey: "AIzaSyCV-0g_0QoaikBDe7VWBYhk5z1leXBs980",
  authDomain: "vk-accessories-new.firebaseapp.com",
  projectId: "vk-accessories-new",
  storageBucket: "vk-accessories-new.firebasestorage.app",
  messagingSenderId: "333429989603",
  appId: "1:333429989603:web:9511b6fd4538979ec625d6"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firestore
const db = firebase.firestore();

// Configure Firestore settings (with merge to avoid warnings)
db.settings({
  merge: true,
  experimentalForceLongPolling: true,
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

// Initialize Auth
const auth = firebase.auth();

console.log("🔥 Firebase v8 initialized!");
console.log("📍 Project: vk-accessories-new");
console.log("✅ Database ready to receive orders");
