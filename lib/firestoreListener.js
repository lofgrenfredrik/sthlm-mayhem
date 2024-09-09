import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firestore";

export const listenToFirestoreChanges = (collectionName, callback) => {
  // Get the Firestore collection
  const colRef = collection(db, collectionName);

  // Set up a real-time listener for Firestore data
  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Call the callback function with the updated data
    callback(data);
  });

  // Return the unsubscribe function to stop listening when needed
  return unsubscribe;
};
