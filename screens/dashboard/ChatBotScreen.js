import React, { useState, useEffect } from "react";
import { GiftedChat, Bubble, Composer } from "react-native-gifted-chat";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
// import "react-native-dotenv";
// const API_KEY = "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";
// const API_KEY = DotEnv.API_KEY;
import Config from "react-native-config";

// const API_KEY = Config.API_KEY;
const API_KEY = process.env.API_KEY;
const systemMessage = {
  role: "system",
  content: "Ẩm thực Việt Nam",
};

const ChatBotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Xin chào, hãy hỏi tôi bất cứ điều gì về ẩm thực Việt Nam",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "ChatGPT",
      },
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [debouncedText, setDebouncedText] = useState("");
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

    setDebouncedText(message.text);
    setIsTyping(true);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsTyping(false);
      processMessageToChatGPT();
    }, 500);

    return () => clearTimeout(delay);
  }, [debouncedText]);

  const processMessageToChatGPT = async () => {
    if (!debouncedText) return;

    setIsLoading(true);

    const apiMessages = [
      systemMessage,
      {
        role: "user",
        content: debouncedText,
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

      const assistantMessage = {
        _id: messages[0]._id + 1,
        text: data.choices[0].message.content,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "ChatGPT",
        },
      };

      const updatedMessages = [assistantMessage, ...messages];
      setMessages(updatedMessages);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
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
          right: { backgroundColor: "#007BFF" },
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
    if (isLoading || isTyping) {
      return (
        <View style={styles.loadingContainer}>
          {isTyping && (
            <Text style={styles.typingText}>ChatGPT đang gõ...</Text>
          )}
          {isLoading && <ActivityIndicator size="small" color="#999999" />}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  typingText: {
    color: "#999999",
    marginBottom: 5,
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
