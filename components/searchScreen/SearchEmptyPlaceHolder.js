import { View, Image, Text } from "react-native";

const SearchEmptyPlaceHolder = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/icons/serach-emprty.png")}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <Text style={{ color: "white", textAlign: "center" }}>
        Xin lỗi không thể tìm thấy dữ liệu liên quan
      </Text>
    </View>
  );
};
export default SearchEmptyPlaceHolder;
