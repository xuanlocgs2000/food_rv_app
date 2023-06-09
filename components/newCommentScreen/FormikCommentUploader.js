import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { Formik } from "formik";
import * as yup from "yup";

import handleComment from "../../firebase/operations/handleComment";

import { Divider } from "@rneui/themed";

const uploadCommentSchema = yup.object().shape({
  message: yup
    .string()
    .trim()
    .max(2200, "Message has reached the character limits")
    .required(),
});

const FormikCommentUploader = ({
  userIdTemp,
  postIdTemp,
  setComments,
  keyboardHide,
}) => {
  const { owner_uid, profile_picture, username, email } = useSelector(
    (state) => state.auth
  );
  const makeComment = async (
    userId,
    postId,
    comment,
    owner_uid,
    profile_picture,
    username,
    email
  ) => {
    const newComment = await handleComment(
      userId,
      postId,
      comment,
      owner_uid,
      profile_picture,
      username,
      email
    );
    setComments((prevState) => [...prevState, newComment]);
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={async (values, actions) => {
        const { message } = values;
        try {
          await makeComment(
            userIdTemp,
            postIdTemp,
            message,
            owner_uid,
            profile_picture,
            username,
            email
          );
          actions.setSubmitting(false);
          actions.resetForm();
          keyboardHide();
        } catch (error) {
          console.log(`makeComment.error`, error.message);
        }
      }}
      validationSchema={uploadCommentSchema}
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
        <View
          style={{
            position: "absolute",
            padding: 5,
            bottom: 0,
            width: "100%",
            height: 50,
          }}
        >
          <Divider width={1} orientation="vertical" />
          <TextInput
            placeholder="Bình phẩm"
            placeholderTextColor="gray"
            style={{
              color: "white",
              fontSize: 16,
              paddingLeft: 12,
              paddingRight: 70,
              paddingTop: 6,
            }}
            multiline={true}
            onChangeText={handleChange("message")}
            onBlur={handleBlur("message")}
            value={values.message}
          />

          <TouchableOpacity
            disabled={!isValid && isSubmitting}
            style={{
              width: 80,
              height: 30,
              backgroundColor: isValid && !isSubmitting ? "#2980b9" : "#CCCCCC",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 10,
              top: 10,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
              }}
            >
              Đăng
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default FormikCommentUploader;
