import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import Toggle from "../../components/Word/Toggle";
import WordSearchBar from "../../components/Home/WordSearchBar";
import { get } from "../../api/request";
import axiosInstance from "../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";

const WordSearchList = ({ route }) => {
  const navigation = useNavigation();
  const { searchText: routeSearchText } = route.params || {};
  const [searchText, setSearchText] = useState(routeSearchText || "");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords(searchText);
  }, [searchText]);

  const fetchWords = async (param) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/voca/search?keyword=${param}`);
  
      const { isSuccess, result } = response.data;
  
      if (isSuccess) {
        setWords(result);
        if (result.length === 0) {
          Alert.alert("검색 결과가 없습니다.", "이전 화면으로 돌아갑니다.");
          navigation.goBack();
        }
      } else {
        Alert.alert("검색 결과가 없습니다.", "이전 화면으로 돌아갑니다.");
        navigation.goBack();
      }
  
      console.log("📦 검색 결과:", result);
    } catch (error) {
      console.error("❗ 오류:", error);
      if (error.response && error.response.status === 404) {
        Alert.alert("검색 결과가 없습니다.", "이전 화면으로 돌아갑니다.");
        navigation.goBack();
      } else {
        Alert.alert("오류 발생", "단어 데이터를 불러오는 중 문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = (newSearchText) => {
    //검색 결과 처리
    setSearchText(newSearchText);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>데이터를 불러오는 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBarContainer}>
          <WordSearchBar onSearch={handleSearch} />
        </View>
        {words.map((word) => (
          <Toggle
            key={word.vocaId}
            vocaId={word.vocaId}
            term={word.term}
            description={word.description}
            example={word.example}
            favorited={word.favorited}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: 20,
    alignSelf: "center",
    width: "80%",
    borderRadius: 24,
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  left: {
    marginRight: 30,
  },
  top: {
    color: "#303437",
    fontSize: 16,
    fontWeight: "600",
  },
  down: {
    color: "#000",
    fontSize: 22,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchBarContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
});

export default WordSearchList;
