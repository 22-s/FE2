import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import Star from "../../assets/images/Word/별.svg";
import Toggle from "../../components/Word/Toggle";
import axiosInstance from "../../api/axiosInstance";

const WordLikeList = () => {
  const [terms, setTerms] = useState([]); // API 데이터 저장
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/voca/likes`);

      if (response.data.isSuccess) {
        const processedTerms = response.data.result.map((term) => ({
          ...term,
          favorited: true, // favorited 필드 추가
        }));
        setTerms(processedTerms); // 데이터 저장
        console.log(processedTerms);
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
    fetchQuizzes();
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
            <Text style={styles.top}>저장하고 바로 보는</Text>
            <Text style={styles.down}>즐겨찾기</Text>
          </View>
          <Star width={75} height={75} />
        </View>
        {terms.map((term) => (
          <Toggle
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

export default WordLikeList;
