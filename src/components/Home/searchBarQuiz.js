import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import Lighting from "../../assets/images/Logo/lighting.svg";
import Searching from "../../assets/images/Home/search.svg";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function SearchBarQuiz() {
  const [keyword, setKeyword] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (!keyword.trim()) {
      Alert.alert("오류", "검색어를 입력해주세요.");
      return;
    }
    navigation.navigate("SearchQuizList", { keyword }); // 검색 결과 화면으로 이동
  };

  return (
    <View style={styles.searchBox}>
      <View style={styles.searchBoxTop}>
        <Lighting />
        <Text style={styles.searchBoxTitle}>바로 검색창</Text>
      </View>
      <View style={styles.searchBoxBottom}>
        <Searching />
        <TextInput
          style={styles.searchBoxContent}
          placeholder="검색을 통해 원하는 퀴즈를 한 번에 찾아보세요!"
          placeholderTextColor="#7495AE"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch} // Enter 시 검색
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    borderRadius: 20,
    padding: widthPercentage(3),
    marginBottom: widthPercentage(3),
  },
  searchBoxTop: {
    flex: 1,
    height: widthPercentage(6),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: widthPercentage(2),
  },
  searchBoxTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#268AFF",
  },
  searchBoxBottom: {
    flex: 1,
    height: widthPercentage(9),
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 8,
    alignItems: "center",
  },
  searchBoxContent: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7495AE",
  },
});
