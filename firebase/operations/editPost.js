import firebase from "../../firebase/config";

const editPost = async (postId, email, newContent) => {
  try {
    const postRef = firebase.firestore().collection("posts").doc(postId);
    await postRef.update({
      content: newContent,
    });
    console.log("Bài viết đã được chỉnh sửa thành công.", postId);
  } catch (error) {
    throw new Error("Lỗi khi chỉnh sửa bài viết: " + error.message);
  }
};

export default editPost;
