import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyCfxyekcsmQZJdfuMRZc-98swvZOQlQXHM",
//   authDomain: "hotel-manager-1539e.firebaseapp.com",
//   projectId: "hotel-manager-1539e",
//   storageBucket: "hotel-manager-1539e.appspot.com",
//   messagingSenderId: "124974073673",
//   appId: "1:124974073673:web:46cac670fa76cc6d93bc98",
//   measurementId: "G-RT0L2YZ0NV",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBDm6DmY0rnac_mSc-87d5rXS15cbOALI0",
  authDomain: "hotel-sama-final.firebaseapp.com",
  projectId: "hotel-sama-final",
  storageBucket: "hotel-sama-final.appspot.com",
  messagingSenderId: "545036631726",
  appId: "1:545036631726:web:fade7864b6273f821bb73f",
  measurementId: "G-H4L0CCJH3W"
};
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const storage = getStorage(app);
