import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MannerListBox from "../../components/Manner/MannerListBox";
import MannerSearchBar from "../../components/Home/MannerSearchBar";
import { get } from "../../api/request";
import axiosInstance from "../../api/axiosInstance";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ReviewMannerList() {
  const navigation = useNavigation();
  const [reviewMannerList, setReviewMannerList] = useState([]); // API 데이터를 저장
  const [loading, setLoading] = useState(true);

  const fetchReviewMannerData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/manners/likes`);
      if (response.data.isSuccess) {
        // 데이터에 favorited: true 추가
        console.log("response.data.result", response.data.result);
        const processedManners = response.data.result.map((manner) => ({
          ...manner,
          favorited: true, // favorited 필드 추가
        }));
        setReviewMannerList(processedManners);
      } else {
        console.error("데이터를 가져오지 못했습니다:", response.data.message);
        setReviewMannerList([]);
      }
    } catch (error) {
      console.error("매너설명서 복습 리스트를 가져오는 중 오류 발생:", error);
      setReviewMannerList([]);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //     return (
  //       <View style={styles.loadingContainer}>
  //         <ActivityIndicator size="large" color="#268AFF" />
  //       </View>
  //     );
  //   }

  const handleSearch = (searchText) => {
    navigation.navigate("MannerList", { searchText });
  };

  useEffect(() => {
    console.log("useEffect 실행됨!");
    fetchReviewMannerData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#268AFF" />
      </View>
    );
  }

  if (reviewMannerList.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>매너설명서 데이터가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listArea}>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <MannerSearchBar onSearch={handleSearch} />
        </View>
        {reviewMannerList.map((item, index) => (
          <TouchableOpacity key={index}>
            <MannerListBox item={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listArea: {
    paddingLeft: 7,
    paddingRight: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
