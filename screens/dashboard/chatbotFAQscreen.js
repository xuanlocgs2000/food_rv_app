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
      _id: 0,
      text: "Câu hỏi thường gặp",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "ChatGPT",
        avatar: require("../../assets/chatgpt-avatar.png"),
      },
    },
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
  const [isFAQListVisible, setIsFAQListVisible] = useState(false);

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

  const toggleFAQList = () => {
    setIsFAQListVisible(!isFAQListVisible);
  };

  const handleFAQQuestionPress = (question) => {
    const outgoingMessage = {
      _id: messages.length + 1,
      text: question,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "user",
      },
    };

    const updatedMessages = [outgoingMessage, ...messages];
    setMessages(updatedMessages);
    setIsFAQListVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={toggleFAQList}>
          <Text style={styles.faqButton}>Câu hỏi thường gặp</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Ẩm thực Việt Nam</Text>
      </View>
      {isFAQListVisible && (
        <View style={styles.faqListContainer}>
          <TouchableOpacity
            style={styles.faqQuestion}
            onPress={() => handleFAQQuestionPress("Câu hỏi 1")}
          >
            <Text style={styles.faqQuestionText}>Câu hỏi 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.faqQuestion}
            onPress={() => handleFAQQuestionPress("Câu hỏi 2")}
          >
            <Text style={styles.faqQuestionText}>Câu hỏi 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.faqQuestion}
            onPress={() => handleFAQQuestionPress("Câu hỏi 3")}
          >
            <Text style={styles.faqQuestionText}>Câu hỏi 3</Text>
          </TouchableOpacity>
          {/* Thêm các câu hỏi khác tại đây */}
        </View>
      )}
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
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  faqButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: "#02424a",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#02424a",
  },
  faqListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
  },
  faqQuestion: {
    paddingVertical: 8,
  },
  faqQuestionText: {
    fontSize: 16,
    color: "#02424a",
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  systemMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  systemMessageText: {
    fontSize: 14,
    color: "#999999",
  },
  textInputStyle: {
    fontSize: 16,
    lineHeight: 18,
    paddingBottom: 6,
    paddingHorizontal: 0,
  },
});

export default ChatBotScreen;
