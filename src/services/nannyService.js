import { ref, get, query, limitToFirst, startAfter } from "firebase/database";
import { db } from "./firebase";

export const getNannies = async (limit = 3, lastKey = null) => {
  let q = query(ref(db, "nannies"), limitToFirst(limit));

  if (lastKey) {
    q = query(ref(db, "nannies"), startAfter(lastKey), limitToFirst(limit));
  }

  const snapshot = await get(q);
  return snapshot.val();
};
