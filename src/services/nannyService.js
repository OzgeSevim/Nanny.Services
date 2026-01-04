// import {
//   ref,
//   get,
//   query,
//   limitToFirst,
//   startAfter,
//   orderByKey,
// } from "firebase/database";
// import { db } from "./firebase";

// export const getNannies = async (limit = 3, lastKey = null) => {
//   let q;

//   if (lastKey) {
//     q = query(
//       ref(db, "nannies"),
//       orderByKey(),
//       startAfter(lastKey),
//       limitToFirst(limit)
//     );
//   } else {
//     q = query(ref(db, "nannies"), orderByKey(), limitToFirst(limit));
//   }

//   const snapshot = await get(q);
//   return snapshot.val();
// };

import {
  ref,
  get,
  query,
  limitToFirst,
  startAfter,
  orderByChild,
  orderByKey,
} from "firebase/database";
import { db } from "./firebase";

export const getNannies = async ({
  limit = 3,
  lastKey = null,
  filter = "all",
}) => {
  let q;

  const refNannies = ref(db, "nannies");

  // orderBy ve startAfter
  if (lastKey) {
    q = query(
      refNannies,
      orderByKey(),
      startAfter(lastKey),
      limitToFirst(limit)
    );
  } else {
    q = query(refNannies, orderByKey(), limitToFirst(limit));
  }

  const snapshot = await get(q);
  let data = snapshot.val() || {};

  // Filter burada uygulanabilir
  let result = Object.entries(data).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  switch (filter) {
    case "az":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "popular":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "not_popular":
      result.sort((a, b) => a.rating - b.rating);
      break;
    case "price_low":
      result = result.filter((n) => n.price_per_hour < 10);
      break;
    case "price_high":
      result = result.filter((n) => n.price_per_hour > 10);
      break;
    default:
      break;
  }

  return result;
};
