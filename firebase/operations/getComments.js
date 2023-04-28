import { fsbase } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

import getAvatar from "./getAvatar";

const getComments = async (email, postIdTemp) => {
  const def_avatar = await getAvatar("default");

  const q = query(
    collection(fsbase, `users/${email}/posts/${postIdTemp}/comments`)
  );
  const snapshot = await getDocs(q);
  const newComments = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const userEmail = doc.data().email;
      const photoUri = await getAvatar("user", userEmail);

      const result = {
        ...doc.data(),
        commentIdTemp: doc.id,
        profile_picture: photoUri ? photoUri : def_avatar,
      };
      return result;
    })
  );
  const sortedComments = newComments.sort((a, b) => b.created < a.created);

  return sortedComments;
};

export default getComments;
