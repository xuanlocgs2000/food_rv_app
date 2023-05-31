import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import SelectDropdown from "react-native-select-dropdown";
import handlePost from "../../firebase/operations/handlePost";
import { startUpdatingApp } from "../../redux/auth/appUpdateSlice";
import { Divider } from "@rneui/themed";

const PLACEHOLDERIMG =
  "https://www.shorekids.co.nz/wp-content/uploads/2014/08/ig-placeholder-500.jpg";

const uploadPostSchema = yup.object().shape({
  caption: yup
    .string()
    .max(2200, "Đã đạt giới hạn kí tự")
    .required("Hãy mô tả về món ăn của bạn nào!"),
});

const FormikPostUploader = ({ navigation, setLoading, loading }) => {
  const dispatch = useDispatch();
  const { owner_uid, username, email } = useSelector((state) => state.auth);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 10 * 2
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const foodTypes = [
    "truyền thống",
    "hải sản",
    "miền núi",
    "mới lạ",
    "đặc sản",
  ];
  const [selectedFoodType, setSelectedFoodType] = useState("");

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      dimensionsHandler.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const imageHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setPostImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error.imageHandler", error.message);
    }
  };

  const handleHashtagSelection = (hashtag) => {
    const index = selectedHashtags.indexOf(hashtag);
    if (index === -1) {
      // Chưa được chọn, thêm vào mảng
      setSelectedHashtags([...selectedHashtags, hashtag]);
    } else {
      // Đã được chọn, xóa khỏi mảng
      const updatedHashtags = [...selectedHashtags];
      updatedHashtags.splice(index, 1);
      setSelectedHashtags(updatedHashtags);
    }
  };

  const uploadPostToServer = async (caption) => {
    const makePost = async (caption, postImage, email, username, owner_uid) => {
      await handlePost(caption, postImage, email, username, owner_uid);
      dispatch(startUpdatingApp());
      Alert.alert("Thành công", "Đăng bài viết mới thành công");
    };
    try {
      makePost(caption, postImage, email, username, owner_uid);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={async (values) => {
          Keyboard.dismiss();
          if (loading) {
            return;
          }

          setLoading(true);

          const hashtags = selectedHashtags
            .map((hashtag) => `#${hashtag}`)
            .join(" ");
          values.caption = `${hashtags} ${selectedFoodType} ${values.caption}`;

          await uploadPostToServer(values.caption);
          setPostImage("");

          setLoading(false);
          navigation.goBack();
        }}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          isSubmitting,
        }) => (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={imageHandler}
              style={{ marginBottom: 10 }}
            >
              <Image
                source={{
                  uri: postImage ? postImage : PLACEHOLDERIMG,
                }}
                style={{
                  width: dimensions,
                  height: isKeyboardVisible ? dimensions - 100 : dimensions,
                  backgroundColor: "white",
                }}
              />
            </TouchableOpacity>

            <View style={{ padding: 10 }}>
              <SelectDropdown
                data={foodTypes}
                onSelect={(selectedItem) => setSelectedFoodType(selectedItem)}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => item}
                buttonStyle={{
                  backgroundColor: selectedFoodType ? "white" : "transparent",
                  marginBottom: 10,
                }}
                buttonTextStyle={{
                  color: selectedFoodType ? "black" : "#3498db",
                }}
                dropdownStyle={{ backgroundColor: "#fafafa" }}
                rowStyle={{ backgroundColor: "#ffffff" }}
                dropdownTextStyle={{ color: "#333333" }}
                rowTextStyle={{ color: "#333333" }}
                defaultButtonText="Chọn loại món ăn"
              />
              {/* /> */}
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleHashtagSelection("miền bắc")}
                  style={{
                    backgroundColor: selectedHashtags.includes("miền bắc")
                      ? "#e74c3c"
                      : "transparent",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: selectedHashtags.includes("miền bắc")
                        ? "white"
                        : "#e74c3c",
                    }}
                  >
                    #miền bắc
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleHashtagSelection("miền trung")}
                  style={{
                    backgroundColor: selectedHashtags.includes("miền trung")
                      ? "#e74c3c"
                      : "transparent",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: selectedHashtags.includes("miền trung")
                        ? "white"
                        : "#2ecc71",
                    }}
                  >
                    #miền trung
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleHashtagSelection("miền nam")}
                  style={{
                    backgroundColor: selectedHashtags.includes("miền nam")
                      ? "#e74c3c"
                      : "transparent",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: selectedHashtags.includes("miền nam")
                        ? "white"
                        : "#9b59b6",
                    }}
                  >
                    #miền nam
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={{
                  color: "#3498db",
                  height: 100,
                  borderColor: "gray",
                  borderWidth: 1,
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                placeholder="Caption"
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
                multiline={true}
              />
              {errors.caption && (
                <Text style={{ color: "#3498db" }}>{errors.caption}</Text>
              )}
            </View>

            <Divider />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleSubmit}
              style={{
                backgroundColor: !isValid ? "gray" : "#3498db",
                paddingVertical: 10,
                alignItems: "center",
                marginTop: 10,
              }}
              disabled={!isValid}
            >
              <Text style={{ color: "white" }}>Đăng bài</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default FormikPostUploader;
