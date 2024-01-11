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
   đăng nhập, đăng kí ,
   quên mật khẩu(gửi qua email sử dụng Google firebase)
   #### Các chức năng về ứng dụng: đăng bài viết:
   bình phẩm yêu thích bài viết(món ăn)
   tìm kiếm
   danh sách yêu thích(loadding...)
   theo dõi người dùng, chỉnh sửa profile.
 

</p>

<!-- ABOUT THE PROJECT -->

Link video demo :[![Demo Video](https://i.ibb.co/K0MknQj/Untitled-2-04.png)](https://vimeo.com/832278523/1acdbb1cad)

## 🆕 Getting Started

- ### **Prerequisites**
- # Hướng dẫn Cài đặt và Triển khai Hệ thống

## CHƯƠNG 1: Môi trường Phát triển Ứng dụng (Development)

### 1.1 Phần mềm và Cấu hình Cần Thiết

#### Bước 1: Cài đặt Visual Studio Code

1. Tải xuống và cài đặt [Visual Studio Code](https://code.visualstudio.com/) từ trang web chính thức.
2. Mở Visual Studio Code và cài đặt các tiện ích mở rộng cho React Native nếu cần thiết.

#### Bước 2: Cài đặt Android Studio và Android SDK

1. Tải xuống và cài đặt [Android Studio](https://developer.android.com/studio) từ trang web chính thức.
2. Android Studio đi kèm với Android SDK cần thiết để phát triển ứng dụng React Native cho Android.
3. Mở Android Studio và cài đặt Android SDK theo hướng dẫn trong quá trình cài đặt, chọn "Standard" hoặc "Custom" installation và đảm bảo rằng Android SDK được cài đặt.
4. Cài đặt máy ảo Android với cấu hình Android 8.0 trở lên.

#### Bước 3: Cấu hình Môi trường React Native

Mở terminal hoặc command prompt và chạy các lệnh sau để cài đặt Expo CLI:

```bash
npm install -g expo-cli


# Hướng dẫn Cài đặt và Triển khai Hệ thống

## CHƯƠNG 1: Môi trường Phát triển Ứng dụng (Development)

### 1.1 Phần mềm và Cấu hình Cần Thiết

#### Bước 1: Cài đặt Visual Studio Code

1. Tải xuống và cài đặt [Visual Studio Code](https://code.visualstudio.com/) từ trang web chính thức.
2. Mở Visual Studio Code và cài đặt các tiện ích mở rộng cho React Native nếu cần thiết.

#### Bước 2: Cài đặt Android Studio và Android SDK

1. Tải xuống và cài đặt [Android Studio](https://developer.android.com/studio) từ trang web chính thức.
2. Android Studio đi kèm với Android SDK cần thiết để phát triển ứng dụng React Native cho Android.
3. Mở Android Studio và cài đặt Android SDK theo hướng dẫn trong quá trình cài đặt, chọn "Standard" hoặc "Custom" installation và đảm bảo rằng Android SDK được cài đặt.
4. Cài đặt máy ảo Android với cấu hình Android 8.0 trở lên.

#### Bước 3: Cấu hình Môi trường React Native

Mở terminal hoặc command prompt và chạy các lệnh sau để cài đặt Expo CLI:

```bash
npm install -g expo-cli
1.2 Cài đặt và Khởi chạy Ứng dụng
1.2.1 Source code và Các package
Trong terminal, tiến hành clone source code:
bash
Copy code
git clone https://github.com/xuanlocgs2000/food_rv_app
Di chuyển tới thư mục source code:
bash
Copy code
cd food_rv_app
Cài đặt các gói cần thiết bằng yarn hoặc npm:
bash
Copy code
yarn install
1.2.2 Cấu hình Các Biến Môi Trường
1.2.2.1 ChatGPT API key
Để chatbot AI hoạt động, bạn cần API keys từ ChatGPT. Di chuyển vào thư mục root dự án, tạo file .env và dán API key của bạn vào bằng đoạn code sau:

env
Copy code
API_KEY=YOUR_API_KEY
1.2.2.2 Thiết lập Firebase
Thiết lập Firebase được cấu hình trong file food_rv_app\firebase\firebase.js.

1.2.3 Khởi chạy Ứng dụng
Chạy lệnh:
bash
Copy code
yarn start
hoặc

bash
Copy code
npm start
Sử dụng máy ảo với:
bash
Copy code
yarn android
CHƯƠNG 2: Môi trường Sản phẩm Ứng dụng - Cài đặt Nhanh (Quick Installation)
2.1 Android (Version 8.0 trở lên)
Chạy bằng Expo Go app: Tải và cài đặt Expo Go trên Google Play, mở app và quét mã QR sau để chạy ứng dụng.
Cài đặt file Apk tại đây.
2.2 IOS
Sử dụng camera scan của iPhone quét mã QR code bên trên để khởi chạy ứng dụng.

css
Copy code

Hãy chắc chắn thay thế phần `[link_to_apk]` bằng liên kết cụ thể đến file APK 

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)

<!-- CONTRIBUTING -->

## 🚧 How to try?

- For iphone instal [expo go ](https://apps.apple.com/us/app/expo-go/id982107779).
- For android instal [expo go ](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=ru&gl=US&pli=1).
- Then try it at [expo app store ](https://expo.dev/@solik/insta-clone).
