![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with reactnative](https://img.shields.io/badge/Runs%20with%20ReactNative-000.svg?style=flat-square&logo=React&labelColor=f3f3f3&logoColor=61DAFB)](https://reactnative.dev/)
[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)
[![runs with firebase](https://img.shields.io/badge/Runs%20with%20Firebase-000.svg?style=flat-square&logo=Firebase&labelColor=f3f3f3&logoColor=FFCB2D)](https://firebase.google.com/)
[![runs with redux](https://img.shields.io/badge/Runs%20with%20Redux-000.svg?style=flat-square&logo=Redux&labelColor=f3f3f3&logoColor=7247B5)](https://redux.js.org/)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/xuanlocgs2000/food_rv_app">
    <img src="./assets/logo.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Food review app </h3>

#### Các chức năng về tài khoản: 
   -Đăng nhập, đăng kí.  
   -Quên mật khẩu(gửi qua email sử dụng Google firebase).  
#### Các chức năng về ứng dụng: đăng bài viết:
   -Bình phẩm yêu thích bài viết(món ăn).  
   -Tìm kiếm.  
   -Danh sách yêu thích(loadding...).  
   -Theo dõi người dùng, chỉnh sửa profile.  
 

</p>

<!-- ABOUT THE PROJECT -->

Link video demo :[![Demo Video](https://i.ibb.co/K0MknQj/Untitled-2-04.png)](https://vimeo.com/832278523/1acdbb1cad)

**Hướng dẫn cài đặt và triển khai hệ thống                  CHƯƠNG 1. Môi trường phát triển ứng dụng(Development)** 

1. **Phần mềm và cấu hình cần thiết** 

*Bước 1: Cài đặt Visual Studio Code* 

Tải  xuống  và  cài  đặt  Visual  Studio  Code  từ  trang  web  chính  thức: [https://code.visualstudio.com/ ](https://code.visualstudio.com/)

Mở Visual Studio Code và cài đặt các tiện ích mở rộng cho React Native nếu cần thiết. 

*Bước 2: Cài đặt Android Studio và Android SDK* 

Tải  xuống  và  cài  đặt  Android  Studio  từ  trang  web  chính  thức: [https://developer.android.com/studio ](https://developer.android.com/studio)

Android Studio đi kèm với Android SDK (Software Development Kit) cần thiết để phát triển ứng dụng React Native cho Android. 

Mở Android Studio và cài đặt Android SDK theo các bước hướng dẫn trong quá trình cài đặt, chọn "Standard" hoặc "Custom" installation và đảm bảo rằng Android SDK được cài đặt. 

Cài đặt máy ảo android với cấu hình android 8.0 trở lên. 

*Bước 3: Cấu hình môi trường React Native* 

Mở terminal hoặc command prompt và chạy các lệnh sau để cài đặt Expo 

CLI: 

              ```npm install -g expo-cli```

2. **Cài đặt và khởi chạy ứng dụng** 
2.1. ***Source code và các package:*** 

Trong terminal, tiến hành clone source code :  

            ```git clone https://github.com/xuanlocgs2000/food_rv_app```

Di chuyển tới source code : 

            ```cd food_rv_app```

Cài đặt các gói cần thiết bằng yarn hoặc npm, ở đây ứng dụng sử dụng yarn. Cài đặt yarn: 

             ```yarn install ```

2. ***Cấu hình các biến môi trường*** 
1. *ChatGPT API key* 

` `Để chatbot AI hoạt động thì cần có API keys, bạn phải có tài khoản chatGPT, truy cập[ https://platform.openai.com/account/api-keys ](https://platform.openai.com/account/api-keys)để lấy API key.  

Di chuyển vào thư mục root dự án, tạo file .env và dán API key của bạn vào bằng đoạn code sau:  

              ```API\_KEY= YOUR API KEY ```

2. *Thiết lập Firebase*  

Thiết lập Firebase được cấu hình trong file food\_rv\_app\firebase\firebase.js. 

3. ***Khởi chạy ứng dụng*** 
1. Chạy câu lệnh *yarn start* hoặc *npm start* để khởi chạy ứng dụng. 
1. Sử dụng máy ảo với yarn android.

**CHƯƠNG 2. Môi trường sản phẩm ứng dụng - cài đặt nhanh (Quick Installation)** 

1. **Android (Version 8.0 trở lên)** 
1. Chạy bằng Expo Go app  

   Tải và cài đặt Expo Go trên Google play, mở app và quét mã QR sau để chạy ứng dụng:  

![](Aspose.Words.6553e9ab-d63f-4050-8381-3fe829e61e04.006.png)

2. Cài đặt file Apk[ tại đây.](https://github.com/xuanlocgs2000/food_rv_app) 
2. **IOS** 

Sử dụng camera scan của iPhone quét mã QR code bên trên để khởi chạy ứng dụng. 
3 


- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)

<!-- CONTRIBUTING -->

## 🚧 How to try?

- For iphone instal [expo go ](https://apps.apple.com/us/app/expo-go/id982107779).
- For android instal [expo go ](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=ru&gl=US&pli=1).
- Then try it at [expo app store ](https://expo.dev/@solik/insta-clone).
