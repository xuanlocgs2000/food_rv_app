import { View, Image, Text } from "react-native";

const MyPostsEmptyPlaceHolder = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/icons/posts-empty.png")}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <Text style={{ color: "white" }}>Bạn không có bài viết nào</Text>
    </View>
  );
};
export default MyPostsEmptyPlaceHolder;
