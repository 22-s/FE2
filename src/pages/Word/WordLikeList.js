import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import Pic from "../../assets/images/Word/회계재무.svg";
import Toggle from "../../components/Word/Toggle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const WordLikeList = () => {
  const [terms, setTerms] = useState([]); // API 데이터 저장
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      setLoading(true);
      const response = await axios.get(
        `https://22s.store/api/voca/likes`,
        { headers }
      );

      if (response.data.isSuccess) {
        setTerms(response.data.result); // 데이터 저장
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
            <Text style={styles.top}>정확한 회계 재무</Text>
            <Text style={styles.down}>회계/재무</Text>
          </View>
          <Pic width={85} height={85} />
        </View>
        {terms.map((term) => (
          <Toggle
            vocaId={term.vocaId}
            term={term.term}
            description={term.description}
            example={term.example}
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
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
});

export default WordLikeList;
