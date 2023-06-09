import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { collection, doc, updateDoc } from "firebase/firestore";
import { fsbase } from "../../firebase/firebase";

const EditPostScreen = ({ route, navigation }) => {
  const { postId, postEmail } = route.params;
  const currentUserEmail = useSelector((state) => state.auth.email);

  const [caption, setCaption] = useState("");

  const handleEditPost = async () => {
    try {
      const postRef = doc(fsbase, `users/${postEmail}/posts/${postId}`);
      await updateDoc(postRef, { caption });
      console.log("Bài viết đã được chỉnh sửa thành công.");
      navigation.goBack();
    } catch (error) {
      console.log("Lỗi khi chỉnh sửa bài viết:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
        }}
        placeholder="Nhập nội dung bài viết"
        value={caption}
        onChangeText={setCaption}
      />
      <TouchableOpacity
        onPress={handleEditPost}
        style={{
          backgroundColor: "blue",
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 6,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Lưu chỉnh sửa
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPostScreen;
