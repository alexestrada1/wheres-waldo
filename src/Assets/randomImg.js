import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

async function randomImgs() {
  const waldosCollectionRef = collection(firestore, "waldos");
  const querySnapshot = await getDocs(waldosCollectionRef);

  // Convert the query snapshot to an array of document snapshots
  const docSnapshots = querySnapshot.docs;

  // Randomly sort the document snapshots
  docSnapshots.sort(() => Math.random() - 0.5);

  // Get the first three document snapshots and extract their data into an array
  const imageUrls = docSnapshots
    .slice(0, 3)
    .map((docSnapshot) => docSnapshot.data());
    
  return imageUrls;
}

export default randomImgs;
