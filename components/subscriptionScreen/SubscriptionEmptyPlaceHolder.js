import { View, Image, Text } from "react-native";

const SubscriptionEmptyPlaceHolder = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/icons/subscribe-empty.png")}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <Text style={{ color: "white" }}>Không ai ở đây cả...</Text>
    </View>
  );
};
export default SubscriptionEmptyPlaceHolder;
