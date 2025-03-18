import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Profile from "../../assets/images/MyPage/profile.svg";
import RightArrow from "../../assets/images/MyPage/arrow.svg";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

const MyPage = () => {
  const navigation = useNavigation();

  const handleChangeJoinDate = () => {
    console.log("입사일 변경하기 클릭");
    // navigation.navigate("JoinDateChangeScreen"); // 네비게이션 연결 가능
  };

  const handleChangePassword = () => {
    console.log("비밀번호 변경하기 클릭");
    // navigation.navigate("PasswordChangeScreen"); // 네비게이션 연결 가능
  };

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <Text style={styles.infoTitle}>프로필</Text>
      <View style={styles.profileBox}>
        <Profile />
        <View style={{ marginLeft: 10, gap: 5 }}>
          <Text style={styles.name}>박주형</Text>
          <Text style={styles.date}>입사일: 2025년 1월 29일</Text>
        </View>
      </View>

      {/* 기본 정보 섹션 */}
      <Text style={styles.infoTitle}>기본 정보</Text>
      <View style={styles.infoBox}>
        {/* 입사일 */}
        <View style={styles.infoRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoLabel}>입사일</Text>
            <Text style={styles.infoText}>2025년 1월 29일</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity
              onPress={handleChangeJoinDate}
              style={styles.button}
            >
              <Text style={styles.buttonText}>입사일 변경하기</Text>
              <RightArrow />
            </TouchableOpacity>
          </View>
        </View>

        {/* 이메일 */}
        <View style={styles.infoRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoLabel}>이메일</Text>
            <Text style={styles.infoText}>2025123456@dgu.ac.kr</Text>
          </View>
        </View>

        {/* 비밀번호 */}
        <View style={styles.infoRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoLabel}>비밀번호</Text>
            <Text style={styles.infoText}>********</Text>
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
});

export default MyPage;
