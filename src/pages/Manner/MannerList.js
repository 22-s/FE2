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
import SearchBar from "../../components/Home/searchBar";
import { get } from "../../api/request";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function MannerList() {
  const navigation = useNavigation(); // navigation 훅 사용
  const [data, setData] = useState([]); // API 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  const fetchVocaData = async (category) => {
    try {
      setLoading(true);
      const response = await get(`/manners?category=${category}`);
      if (response.isSuccess) {
        //api 응답 데이터 저장
        setData(response.result);
      }
    } catch (error) {
      console.error(
        "매너설명서 카테고리 리스트를 가져오는 중 오류 발생:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocaData("기본 매너"); // 원하는 카테고리로 요청
  }, []);

  if (loading) {
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
        {data.map((item, index) => (
          <TouchableOpacity key={index}>
            <MannerListBox
              category={item.category}
              title={item.title}
              contentPreview={item.contentPreview}
              imageUrl={item.imageUrl}
            />
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
