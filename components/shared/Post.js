import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import getCommentsOnly from "../../firebase/operations/getCommentsOnly";
import getLikes from "../../firebase/operations/getLikes";

import { authSlice } from "../../redux/auth/authReducer";
import { handleLike, handleFavorite } from "../../firebase/operations";

import { Divider } from "@rneui/themed";
import { postFooterIcons } from "../../data/postFooterIcons";
// import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
const Post = ({ post, navigation, favoriteData, route }) => {
  const {
    profile_picture,
    email,
    user,
    postImage,
    caption,
    postIdTemp,
    liked_users,
  } = post;

  const isFocused = useIsFocused();

  const currenUser = useSelector((state) => state.auth.owner_uid);
  const currentUserId = useSelector((state) => state.auth.email);

  const [likes, setLikes] = useState(liked_users.length > 0 ? liked_users : []);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async (email, postIdTemp) => {
      const newComments = await getCommentsOnly(email, postIdTemp);
      if (newComments.length !== comments.length) {
        setComments(newComments);
      }
    };
    try {
      fetchComments(email, postIdTemp);
    } catch (error) {
      console.log(`fetchComments.error`, error.message);
    }
  }, [post, favoriteData, isFocused]);

  return (
    <View style={styles.postContainer}>
      <Divider width={1} orientation="vertical" />
      <PostHeader
        profile_picture={profile_picture}
        user={user}
        navigation={navigation}
        userEmail={email}
      />
      <PostImage postImage={postImage} />
      <View style={{ marginHorizontal: 15 }}>
        <PostFooter
          currenUser={currenUser}
          navigation={navigation}
          post={post}
          comments={comments}
          setLikes={setLikes}
          likes={likes}
          favorites={favoriteData}
          currentUserId={currentUserId}
        />
        <Likes likes={likes} />
        <Caption user={user} caption={caption} />
        <CommentSection
          comments={comments}
          navigation={navigation}
          post={post}
        />
        <Comments comments={comments} />
      </View>
    </View>
  );
};

const PostHeader = ({ profile_picture, user, navigation, userEmail }) => {
  const [loading, setLoading] = useState(false);

  const openNewUserScreen = (userEmail) => {
    setLoading(true);
    navigation.push("UserScreen", { userEmail });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Handle logic based on selected option here
    // For example, perform an action or navigate to a new screen
  };
  return (
    <View style={styles.postHeaderContainer}>
      <TouchableOpacity
        style={styles.postHeaderLink}
        onPress={() => openNewUserScreen(userEmail)}
        disabled={loading}
      >
        <Image source={{ uri: profile_picture }} style={styles.postHeaderImg} />
        <Text style={styles.postHeaderText}>{user?.toLowerCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
        <Text style={{ color: "white", fontWeight: "900" }}>Tuỳ chọn</Text>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <DropDownPicker
            items={options}
            defaultValue={selectedOption}
            containerStyle={{ height: 40, width: 150 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex-start" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => handleOptionSelect(item.value)}
          />

          <TouchableOpacity onPress={() => setShowOptions(false)}>
            <Text style={{ color: "blue", marginVertical: 10 }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const PostImage = ({ postImage }) => {
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setdimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  return (
    <View style={{ width: dimensions, height: dimensions, marginBottom: 10 }}>
      <Image source={{ uri: postImage }} style={styles.postImage} />
    </View>
  );
};

const PostFooter = ({
  post,
  currenUser,
  navigation,
  comments,
  setLikes,
  likes,
  favorites,
  currentUserId,
}) => {
  const { postIdTemp, email, postId } = post;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      const fetchLikes = async (email, postIdTemp) => {
        const lastFetchedLikes = await getLikes(email, postIdTemp);
        if (lastFetchedLikes.length !== likes.length) {
          setLikes(lastFetchedLikes);
        }
      };
      try {
        fetchLikes(post.email, post.postIdTemp);
      } catch (error) {
        console.log(`fetchLikes.error`, error.message);
      }
    }
  }, [isFocused]);

  const openNewCommentScreen = (comments, post) => {
    setLoading(true);
    navigation.push("NewCommentScreen", { comments, post });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={{ flexDirection: "row", marginBottom: 5 }}>
      <View style={styles.postFooterLeftContainer}>
        <TouchableOpacity
          style={{ height: 25, width: 25 }}
          onPress={async () => {
            const updatedLikes = await handleLike(
              currenUser,
              postIdTemp,
              email,
              currentUserId
            );
            setLikes(updatedLikes);
          }}
        >
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={
              !likes.includes(currenUser)
                ? postFooterIcons[0].image
                : postFooterIcons[0].imageActive
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 25, width: 25 }}
          onPress={() => openNewCommentScreen(comments, post)}
          disabled={loading}
        >
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={postFooterIcons[1].image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 25, width: 25 }}>
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={postFooterIcons[2].image}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.postFooterRightContainer}>
        <TouchableOpacity
          style={{ height: 25, width: 25 }}
          onPress={async () => {
            const { updateUserInfo } = authSlice.actions;
            const updatedFavorites = await handleFavorite(
              postId,
              currentUserId
            );
            dispatch(updateUserInfo({ favorite: updatedFavorites }));
          }}
        >
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={
              !favorites.includes(postId)
                ? postFooterIcons[3].image
                : postFooterIcons[3].imageActive
            }
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const Icon = ({ imgStyle, imgUrl }) => (
  <View style={{ marginRight: 5 }}>
    <Image style={imgStyle} source={imgUrl} />
  </View>
);

const Likes = ({ likes }) => (
  <Text style={{ color: "white", marginBottom: 5 }}>
    {likes.length.toLocaleString("en")} likes
  </Text>
);

const Caption = ({ user, caption }) => (
  <Text style={{ color: "white" }}>
    <Text style={{ fontWeight: "600" }}>{user}:</Text>
    <Text> {caption}</Text>
  </Text>
);

const CommentSection = ({ navigation, comments, post }) => {
  return (
    <>
      {!!comments.length && (
        <TouchableOpacity
          onPress={() =>
            navigation.push("NewCommentScreen", { comments, post })
          }
        >
          <Text style={{ color: "grey" }}>
            View{comments.length > 1 ? " all" : ""} {comments.length}{" "}
            {comments.length > 1 ? "comments" : "comment"}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};
const Comments = ({ comments }) => {
  return (
    <>
      {comments
        .sort((a, b) => a.created < b.created)
        .map(({ user, commentId, comment }, index) => {
          if (index > 0) {
            return;
          }
          return (
            <View
              key={commentId}
              style={{ flexDirection: "row", marginBottom: 2 }}
            >
              <Text style={{ color: "white" }}>
                <Text style={{ fontWeight: "600" }}>{user}:</Text>
                <Text style={{ color: "whitesmoke" }}> {comment} </Text>
              </Text>
            </View>
          );
        })}
    </>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 30,
  },

  postHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  postHeaderLink: { flexDirection: "row", alignItems: "center" },

  postHeaderImg: {
    marginRight: 5,
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#ff8501",
  },

  postHeaderText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "700",
  },

  postImage: {
    height: "100%",
    resizeMode: "cover",
  },

  postFooterLeftContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
  postFooterRightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  postFooterIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});

export default memo(Post);
