import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import questions from "./questions.json";

const questions = [
  "Món ngon các vùng miền Việt Nam",
  "Món ngon miền Bắc",
  "MÓn ngon Miền Nam",
  "Món ngon miền Trung",
];

const FAQList = ({ handleFAQQuestionPress }) => {
  return (
    <View style={styles.faqListContainer}>
      {questions.map((question, index) => (
        <TouchableOpacity
          key={index}
          style={styles.faqQuestion}
          onPress={() => handleFAQQuestionPress(question)}
        >
          <Text style={styles.faqQuestionText}>{question}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#35bcde",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  textHeader: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "black",
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  systemMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  systemMessageText: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    color: "#000",
  },
  faqButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  faqButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  faqListContainer: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  faqQuestion: {
    paddingVertical: 5,
  },
  faqQuestionText: {
    fontSize: 14,
    color: "#000",
  },
});
export default FAQList;
