import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const actions = [
  {
    text: "chatbot",
    icon: require("../../assets/add-icon.png"),
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
      {/* <TouchableOpacity onPress={toggleButton}>
        <Icon name={isButtonVisible ? "visibility-off" : "visibility"} />
      </TouchableOpacity> */}
      {/* loi thu vien  */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingButton;
// ========================================
// import React, { useState } from "react";
// import Draggable from "react-native-draggable";
// import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";

// const FloatingButton = ({ onPress }) => {
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [isButtonVisible, setIsButtonVisible] = useState(true);

//   const handlePress = (name) => {
//     if (name === "add") {
//       onPress();
//     }
//   };

//   const handleDrag = (event, gestureState, _) => {
//     const { dx, dy } = gestureState;
//     setPosition((prevPosition) => ({
//       x: prevPosition.x + dx,
//       y: prevPosition.y + dy,
//     }));
//   };

//   const handleHideButton = () => {
//     setIsButtonVisible(false);
//   };

//   return (
//     <>
//       {isButtonVisible && (
//         <Draggable
//           x={position.x}
//           y={position.y}
//           onDrag={handleDrag}
//           renderSize={30}
//           renderColor="#009688"
//           isCircle
//           onPress={() => setPosition({ x: 100, y: 100 })}
//         >
//           <TouchableOpacity onPress={handlePress}>
//             <Image source={require("../../assets/add-icon.png")} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={handleHideButton}
//           >
//             <Text style={styles.closeButtonText}>X</Text>
//           </TouchableOpacity>
//         </Draggable>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   closeButton: {
//     position: "absolute",
//     top: -10,
//     right: -10,
//     backgroundColor: "#fff",
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default FloatingButton;
// =======================================
// import React, { useState } from "react";
// import Draggable from "react-native-draggable";
// import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";

// const FloatingButton = ({ onPress }) => {
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [isButtonVisible, setIsButtonVisible] = useState(true);
//   const [notificationCount, setNotificationCount] = useState(0);

//   const handlePress = (name) => {
//     if (name === "add") {
//       onPress();
//     }
//   };

//   const handleDrag = (event, gestureState, _) => {
//     const { dx, dy } = gestureState;
//     setPosition((prevPosition) => ({
//       x: prevPosition.x + dx,
//       y: prevPosition.y + dy,
//     }));
//   };

//   const handleHideButton = () => {
//     setIsButtonVisible(false);
//   };

//   return (
//     <>
//       {isButtonVisible && (
//         <Draggable
//           x={position.x}
//           y={position.y}
//           onDrag={handleDrag}
//           renderSize={60}
//           renderColor="#FFF"
//           shouldReverse
//           pressDragReleaseSpeed={200}
//           pressDragReleaseTension={300}
//           friction={15}
//           borderRadius={30}
//           renderShape="circle"
//           renderText={`${notificationCount}`}
//           textOffset={{ x: 0, y: 0 }}
//           textStyle={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}
//           isCircle
//           onPress={() => setPosition({ x: 100, y: 100 })}
//         >
//           <View style={styles.button}>
//             <Image
//               source={require("../../assets/headset.png")}
//               style={styles.icon}
//             />
//           </View>
//         </Draggable>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#0078FF",
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#0078FF",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 6,
//     elevation: 10,
//   },
//   icon: {
//     width: 25,
//     height: 25,
//   },
// });

// export default FloatingButton;
