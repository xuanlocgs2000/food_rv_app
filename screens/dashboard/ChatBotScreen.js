import React, { useState, useEffect, useRef } from "react";
import { GiftedChat, Bubble, Composer, Avatar } from "react-native-gifted-chat";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import FAQList from "../../components/chatbot/FAQList";

const API_KEY = process.env.API_KEY;

const systemMessage = {
  role: "system",
  content: "Ẩm thực Việt Nam",
};

const ChatBotScreen = ({ navigation }) => {
  const giftedChatRef = useRef(null);

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
  const [isFAQListVisible, setIsFAQListVisible] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  // const [showScrollToBottom, setShowScrollToBottom] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(true);

  const [showInfoBanner, setShowInfoBanner] = useState(true);
  useEffect(() => {
    if (scrollToBottom) {
      giftedChatRef.current?.scrollToBottom();
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfoBanner(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsTyping(false);
      processMessageToChatGPT();
    }, 500);

    return () => clearTimeout(delay);
  }, [messages]);

  const InfoBanner = () => {
    return (
      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerText}>
          Cảnh báo: Đây là thông tin chỉ để tham khảo và cân nhắc khi sử dụng!
        </Text>
      </View>
    );
  };
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

        const data = await response.json(); //"token" đề cập đến các đơn vị nhỏ nhất của dữ liệu văn bản được sử dụng để xử lý và đưa vào mô hình.
        //usage: Thông tin về việc sử dụng API.

        // completion_tokens: Số lượng token được sử dụng trong quá trình hoàn thành tin nhắn.
        // prompt_tokens: Số lượng token trong phần gợi ý (prompt) của tin nhắn.
        // total_tokens: Tổng số token trong yêu cầu gửi tin nhắn.
        console.log(data);
        const assistantMessage = {
          _id: messages[0]._id + 1,
          text: data.choices[0]?.message?.content || "No response",
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

  const renderFAQButton = () => {
    return (
      <TouchableOpacity style={styles.faqButton} onPress={toggleFAQList}>
        <Image
          source={require("../../assets/question.png")}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
    );
  };

  const renderFAQList = () => {
    if (isFAQListVisible) {
      return (
        <FAQList
          handleFAQQuestionPress={handleFAQQuestionPress}
          toggleFAQList={toggleFAQList}
        />
      );
    }
    return null;
  };

  const handleFAQQuestionPress = (question) => {
    const newMessage = {
      _id: messages[0]._id + 1,
      text: question,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "user",
      },
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);

    setIsFAQListVisible(false);
  };

  const scrollToBottomButton = showScrollToBottom ? (
    <TouchableOpacity
      style={styles.scrollToBottomButton}
      onPress={() => setScrollToBottom(true)}
    >
      <Image
        source={require("../../assets/down-arrow.png")}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  ) : null;

  const dismissFAQList = () => {
    setIsFAQListVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissFAQList}>
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
          {renderFAQButton()}
        </View>
        {renderFAQList()}
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
          ref={giftedChatRef}
        />
        {scrollToBottomButton}
        {showInfoBanner && <InfoBanner />}
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#48a7a8",
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
    borderColor: "#c0e9f0",
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
  scrollToBottomButton: {
    position: "absolute",
    bottom: 95,
    right: 10,
    // backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  scrollToBottomButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  infoBanner: {
    backgroundColor: "#f9dada",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    // left: "50%",
    // transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e74c3c",
  },
  infoBannerText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ChatBotScreen;
