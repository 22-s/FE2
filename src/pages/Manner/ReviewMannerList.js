import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MannerListBox from "../../components/Manner/MannerListBox";
import SearchBar from "../../components/Home/searchBarQuiz";
import { get } from "../../api/request";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ReviewMannerList() {
  const navigation = useNavigation();
  const [reviewMannerList, setReviewMannerList] = useState([]); // API 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리


  const fetchReviewMannerData = async () => {
    try {
      setLoading(true);
      const response = await get(`/manners/likes`);
      if (response.isSuccess) {
        // 데이터에 favorited: true 추가
        const processedManners = response.result.map((manner) => ({
          ...manner,
          favorited: true, // favorited 필드 추가
        }));
        setReviewMannerList(processedManners);
      }
    } catch (error) {
      console.error("매너설명서 복습 리스트를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchReviewMannerData(); // 원하는 카테고리로 요청
  }, []);

  if (loading) {
    //로딩 Logic
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#268AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listArea}>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <SearchBar />
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
