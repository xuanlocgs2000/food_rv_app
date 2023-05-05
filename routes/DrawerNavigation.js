import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const DrawerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Drawer Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DrawerScreen;
