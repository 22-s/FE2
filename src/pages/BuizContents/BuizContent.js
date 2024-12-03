import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert, Image, ActivityIndicator } from "react-native";
import LinkButton from "../../components/BuizContents/LinkButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LinkCopy = () => {
  Alert.alert("링크가 복사되었습니다.");
};

export default function BuizContent() {
  const [data, setData] = useState(null); // 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태

  const fetchContent = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: " + token);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      setLoading(true);
      const response = await axios.get("/api/trends");
      if (response.data.isSuccess) {
        setData(response.data.result);
      } else {
        Alert.alert("오류", response.data.message || "데이터를 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      Alert.alert("오류", "데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(); // 데이터 가져오기
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#268AFF" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>데이터를 가져올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listArea}>
        <Image style={styles.imageContainer} source={{ uri: data.imageUrl }} />
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>{data.category}</Text>
        </View>
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>{data.title}</Text>
        </View>
        <View style={styles.dateArea}>
          <Text style={styles.dateText}>{data.date}</Text>
        </View>
        <View style={styles.sourcesArea}>
          <Image style={styles.sourcesProfile} source={{ uri: data.authorProfile }} />
          <Text style={styles.sourcesName}>{data.source}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>{data.content}</Text>
        </View>
      </ScrollView>
      <LinkButton onPress={LinkCopy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  listArea: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    minHeight: 200,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  categoryBox: {
    minWidth: 60,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    height: 25,
    backgroundColor: "#F2F2F2",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#72777A",
  },
  titleArea: {
    width: "100%",
    justifyContent: "center",
    paddingLeft: 7,
    marginVertical: 5,
  },
  titleText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#383F49",
  },
  dateArea: {
    width: "100%",
    justifyContent: "center",
    paddingLeft: 7,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#72777A",
  },
  sourcesArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
    marginBottom: 10,
  },
  sourcesProfile: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "blue",
    marginRight: 5,
  },
  sourcesName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#313131",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#DDDDDD",
    marginBottom: 10,
  },
  contentBox: {
    padding: 7,
  },
  contentText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#353535",
  },
});
