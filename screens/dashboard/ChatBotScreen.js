// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";
// import { StatusBar } from "react-native";

// export default function ChatBotScreen({ navigation }) {
//   const [messages, setMessages] = useState([]);

//   const YOUR_CHATGPT_API_KEY =
//     // "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";
//     // "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";
//     // "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";
//     // "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";
//     "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";

//   useEffect(() => {
//     const welcomeMessage = {
//       _id: 1,
//       text: "Xin chào! Tôi là Food Bot. Hãy hỏi tôi về món ăn, công thức, cách chế biến hoặc nguyên liệu hay bất cứ gì liên quan đến ẩm thực Việt Nam.",
//       createdAt: new Date(),
//       user: {
//         _id: 2,
//         name: "Food Bot",
//       },
//     };
//     handleSend([welcomeMessage]);
//   }, []);
//   const handleSend = async (newMessages = []) => {
//     try {
//       const userMessage = newMessages[0];
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, userMessage)
//       );
//       const messageText = userMessage.text.toLowerCase();
//       const keywords = [
//         "món ăn",
//         "công thức",
//         "cách chế biến",
//         "nguyên liệu",
//         "món",
//         "ngon",
//         "đặc sản",
//         "hoa quả",
//       ];
//       if (!keywords.some((keyword) => messageText.includes(keyword))) {
//         const botMessage = {
//           _id: new Date().getTime() + 1,
//           text: "Xin lỗi, tôi không hiểu câu hỏi của bạn. Hãy hỏi tôi về món ăn, công thức, cách chế biến hoặc nguyên liệu.",
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
//           prompt: `Cho tôi biết về ${messageText} của miền nào?`,
//           max_tokens: 1200,
//           temperature: 0.7,
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
//       const foodInfo = response.data.choices[0].text.trim();
//       const botMessage = {
//         _id: new Date().getTime() + 1,
//         text: foodInfo,
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
//       <StatusBar hidden={true} />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={require("../../assets/back-icon.png")}
//             style={{ width: 30, height: 30 }}
//           />
//         </TouchableOpacity>
//         <Text style={styles.textHeader}>ChatBot Ẩm Thực Việt Nam</Text>
//         <View style={{ flex: 1 }}></View>
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
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#0275d8",
//     borderBottomWidth: 1,
//     marginBottom: 5,
//   },
//   textHeader: {
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "bold",
//     color: "#fff",
//     marginLeft: 20,
//   },
// });
// =================================================================================================
// import React, { useState, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";

// const ChatBotScreen = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Xin chào! Tôi là chat bot của Chat GPT.",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Chat GPT",
//           avatar: "https://i.imgur.com/7k12EPD.png",
//         },
//       },
//     ]);
//   }, []);

//   const onSend = async (newMessages = []) => {
//     const message = newMessages[0];
//     setMessages(GiftedChat.append(messages, newMessages));

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci-codex/completions",
//         {
//           prompt: message.text,
//           max_tokens: 150,
//           n: 1,
//           stop: ["\n"],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               "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",
//           },
//         }
//       );

//       const botMessage = {
//         _id: Math.random().toString(36).substring(7),
//         text: response.data.choices[0].text.trim(),
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Chat GPT",
//           avatar: "https://i.imgur.com/7k12EPD.png",
//         },
//       };

//       setMessages(GiftedChat.append(messages, [botMessage]));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => onSend(newMessages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   );
// };

// export default ChatBotScreen;
// =================================================================

// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";
// import { StatusBar } from "react-native";

// export default function ChatBotScreen({ navigation }) {
//   const [messages, setMessages] = useState([]);
//   const [responseCache, setResponseCache] = useState({});

//   const YOUR_CHATGPT_API_KEY =
//     "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";

//   useEffect(() => {
//     const welcomeMessage = {
//       _id: 1,
//       text: "Xin chào! Tôi là Food Bot. Hãy hỏi tôi về món ăn, công thức, cách chế biến hoặc nguyên liệu hay bất cứ gì liên quan đến ẩm thực Việt Nam.",
//       createdAt: new Date(),
//       user: {
//         _id: 2,
//         name: "Food Bot",
//         avatar: "https://i.imgur.com/7k12EPD.png",
//       },
//     };

//     setMessages([welcomeMessage]);
//   }, []);

//   const handleSend = (newMessages = []) => {
//     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

//     const text = newMessages[0].text;

//     if (!responseCache[text]) {
//       axios
//         .post(
//           "https://api.openai.com/v1/engines/davinci/completions",
//           {
//             prompt: `Hãy viết một đoạn văn về ${text} trong ẩm thực Việt Nam.`,
//             max_tokens: 150,
//             n: 1,
//             stop: "\n",
//             temperature: 0.7,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           const botResponse = res.data.choices[0].text;

//           setResponseCache((prevCache) => ({
//             ...prevCache,
//             [text]: botResponse,
//           }));

//           const newBotMessage = {
//             _id: messages.length + 2,
//             text: botResponse,
//             createdAt: new Date(),
//             user: {
//               _id: 2,
//               name: "Food Bot",
//               avatar: "https://i.imgur.com/7k12EPD.png",
//             },
//           };

//           setMessages((prevMessages) =>
//             GiftedChat.append(prevMessages, [newBotMessage])
//           );
//         })
//         .catch((err) => console.error(err));
//     } else {
//       const cachedResponse = responseCache[text];

//       const newBotMessage = {
//         _id: messages.length + 2,
//         text: cachedResponse,
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Food Bot",
//           avatar: "https://i.imgur.com/7k12EPD.png",
//         },
//       };

//       setMessages((prevMessages) =>
//         GiftedChat.append(prevMessages, [newBotMessage])
//       );
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar barStyle="dark-content" />
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => handleSend(newMessages)}
//         user={{ _id: 1 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({});
// =========================================================================
// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";

// const YOUR_CHATGPT_API_KEY =
//   "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";

// export default function ChatBotScreen() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Xin chào! Tôi là ChatBot. Hãy hỏi tôi về bất cứ điều gì bạn muốn.",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "ChatBot",
//           avatar: "https://i.imgur.com/7k12EPD.png",
//         },
//       },
//     ]);
//   }, []);

//   const handleSend = async (newMessages = []) => {
//     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

//     const text = newMessages[0].text;

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci-codex/completions",
//         {
//           prompt: `Hãy viết một đoạn văn về ${text}.`,
//           max_tokens: 150,
//           n: 1,
//           stop: "\n",
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const botResponse = response.data.choices[0].text;

//       setMessages((prevMessages) =>
//         GiftedChat.append(prevMessages, [
//           {
//             _id: Math.random().toString(36).substring(7),
//             text: botResponse,
//             createdAt: new Date(),
//             user: {
//               _id: 2,
//               name: "ChatBot",
//               avatar: "https://i.imgur.com/7k12EPD.png",
//             },
//           },
//         ])
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Text style={styles.title}>ChatBot React Native</Text>
//       <GiftedChat
//         messages={messages}
//         onSend={handleSend}
//         user={{
//           _id: 1,
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 10,
//   },
// });
// =================================================================
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
// import { OpenAI } from "openai-api";
import { OpenAI } from "openai";

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 2 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hello, I'm ChatGPT! Ask me anything!",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "ChatGPT",
      },
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      _id: Math.random(),
      text: message[0].text,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "user",
      },
    };

    const newMessages = GiftedChat.append(messages, newMessage);

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const openai = new OpenAI(API_KEY);

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.user.name === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.text };
    });

    const apiRequestBody = {
      model: "davinci",
      prompt: [
        systemMessage.content,
        ...apiMessages.map((m) => m.content),
      ].join("\n"),
      temperature: 0.5,
      max_tokens: 60,
      stop: ["\n"],
    };

    await openai.complete(apiRequestBody).then((response) => {
      const answer = response.data.choices[0].text.trim();

      const chatGPTMessage = {
        _id: Math.random(),
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "ChatGPT",
        },
      };
      const updatedMessages = GiftedChat.append(newMessages, chatGPTMessage);

      setMessages(updatedMessages);
      setIsTyping(false);
    });
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: 1 }}
        isTyping={isTyping}
        placeholder="Type a message..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
