import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import BuizContentsListBox from "../../components/BuizContents/BuizContentsListBox";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function BuizContentsList() {
  const navigation = useNavigation();
  const [data, setData] = useState([]); // API에서 가져온 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // API 데이터 가져오기
  const fetchTrends = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: " + token);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      setLoading(true); // 로딩 시작
      const response = await axios.get(
        "/api/trends",
        { headers }
      );
      if (response.data.isSuccess) {
        const trends = response.data.result.map((item) => ({
          category: item.category,
          title: item.title,
          content: item.content,
          date: item.date,
          images: { url: item.imageUrl }, 
        }));
        setData(trends);
      } else {
        Alert.alert("오류", response.data.message || "데이터를 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error("트렌드 데이터를 가져오는 중 오류가 발생했습니다:", error);
      Alert.alert("오류", "데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchTrends(); // 컴포넌트 마운트 시 데이터 가져오기
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
        {data.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("BuizContent", { item })}>
            <BuizContentsListBox
              category={item.category}
              title={item.title}
              content={item.content}
              date={item.date}
              images={item.images}
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
