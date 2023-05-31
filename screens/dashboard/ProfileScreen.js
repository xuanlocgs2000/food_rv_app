import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import getPostsByEmail from "../../firebase/operations/getPostsByEmail";
import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";
import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Post from "../../components/shared/Post";
import PostsSkeleton from "../../components/shared/skeletons/PostsSkeleton";
import UserInfo from "../../components/profileScreen/UserInfo";
import UserInfoEditor from "../../components/profileScreen/UserInfoEditor";
import deletePost from "../../firebase/operations/handleDeletePost";
import MyPostsEmptyPlaceHolder from "../../components/profileScreen/MyPostsEmptyPlaceHolder";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    email,
    username,
    profile_picture,
    favorite,
    user_about,
    subscribe_list,
  } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);

  const [refreshing, setRefreshing] = useState(false);
  const [editorMode, setEditorMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  useEffect(() => {
    setFavorites(favorite);
  }, [favorite]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostsByEmail(email);
      setIsLoading(false);
      setPosts(posts);
    };

    try {
      setIsLoading(true);
      fetchPosts();
    } catch (error) {
      console.log(`fetchPosts.error`, error.message);
    } finally {
      if (status === true) {
        dispatch(stopUpdatingApp());
      }
    }
  }, [status === true]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(startUpdatingApp());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleButtonClick = (postId, postEmail) => {
    console.log("Post ID:", postId);
    console.log("Post Email:", postEmail);
  };

  const onHandleDeletePost = async (postId, email) => {
    try {
      Alert.alert(
        "Xác nhận xoá",
        "Bạn có chắc chắn muốn xoá bài viết này không?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xoá",
            onPress: async () => {
              await deletePost(postId, email);
              console.log("Bài viết đã được xoá thành công.", postId);
              // Cập nhật lại danh sách bài viết sau khi xoá thành công
              const updatedPosts = posts.filter(
                (post) => post.postId !== postId
              );
              setPosts(updatedPosts);
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      console.log("Lỗi khi xoá bài viết:", error.message);
    }
  };

  const renderDeleteButton = (postId, postEmail) => (
    <TouchableOpacity
      onPress={() => onHandleDeletePost(postId, postEmail)}
      style={{
        backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 8,
        alignSelf: "flex-end",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Xoá</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      {!editorMode ? (
        <UserInfo
          setEditorMode={setEditorMode}
          username={username}
          email={email}
          postLength={posts.length}
          profile_picture={profile_picture}
          favorites={favorites}
          user_about={user_about}
          subscribe_list={subscribe_list}
          navigation={navigation}
        />
      ) : (
        <UserInfoEditor
          setEditorMode={setEditorMode}
          username={username}
          email={email}
          postLength={posts.length}
          profile_picture={profile_picture}
          favorites={favorites}
          user_about={user_about}
          subscribe_list={subscribe_list}
          navigation={navigation}
        />
      )}
      {isLoading && <PostsSkeleton />}
      {!isLoading && posts.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {posts
            .sort((a, b) => a.created < b.created)
            .map((post) => (
              <React.Fragment key={post.postId}>
                <Post
                  post={post}
                  navigation={navigation}
                  favoriteData={favorites}
                  setFavorites={setFavorites}
                />
                {renderDeleteButton(post.postId, post.email)}
              </React.Fragment>
            ))}
        </ScrollView>
      )}
      {posts.length <= 0 && !isLoading && <MyPostsEmptyPlaceHolder />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
