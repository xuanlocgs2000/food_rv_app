import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { StatusBar } from "react-native";

export default function ChatBotScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  const YOUR_CHATGPT_API_KEY =
    // "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";
    "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";

  useEffect(() => {
    const welcomeMessage = {
      _id: 1,
      text: "Xin chào! Tôi là Food Bot. Hãy hỏi tôi về món ăn, công thức, cách chế biến hoặc nguyên liệu hay bất cứ gì liên quan đến ẩm thực Việt Nam.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Food Bot",
      },
    };
    handleSend([welcomeMessage]);
  }, []);
  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );
      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        "món ăn",
        "công thức",
        "cách chế biến",
        "nguyên liệu",
        "món",
        "ngon",
        "đặc sản",
        "hoa quả",
      ];
      if (!keywords.some((keyword) => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "Xin lỗi, tôi không hiểu câu hỏi của bạn. Hãy hỏi tôi về món ăn, công thức, cách chế biến hoặc nguyên liệu.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Food Bot",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        return;
      }
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: `Cho tôi biết về ${messageText} của miền nào?`,
          max_tokens: 1200,
          temperature: 0.7,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
          },
        }
      );
      console.log(response.data);
      const foodInfo = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: foodInfo,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Food Bot",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back-icon.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>ChatBot Ẩm Thực Việt Nam</Text>
        <View style={{ flex: 1 }}></View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0275d8",
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
});
