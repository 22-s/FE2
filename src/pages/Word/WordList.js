import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Pic from "../../assets/images/Word/회계재무.svg";
import Toggle from "../../components/Word/Toggle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const WordList = () => {

  const fetchQuizzes = async (category) => {
    console.log("Fetching quizzes for category:", category);
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이유: "+token);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    
    try {
      //setLoading(true);
      const response = await axios.get(`https://22s.store/api/voca?category=${category}`, { headers });

      if (response.data.isSuccess) {
        //setQuizzes(response.data.result); // 퀴즈 데이터 저장
        console.log("용어 정보를 가져왔습니다.")
        console.log(response.data);
      } else {
        console.error("데이터를 가져오지 못했습니다:", response.data.message);
        Alert.alert("오류", response.data.message);
      }
    } catch (error) {
      console.error("퀴즈 데이터를 가져오는 중 오류가 발생했습니다:", error);
      Alert.alert("오류", "퀴즈 데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes("협상의사결정");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.left}>
          <Text style={styles.top}>정확한 회계 재무</Text>
          <Text style={styles.down}>회계/재무</Text>
        </View>
        <Pic width={85} height={85} />
      </View>
      <View style={styles.content}>
        <Toggle />
        <Toggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  title: {
    position: "absolute",
    top: 143.01,
    left: 60,
    width: 294,
    height: 136,
    borderRadius: 24.756,
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },
  left: {
    marginRight: 30,
  },
  top: {
    color: "#303437",
    fontSize: 16.416,
    fontWeight: "600",
  },
  down: {
    color: "#000",
    fontSize: 22.386,
    fontWeight: "600",
  },
  content: {
    position: "absolute",
    top: 330,
    width: 294,
  },
});

export default WordList;
