import React, { useState } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const actions = [
  {
    text: "chatbot",
    icon: require("../../assets/msg-icon.png"),
    name: "add",
    position: 1,
  },
];

const FloatingButton = ({ onPress }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handlePress = (name) => {
    if (name === "add") {
      onPress();
    }
  };

  const toggleButton = () => {
    setIsButtonVisible(!isButtonVisible);
  };

  return (
    <>
      {isButtonVisible && (
        <FloatingAction
          actions={actions}
          onPressItem={handlePress}
          position="right"
          distanceToEdge={20}
          floatingIcon={
            <Image
              source={require("../../assets/chat.png")}
              style={{ width: 40, height: 40 }} // tăng kích thước của ảnh lên 40x40
            />
          }
        />
      )}
      {isButtonVisible && (
        <TouchableOpacity onPress={toggleButton} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>x</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 722,
    right: 12,
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 8,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default FloatingButton;
