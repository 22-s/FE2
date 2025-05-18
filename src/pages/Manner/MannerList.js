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
import MannerListBox from "../../components/Manner/MannerListBox";
import MannerSearchBar from "../../components/Home/MannerSearchBar";
import axiosInstance from "../../api/axiosInstance";

export default function MannerList({ route }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category, searchText: routeSearchText } = route.params || {};
  const [searchText, setSearchText] = useState(routeSearchText || "");

  useEffect(() => {}, [routeSearchText, searchText]);

  const fetchMannerListData = async () => {
    try {
      setLoading(true);
      let response;
      setData([]);
      console.log("카테고리:", category);

      const categoryInt = category ? parseInt(category, 10) : null;

      // 1. 카테고리 내 검색 결과 조회
      if (categoryInt && searchText) {
        response = await axiosInstance.get(
          `/api/manners/search/category?category=${categoryInt}&keyword=${searchText}`
        );
      }
      // 2. 카테고리별 매너 설명서 리스트 조회
      else if (category) {
        console.log(category);
        response = await axiosInstance.get(`/api/manners?category=${category}`);
      }
      // 3. 전체 검색 결과 조회
      else if (searchText) {
        response = await axiosInstance.get(
          `/api/manners/search?keyword=${searchText}`
        );
      }
      // 4. 둘 다 없을 때
      else {
        console.log("카테고리와 검색어가 모두 제공되지 않았습니다.");
        return;
      }

      console.log("API 응답 데이터:", response);

      if (response.data && response.data.isSuccess) {
        if (response.data.result.length === 0) {
          Alert.alert("검색 결과가 없습니다. 다시 시도해주세요.");
        }
        setData(response.data.result);
      } else {
        console.error(
          "API 호출 실패:",
          response?.data?.message || "응답 데이터 없음"
        );
      }
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

  useEffect(() => {
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
