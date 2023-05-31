import { doc, deleteDoc } from "firebase/firestore";
import { fsbase } from "../firebase";

const deletePost = async (email, postId) => {
  const postRef = doc(fsbase, `users/${email}/posts/${postId}`);

  try {
    await deleteDoc(postRef);
    console.log("Bài viết đã được xóa thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
  }
};

export default deletePost;
