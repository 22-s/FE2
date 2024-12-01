import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MannerListBox from "../../components/Manner/MannerListBox";
import SearchBar from "../../components/Home/searchBarQuiz";
import MannerSearchBar from "../../components/Home/MannerSearchBar";
import { get } from "../../api/request";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function MannerList({ route }) {
  const navigation = useNavigation(); // navigation 훅 사용
  const [data, setData] = useState([]); // API 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const { category, searchText: routeSearchText } = route.params || {};
  const [searchText, setSearchText] = useState(routeSearchText || "");

  useEffect(() => {}, [routeSearchText, searchText]);

  const fetchMannerListData = async () => {
    //데이터 로드 함수
    try {
      setLoading(true);
      let response;
      setData([]);

      // 1. 카테고리 내 검색 결과 조회
      if (category && searchText) {
        response = await get(
          `/manners/search/category?category=${category}&keyword=${searchText}`
        );
      }
      // 2. 카테고리별 매너 설명서 리스트 조회
      else if (category) {
        response = await get(`/manners?category=${category}`);
      }
      // 3. 전체 검색 결과 조회
      else if (searchText) {
        response = await get(`/manners/search?keyword=${searchText}`);
      }
      // 4. 둘 다 없을 때
      else {
        console.log("카테고리와 검색어가 모두 제공되지 않았습니다.");
        return;
      }

      if (response.isSuccess) {
        if (response.result.length === 0) {
          Alert.alert("검색 결과가 없습니다. 다시 시도해주세요.");
        }
        setData(response.result);
      } else {
        console.error("API 호출 실패:", response?.message);
      }
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newSearchText) => {
    //검색 결과 처리
    setSearchText(newSearchText);
  };

  useEffect(() => {
    //초기 카테고리 데이터 로드
    fetchMannerListData();
  }, [category, searchText]);

  useFocusEffect(
    React.useCallback(() => {
      fetchMannerListData(); 
    }, [])
  );

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
          <MannerSearchBar category={category} onSearch={handleSearch} />
        </View>
        {data.map((item, index) => (
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
