import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Arrow_correct from "../../assets/images/TestStep/correctArrow.svg";
import Arrow_incorrect from "../../assets/images/TestStep/incorrectArrow.svg";
import axiosInstance from "../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function TestStep1() {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [testResults, setTestResults] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const selectedResult = testResults.find(test => test.attemptCount === selectedTest);

  
  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await axiosInstance.get("/api/mockTest/result/all");
        if (response.data.isSuccess) {
          setTestResults(response.data.result);
          setSelectedTest(response.data.result[response.data.result.length - 1]); // 최신 회차 선택
          console.log(response.data.result);
        } else {
          Alert.alert("불러오기 실패", response.data.message);
        }
      } catch (err) {
        Alert.alert("오류 발생", "데이터를 불러오는 중 문제가 발생했습니다.");
      }
    };
  
    fetchTestResults();
  }, []);

  const mockTests = testResults.map(test => ({
    id: test.mockTestId,
    label: `${test.attemptCount}회`,
    attemptCount: test.attemptCount, 
    data: test
  }));

  if (!selectedTest || testResults.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>모의고사에 응시한 이력이 없습니다.</Text>
      </View>
    );
  }  

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{selectedTest?.attemptCount}회차 모의고사 결과</Text>
          <View>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text style={styles.dropdownText}>회차 선택 ▾</Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                {mockTests.map((test) => (
                  <TouchableOpacity
                    key={test.mockTestId}
                    onPress={() => {
                      const selected = testResults.find(t => t.mockTestId === test.id); // ✔️ 전체 객체 찾기
                      setSelectedTest(selected);
                      setDropdownVisible(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text>{test.attemptCount}회</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
  
        {/* 점수, 등수 */}
        <View style={styles.circleWrapper}>
          <Text style={styles.score}>{selectedTest?.score ?? 0}</Text>
          <Text style={styles.change}>
            {selectedTest?.scoreChange >= 0 ? `+${selectedTest?.scoreChange}` : selectedTest?.scoreChange}
          </Text>
        </View>
        <Text style={styles.description}>
          {`${
            selectedTest?.score >= 80
              ? "대단해요!"
              : selectedTest?.score >= 60
              ? "좋아요!"
              : "조금 아쉬워요!"
          } ${selectedTest?.score ?? 0}점을 받으셨네요.\n이전보다 ${selectedTest?.scoreChange ?? 0}점 ${
            selectedTest?.scoreChange >= 0 ? "상승" : "하락"
          }했어요.`}
        </Text>
  
        <View style={styles.circleWrapper}>
          <Text style={styles.rank}>
            {(selectedTest?.topPercentile ?? 0).toFixed(1)}%
          </Text>
          <Text style={styles.rankChange}>
            {selectedTest?.topPercentileChange >= 0
              ? `↑${(selectedTest?.topPercentileChange).toFixed(1)}`
              : `↓${Math.abs(selectedTest?.topPercentileChange).toFixed(1)}`}
          </Text>
        </View>
        <Text style={styles.description}>
          상위 {(selectedTest?.topPercentile ?? 0).toFixed(1)}%예요! 이전보다{" "}
          {Math.abs(selectedTest?.topPercentileChange ?? 0).toFixed(1)}%
          {selectedTest?.topPercentileChange >= 0 ? " 상승" : " 하락"}했어요.
        </Text>

  
        {/* 세부 결과 */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>세부 결과</Text>
          <Text style={styles.detailSubtitle}>세부 항목 별 맞은 문제의 개수를 확인해보세요.</Text>
          <View style={styles.detailBox}>
            {selectedTest?.categoryResults?.map((item, index) => (
              <View key={index} style={styles.barArea}>
                <Text style={styles.barLabel}>{item.category}</Text>
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        { width: `${(item.correctCount / item.totalCount) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.barScore}>{item.correctCount}/{item.totalCount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
  
        {/* 전체 문제 */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>전체 문제</Text>
          <Text style={styles.detailSubtitle}>모의고사 문제를 확인하고 복습해보세요!</Text>
          {selectedTest?.questionResults?.map((q, index) => (
            <View
              key={q.quizId}
              style={[styles.questionBox, q.correct ? styles.correctBox : styles.incorrectBox]}
            >
              <View style={styles.questionHeader}>
                <Text style={[styles.categoryTag, q.correct ? styles.correctTag : styles.incorrectTag]}>
                  {q.category}
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    navigation.navigate("TestResultQuiz", {
                      quizId: q.quizId,
                      quizzes: selectedTest.questionResults,
                      firstQuizId: selectedTest.questionResults[0].quizId,
                      lastQuizId: selectedTest.questionResults[selectedTest.questionResults.length - 1].quizId,
                      correct: q.correct
                    });
                  }}
                >
                  <Text style={[styles.viewText, q.correct ? styles.correctView : styles.incorrectView]}>
                    문제 보러가기
                  </Text>
                  {q.correct ? <Arrow_correct /> : <Arrow_incorrect />}
                </TouchableOpacity>
              </View>
              <View style={styles.questionLowBox}>
                <Text style={[styles.questionNumber, q.correct ? styles.correctNumber : styles.incorrectNumber]}>
                  {index + 1}
                </Text>
                <Text style={styles.questionText} numberOfLines={1} ellipsizeMode="tail">
                  {q.question}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    marginBottom: 30,
  },
  dropdownButton: {
    height: 28,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
  },
  dropdownText: {
    fontSize: 12,
    color: "#727272",
    fontWeight: "bold",
  },
  dropdownMenu: {
    width: '100%',
    alignItems: "center",
    position: "absolute",
    top: 35,
    right: 0,
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "#929292",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 30,
    zIndex: 10,
  },
  
  dropdownItem: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#383838",
  },
  circleWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  score: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFC727",
    marginBottom: -10,
  },
  change: {
    fontSize: 18,
    color: "#78C2AD",
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },
  rank: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#7796F8",
  },
  rankChange: {
    fontSize: 16,
    color: "#78C2AD",
    fontWeight: "bold",
    marginBottom: -5,
  },
  detailSection: {
    width: "95%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  detailTitle: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#383838",
  },
  detailSubtitle: {
    width: "100%",
    fontSize: 14,
    color: "#5F5F5F",
    fontWeight: "400",
    marginLeft: 8,
    marginBottom: 20,
  },
  detailBox: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6FBFF",
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  barArea: {
    flexDirection: "column",
    alignItems: "left",
    marginBottom: 12,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  barLabel: {
    width: widthPercentage(30),
    fontSize: 14,
    color: "#606B73",
    fontWeight: "bold",
  },
  barBackground: {
    width: widthPercentage(55),
    height: 8,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  barFill: {
    height: 8,
    backgroundColor: "#9AC9FF",
    borderRadius: 5,
  },
  barScore: {
    fontSize: 14,
    color: "#268AFF",
    fontWeight: "bold",
    marginLeft: 10,
  },

  questionBox: {
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
  viewText: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  questionLowBox: {
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
  },
  questionNumber: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 4,
    marginRight: 5,
  },
  incorrectNumber: {
    color: "#FF5656",
  },
  correctNumber: {
    color: "#5CB74B",
  },
  questionText: {
    width: "85%",
    fontSize: 14,
    color: "#5E5E5E",
    fontWeight: "bold",
  },
  incorrectBox: {
    backgroundColor: "#FFF4F4",
  },
  correctBox: {
    backgroundColor: "#F3FBF4",
  },
  incorrectTag: {
    backgroundColor: "white",
    color: "#FF5656",
  },
  correctTag: {
    backgroundColor: "white",
    color: "#2EB721",
  },
  incorrectView: {
    color: "#FF5656",
  },
  correctView: {
    color: "#4CAF50",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
  },
});
