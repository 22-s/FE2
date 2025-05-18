import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import LogoMan from "../../assets/images/Logo/logoMan.svg";
import LogoText from "../../assets/images/Logo/logoWelcome.svg";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  const handleGetStarted = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 남자 이미지 */}
      <View style={styles.imageContainer}>
        <LogoMan width={300} height={300} />
      </View>

      {/* 로고와 설명 */}
      <LogoText width={440} height={110} />
      <Text style={styles.subtitle}>비즈니스 매너와 업무 스킬을 한 번에!</Text>

      {/* 버튼들 */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
        <Text style={styles.primaryButtonText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.secondaryButtonText}>로그인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBE8FA",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: -20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1E3A8D",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4D678C",
    marginTop: -10,
    marginBottom: 20,
    fontWeight: "900",
  },
  primaryButton: {
    width: "80%",
    paddingVertical: 15,
    backgroundColor: "#268AFF",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "80%",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#268AFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Welcome;
