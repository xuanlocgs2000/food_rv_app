// import React, { useState } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";
// export default function ChatBotScreen() {
//   const [messages, setMessages] = useState([]);
//   const YOUR_CHATGPT_API_KEY =
//     "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";
//   const handleSend = async (newMessages = []) => {
//     try {
//       const userMessage = newMessages[0];
//       //console.log(userMessage)
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, userMessage)
//       );
//       const messageText = userMessage.text.toLowerCase();
//       const keywords = ["recipe", "food", "diet", "fruit"];
//       if (!keywords.some((keyword) => messageText.includes(keyword))) {
//         //khong chua key word
//         const botMessage = {
//           _id: new Date().getTime() + 1,
//           text: "Bạn cần giúp đỡ gì nào? Hãy hỏi tôi bất cứ điều gì liên quan đến những món ăn !",
//           createAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Food Bot",
//           },
//         };
//         setMessages((previousMessages) =>
//           GiftedChat.append(previousMessages, botMessage)
//         );
//         return;
//       }
//       //chua keyword
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/text-davinci-003/completions",
//         {
//           prompt: `get me a recipe for ${messageText}`,
//           max_tokens: 1200,
//           temperatures: 0.2,
//           n: 1,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
//           },
//         }
//       );
//       console.log(response.data);
//       const recipe = response.data.choices[0].text.trim();
//       const botMessage = {
//         _id: new Date().getTime() + 1,
//         text: recipe,
//         createAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Food Bot",
//         },
//       };
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, botMessage)
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Text style={styles.textHeader}>Foodbot</Text>
//       </View>
//       <GiftedChat
//         message={messages}
//         onSend={(newMessages) => handleSend(newMessages)}
//         user={{ _id: 1 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   text: {
//     fontSize: 18,
//     textAlign: "center",
//   },
//   header: {
//     backgroundColor: "blue",
//     padding: 10,
//     alignItems: "center",
//     borderBottomWidth: 1,
//     marginBottom: 5,
//   },
//   textHeader: {
//     fontSize: 12,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });
// ========================================
// import React, { useState } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";

// export default function ChatBotScreen() {
//   const [messages, setMessages] = useState([]);
//   const YOUR_CHATGPT_API_KEY =
//     "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";

//   const handleSend = async (newMessages = []) => {
//     try {
//       const userMessage = newMessages[0];
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, userMessage)
//       );
//       const messageText = userMessage.text.toLowerCase();

//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci-codex/completions",
//         {
//           prompt: `Get me some information about ${messageText}`,
//           max_tokens: 1200,
//           n: 1,
//           stop: ["\n"],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
//           },
//         }
//       );

//       const botMessage = {
//         _id: new Date().getTime() + 1,
//         text: response.data.choices[0].text.trim(),
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Food Bot",
//         },
//       };

//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, botMessage)
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Text style={styles.textHeader}>Foodbot</Text>
//       </View>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => handleSend(newMessages)}
//         user={{ _id: 1 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "blue",
//     padding: 10,
//     alignItems: "center",
//     borderBottomWidth: 1,
//     marginBottom: 5,
//   },
//   textHeader: {
//     fontSize: 12,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });
// =================================================================
// import React, { useState } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";

// export default function ChatBotScreen() {
//   const [messages, setMessages] = useState([]);
//   //     "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";
//   const YOUR_CHATGPT_API_KEY =
//     "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";

//   const handleSend = async (newMessages = []) => {
//     try {
//       const userMessage = newMessages[0];
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, userMessage)
//       );

//       const messageText = userMessage.text.toLowerCase();
//       const regions = ["miền bắc", "miền trung", "miền nam"];
//       const region = regions.find((region) => messageText.includes(region));

//       if (!region) {
//         const botMessage = {
//           _id: new Date().getTime() + 1,
//           text: "Xin lỗi, tôi chỉ biết về các món ăn của các vùng miền ở Việt Nam. Bạn hãy hỏi tôi về một trong ba vùng miền bắc, trung hoặc nam!",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Food Bot",
//           },
//         };
//         setMessages((previousMessages) =>
//           GiftedChat.append(previousMessages, botMessage)
//         );
//         return;
//       }

//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci/completions",
//         {
//           prompt: `get me a popular dish from ${region}`,
//           max_tokens: 1200,
//           temperature: 0.2,
//           n: 1,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
//           },
//         }
//       );

//       const dish = response.data.choices[0].text.trim();
//       const botMessage = {
//         _id: new Date().getTime() + 1,
//         text: dish,
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Food Bot",
//         },
//       };
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, botMessage)
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Text style={styles.textHeader}>Food Bot - Vùng miền Việt Nam</Text>
//       </View>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => handleSend(newMessages)}
//         user={{ _id: 1 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#0275d8",
//     padding: 10,
//     alignItems: "center",
//     borderBottomWidth: 1,
//     marginBottom: 5,
//   },
//   textHeader: {
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "bold",
//     color: "#fff",
//   },
// });
// =======================================================
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const YOUR_CHATGPT_API_KEY =
    "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";

  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );
      const messageText = userMessage.text.toLowerCase();
      const keywords = ["món ăn", "công thức", "cách chế biến", "nguyên liệu"];
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
      <View style={styles.header}>
        <Text style={styles.textHeader}>ChatBot Ẩm Thực Việt Nam</Text>
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
    backgroundColor: "#0275d8",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  textHeader: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
// ==================================
// import React, { useState, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";
// const YOUR_CHATGPT_API_KEY =
//   "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";

// const CHATBOT_USER = {
//   _id: 2,
//   name: "Chatbot",
//   avatar: "https://placeimg.com/140/140/any",
// };

// const ChatbotScreen = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Xin chào, tôi là Chatbot, tôi có thể giúp gì cho bạn?",
//         createdAt: new Date(),
//         user: CHATBOT_USER,
//       },
//     ]);
//   }, []);

//   const handleSend = async (newMessages = []) => {
//     setMessages(GiftedChat.append(messages, newMessages));
//     const messageText = newMessages[0].text;

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci-codex/completions",
//         {
//           prompt: messageText,
//           max_tokens: 60,
//           n: 1,
//           stop: ["\n"],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: |"Bearer"+ ${YOUR_CHATGPT_API_KEY},
//           },
//         }
//       );

//       const chatbotMessage = {
//         _id: Math.random(),
//         text: response.data.choices[0].text,
//         createdAt: new Date(),
//         user: CHATBOT_USER,
//       };

//       setMessages(GiftedChat.append(messages, [chatbotMessage]));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={handleSend}
//       user={{
//         _id: 1,
//       }}
//     />
//   );
// };

// export default ChatbotScreen;
