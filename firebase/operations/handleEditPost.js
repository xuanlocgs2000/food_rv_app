import { updateDoc, doc } from "firebase/firestore";
import { fsbase } from "../../firebase/firebase";

import handleMedia from "./handleMedia";

const handleEditPost = async (
  postId,
  caption,
  postImage,
  email,
  username,
  owner_uid
) => {
  const postRef = doc(fsbase, `users/${email}/posts/`, postId);
  const postSnapshot = await getDoc(postRef);

  if (postSnapshot.exists()) {
    const postPhoto = await handleMedia(postImage, "photos");
    const updatedData = {
      caption,
      postImage: postPhoto,
    };

    await updateDoc(postRef, updatedData);
  }
};

export default handleEditPost;
