import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Profile from "../../assets/images/MyPage/profile.svg";
import RightArrow from "../../assets/images/MyPage/arrow.svg";
import axiosInstance from "../../api/axiosInstance";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

const MyPage = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    nickname: "",
    email: "",
    joinDate: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchMyPage = async () => {
    try {
      const response = await axiosInstance.get("/api/user/mypage");

      if (response.data.isSuccess) {
        const { nickname, email, joinDate, profileImage } = response.data.result;

        const formattedDate =
          joinDate && joinDate !== "1970-01-01"
            ? new Date(joinDate).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null; // null이면 표시하지 않음

        setProfile({
          nickname,
          email,
          joinDate: formattedDate,
          profileImage: profileImage ?? "", // null 방지
        });
      } else {
        Alert.alert("불러오기 실패", response.data.message);
      }
    } catch (error) {
      console.error("❌ 마이페이지 에러:", error);
      Alert.alert("오류", "사용자 정보를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPage();
  }, []);

  const handleChangeJoinDate = () => {
    navigation.navigate("JoinDateChangeScreen");
  };

  const handleChangePassword = () => {
    navigation.navigate("EmailVerification");
  };  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#97A4B0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoTitle}>프로필</Text>
      <View style={styles.profileBox}>
        {!!profile.profileImage ? (
          <Image
            source={{ uri: profile.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <Profile width={55} height={55} />
        )}
        <View style={{ marginLeft: 10, gap: 5 }}>
          <Text style={styles.name}>{profile.nickname}</Text>
          <Text style={styles.date}>
            입사일 : {profile.joinDate ? profile.joinDate : "정보 없음"}
          </Text>
        </View>
      </View>

      <Text style={styles.infoTitle}>기본 정보</Text>
      <View style={styles.infoBox}>
      <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.infoLabel}>입사일</Text>
          <Text style={styles.infoText}>
            {profile.joinDate ? profile.joinDate : "정보 없음"}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={handleChangeJoinDate} style={styles.button}>
            <Text style={styles.buttonText}>입사일 변경하기</Text>
            <RightArrow />
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.infoRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoLabel}>이메일</Text>
            <Text style={styles.infoText}>{profile.email}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoLabel}>비밀번호</Text>
            <Text style={styles.infoText}>*****</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
              <Text style={styles.buttonText}>비밀번호 변경하기</Text>
              <RightArrow />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    height: "100%",
    paddingHorizontal: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTitle: {
    width: widthPercentage(80),
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginTop: 30,
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    backgroundColor: "white",
    padding: 13,
    borderRadius: 20,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 999,
    backgroundColor: "#e5e5e5",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  date: {
    fontSize: 11,
    color: "#97A4B0",
    fontWeight: "700",
  },
  infoBox: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
  },
  infoLabel: {
    width: widthPercentage(16),
    fontSize: 14,
    fontWeight: "bold",
    color: "#595959",
  },
  infoText: {
    fontSize: 14,
    color: "#828282",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#97A4B0",
    marginRight: 5,
  },
});

export default MyPage;
