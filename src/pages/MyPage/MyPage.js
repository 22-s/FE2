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
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

const MyPage = () => {
  const navigation = useNavigation();
  const { isLoggedIn, logout } = useAuth();
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

        console.log("마이페이지 데이터:", response.data.result);
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
    console.log("입사일 변경하기 클릭");
    navigation.navigate("AuthStack", {
      screen: "JoiningDate",
    });
  };

  const handleChangePassword = () => {
    console.log("비밀번호 변경하기 클릭");
    navigation.navigate("AuthStack", {
      screen: "EmailVerification",
    });
  };


  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "/api/user/signout"
      );

      await AsyncStorage.removeItem("accessToken"); // 토큰 제거
      logout(); // 상태 업데이트
      Alert.alert("알림", "로그아웃되었습니다.");
      navigation.replace("AuthStack");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  const handleAuthAction = () => {
    // if (isLoggedIn) {
      Alert.alert(
        "로그아웃",
        "로그아웃을 하시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          { text: "확인", onPress: handleLogout },
        ],
        { cancelable: true }
      );
      
    // } else {
    //   navigation.replace("AuthStack");
    // }
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
      {/* 프로필 섹션 */}
      <Text style={styles.infoTitle}>프로필</Text>
      <View style={styles.profileBox}>
        {/* <Profile /> */}
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

      {/* 기본 정보 섹션 */}
      <Text style={styles.infoTitle}>기본 정보</Text>
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoLabel}>입사일</Text>
            <Text style={styles.infoText}>
              {profile.joinDate ? profile.joinDate : "정보 없음"}
            </Text>
          </View>

          {/* 이메일 */}
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

        {/* 비밀번호 */}
        <View style={styles.infoRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoLabel}>비밀번호</Text>
            <Text style={styles.infoText}>*****</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity
              onPress={handleChangePassword}
              style={styles.button}
            >
              <Text style={styles.buttonText}>비밀번호 변경하기</Text>
              <RightArrow />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleAuthAction}>
          <Text style={styles.logoutText}>
            로그아웃
          </Text>
        </TouchableOpacity>

      <View style={styles.policyContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("TermsOfService")}>
          <Text style={styles.policyText}>서비스 이용약관 보기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text style={styles.policyText}>개인정보 처리방침 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 999,
    backgroundColor: "#e5e5e5",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    height: "100%",
    paddingHorizontal: 30,
  },
  infoTitle: {
    width: widthPercentage(80),
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginTop: 30,
  },
  profileBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    backgroundColor: "white",
    padding: 13,
    borderRadius: 20,
  },
  name: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  date: {
    fontFamily: "Pretendard",
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
    // borderBottomWidth: 1,
    // borderBottomColor: "#E5E5E5",
    paddingVertical: 7,
  },
  infoLabel: {
    width: widthPercentage(16),
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "bold",
    color: "#595959",
  },
  infoText: {
    fontFamily: "Pretendard",
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
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "500",
    color: "#97A4B0",
    marginRight: 5,
  },
  logoutButton: {
    width: "95%",
    backgroundColor: "#61ABFF",
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logoutText:{
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  policyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  policyText: {
    fontSize: 12,
    color: "#8E8E8E",
    textDecorationLine: "underline",
    fontFamily: "Pretendard",
  },
  separator: {
    fontSize: 12,
    marginHorizontal: 8,
    color: "#C4C4C4",
  }
});

export default MyPage;
