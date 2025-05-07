import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>개인정보 처리방침</Text>
      <Text style={styles.text}>
        신입사UP(이하 "회사")는 개인정보보호법 등 관련 법령을 준수하며, 다음과 같이 개인정보를 처리합니다.{"\n\n"}

        제1조 (수집하는 개인정보 항목){"\n"}
        - 카카오 로그인 시: 이름, 이메일, 프로필 이미지{"\n"}
        - 사용자 입력: 입사일, 비밀번호{"\n\n"}

        제2조 (수집 목적){"\n"}
        - 회원 인증 및 서비스 이용 식별{"\n"}
        - 입사일 기반 콘텐츠 제공{"\n"}
        - 보안 및 고객 지원 목적{"\n\n"}

        제3조 (보유 및 이용기간){"\n"}
        - 회원 탈퇴 시 모든 정보는 지체 없이 파기됩니다.{"\n"}
        - 단, 관계 법령에 따라 일정 기간 보관할 수 있습니다.{"\n\n"}

        제4조 (개인정보의 제3자 제공){"\n"}
        회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 단, 아래의 경우는 예외로 합니다.{"\n"}
        - 이용자가 사전 동의한 경우{"\n"}
        - 법령에 따른 요청이 있는 경우{"\n\n"}

        제5조 (이용자의 권리){"\n"}
        - 본인의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있습니다.{"\n"}
        - 회원은 마이페이지에서 정보 수정을 직접 진행하거나, 고객센터를 통해 문의할 수 있습니다.{"\n\n"}

        제6조 (개인정보 보호책임자){"\n"}
        - 담당자: 신입사UP 운영팀{"\n"}
        - 이메일: support@shinyipsaup.com{"\n\n"}

        [시행일자] 2025년 5월 7일
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#FFFFFF" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2A2A2A",
  },
  text: {
    fontSize: 14,
    color: "#4A4A4A",
    lineHeight: 24,
    letterSpacing: 0.2,
  },
});

export default PrivacyPolicy;
