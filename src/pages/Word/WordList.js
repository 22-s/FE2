import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";

import Accounting from "../../assets/images/Home/accounting.svg";
import IT from "../../assets/images/Home/it.svg";
import Marketing from "../../assets/images/Home/marketing.svg";
import HR from "../../assets/images/Home/hr.svg";
import Captin from "../../assets/images/Home/captain.svg";
import Nego from "../../assets/images/Home/negotiate.svg";

import Toggle from "../../components/Word/Toggle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const WordList = ({ route }) => {
  const { category, title, subtitle } = route.params;
  const [terms, setTerms] = useState([]); // API 데이터 저장
  const [loading, setLoading] = useState(true);

  // category와 SVG 컴포넌트 매핑
  const svgMapping = {
    회계재무: Accounting,
    기술IT: IT,
    마케팅세일즈: Marketing,
    HR조직: HR,
    리더십팀워크: Captin,
    협상의사결정: Nego,
  };

  const SelectedSVG = svgMapping[category]; // 매핑에서 선택된 SVG 컴포넌트

  const fetchQuizzes = async (category) => {
    // const token = await AsyncStorage.getItem("accessToken");
    // const headers = {
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    //   ...(token && { Authorization: `Bearer ${token}` }),
    // };

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/voca?category=${category}`
      );

      if (response.data.isSuccess) {
        setTerms(response.data.result); // 데이터 저장
        console.log(response.data.result);
      } else {
        console.error("데이터를 가져오지 못했습니다:", response.data.message);
        Alert.alert("오류", response.data.message);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      Alert.alert("오류", "데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(category);
  }, []);

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
        <View style={styles.title}>
          <View style={styles.left}>
            <Text style={styles.top}>{title}</Text>
            <Text style={styles.down}>{subtitle}</Text>
          </View>
          {/* 선택된 SVG 컴포넌트를 렌더링 */}
          {SelectedSVG && <SelectedSVG width={80} height={80} />}
        </View>
        {terms.map((term) => (
          <Toggle
            key={term.vocaId}
            vocaId={term.vocaId}
            term={term.term}
            description={term.description}
            example={term.example}
            favorited={term.favorited}
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
});

export default WordList;
