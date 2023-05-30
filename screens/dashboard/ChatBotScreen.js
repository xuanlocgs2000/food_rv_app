import React, { useState, useEffect } from "react";
import { GiftedChat, Bubble, Composer, Avatar } from "react-native-gifted-chat";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

const API_KEY = process.env.API_KEY;
const systemMessage = {
  role: "system",
  content: "Ẩm thực Việt Nam",
};

const ChatBotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Xin chào, hãy hỏi tôi bất kỳ điều gì về ẩm thực Việt Nam",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "ChatGPT",
        avatar: require("../../assets/chatgpt-avatar.png"),
      },
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (newMessages) => {
    const message = newMessages[0];

    const outgoingMessage = {
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: {
        _id: 1,
        name: "user",
      },
    };

    const updatedMessages = [outgoingMessage, ...messages];
    setMessages(updatedMessages);

    setIsTyping(true);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsTyping(false);
      processMessageToChatGPT();
    }, 500);

    return () => clearTimeout(delay);
  }, [messages]);

  const processMessageToChatGPT = async () => {
    const latestMessage = messages[0];

    if (latestMessage.user._id === 1) {
      setIsLoading(true);

      const apiMessages = [
        systemMessage,
        {
          role: "user",
          content: latestMessage.text,
        },
      ];

      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: apiMessages,
      };

      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        const data = await response.json();
        // console.log(response);
        const assistantMessage = {
          _id: messages[0]._id + 1,
          text: data.choices[0].message.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "ChatGPT",
            avatar: require("../../assets/chatgpt-avatar.png"),
          },
        };

        const updatedMessages = [assistantMessage, ...messages];
        setMessages(updatedMessages);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: { color: "#fff" },
          left: { color: "#000" },
        }}
        wrapperStyle={{
          left: { backgroundColor: "#f0f0f0" },
          right: { backgroundColor: "#02424a" },
        }}
      />
    );
  };

  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        placeholder="Nhập tin nhắn..."
        textInputStyle={styles.textInputStyle}
        textInputProps={{
          autoCorrect: false,
        }}
      />
    );
  };

  const renderLoading = () => {
    if (isLoading && !isTyping) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#999999" />
        </View>
      );
    }
    return null;
  };

  const renderSystemMessage = (props) => {
    return (
      <View style={styles.systemMessageContainer}>
        <Text style={styles.systemMessageText}>
          {props.currentMessage.text}
        </Text>
      </View>
    );
  };

  const renderAvatar = (props) => {
    return <Avatar {...props} />;
  };

  return (
    <View style={styles.container}>
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
        onSend={handleSend}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderComposer={renderComposer}
        renderLoading={renderLoading}
        renderSystemMessage={renderSystemMessage}
        renderAvatar={renderAvatar}
      />
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
});

export default ChatBotScreen;
