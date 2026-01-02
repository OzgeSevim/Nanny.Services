import { ref, set, remove, get } from "firebase/database";
import { db } from "./firebase";

export const addFavorite = async (userId, nannyId) => {
  const favRef = ref(db, `favorites/${userId}/${nannyId}`);
  await set(favRef, true);
};

export const removeFavorite = async (userId, nannyId) => {
  const favRef = ref(db, `favorites/${userId}/${nannyId}`);
  await remove(favRef);
};

export const getFavorites = async (userId) => {
  const favRef = ref(db, `favorites/${userId}`);
  const snapshot = await get(favRef);
  return snapshot.exists() ? snapshot.val() : {};
};
