import React from "react";
import { Modal, View, StyleSheet, Text, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NextQuizButton from "./button/NextQuizButton";
import AddReviewButton from "./button/AddReviewButton";
import XButton from "../../../assets/images/QuizDetail/XButton.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../../api/axiosInstance";

const CommentaryModal = ({
  content,
  modalVisible,
  setModalVisible,
  isCorrect,
  review,
  quizId,
  updateQuizId,
  isSubmit,
  firstQuizId,
  lastQuizId,
}) => {
  const handleClose = () => {
    setModalVisible(false);
  };

  const addReview = async () => {
    try {
      if (review) {
        Alert.alert("이미 복습리스트에 추가되어 있습니다.");
      } else {
        // 복습하기 추가 API 호출
        await axiosInstance.post(`/api/quiz/${quizId}/review`);
        Alert.alert("알림", "복습하기 리스트에 추가하였습니다.");
      }
    } catch (error) {
      console.error("복습하기 API 요청 중 오류가 발생했습니다:", error);
      Alert.alert(
        "오류",
        review
          ? "복습하기 해제 중 문제가 발생했습니다."
          : "복습하기 추가 중 문제가 발생했습니다."
      );
    }
  };

  const nextQuizPress = () => {
    console.log("함수 실행");
    updateQuizId(quizId);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={styles.top}>
            <XButton width={17} height={17} onPress={handleClose} />
          </View>
          <View style={styles.modalTitle}>
            <Text style={[styles.titleText, { color: "#268AFF" }]}>해설</Text>
          </View>
          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
          >
            <Text style={styles.text}>{content}</Text>
          </ScrollView>
          <View style={styles.bottom}>
            <NextQuizButton onPress={nextQuizPress} />
            <AddReviewButton onPress={addReview} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0, 0, 0, 0.40)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 0.55,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 288,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    padding: 21,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalTitle: {
    width: 215.841,
    height: 60,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 13,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  modalContent: {
    // alignItems: "center",
    width: 243,
    // height: 249,
    borderColor: "#BAC4CE",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 23,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#72777A",
  },
  bottom: {
    width: 243,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CommentaryModal;
