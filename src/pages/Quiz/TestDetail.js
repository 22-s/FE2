import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Dimensions, ScrollView } from "react-native";
import Title from "../../components/Quiz/QuizDetailComponent/Title";
import Content from "../../components/Quiz/QuizDetailComponent/Content";
import O from "../../assets/images/QuizDetail/O.svg";
import X from "../../assets/images/QuizDetail/X.svg";
import Check from "../../assets/images/QuizDetail/Check.svg";
import NavButtonNext from "../../components/Quiz/AfterQuizComponent/NavButtonNext";
import NavButtonPrev from "../../components/Quiz/AfterQuizComponent/NavButtonPrev";
import { TouchableOpacity } from "react-native-gesture-handler";
import axiosInstance from "../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

const TestDetail = ({ route }) => {
  const navigation = useNavigation();
//   const { mockTestId } = route.params;

  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);

  // ✅ 타이머 관련 상태
  const [timeLeft, setTimeLeft] = useState(600); // 10분 = 600초
  const [warned3min, setWarned3min] = useState(false);
  const [warned1min, setWarned1min] = useState(false);

  const [answers, setAnswers] = useState([]);
  const [mockTestId, setMockTestId] = useState(null);
  const currentQuiz = quizzes[currentIndex];
  const currentSelectedAnswer = answers.find(a => a.quizId === currentQuiz.quizId)?.selectedAnswer;

  // ✅ 타이머 시작
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          Alert.alert("시간 종료", "시간이 종료되어 자동으로 제출됩니다.");
          postSubmit(); // 자동 제출
          return 0;
        }

        if (prev === 180 && !warned3min) {
          Alert.alert("알림", "3분 남았습니다!");
          setWarned3min(true);
        }
        if (prev === 60 && !warned1min) {
          Alert.alert("알림", "1분 남았습니다!");
          setWarned1min(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(1, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };


  const fetchMockTest = async () => {
    try {
      const response = await axiosInstance.post(`/api/mockTest/start`);
      console.log("📦 응답 데이터:", response.data);
  
      if (response.data.isSuccess) {
        setQuizzes(response.data.result.quizzes);
        setMockTestId(response.data.result.mockTestId);
        setCurrentIndex(0);
      } else {
        console.error("❗ 실패 응답 메시지:", response.data.message);
        Alert.alert("오류", response.data.message);
      }
    } catch (error) {
      console.error("❗ 요청 중 오류 발생:", error);
  
      // 더 자세한 정보 로그 출력
      if (error.response) {
        console.error("🔍 에러 응답 데이터:", error.response.data);
        console.error("🔍 에러 상태 코드:", error.response.status);
        console.error("🔍 에러 헤더:", error.response.headers);
        Alert.alert("서버 오류", `상태 코드: ${error.response.status}`);
      } else if (error.request) {
        console.error("🔍 요청은 전송됐지만 응답이 없습니다:", error.request);
        Alert.alert("네트워크 오류", "서버로부터 응답이 없습니다.");
      } else {
        console.error("🔍 설정 중 발생한 오류:", error.message);
        Alert.alert("요청 오류", error.message);
      }
    }
  };
  

  const submitAnswer = (quizId, selectedAnswer) => {
    setIsSubmit(true);
    setAnswerResult({ quizId, selectedAnswer });
    console.log("선택한 답안:", selectedAnswer);
  
    // ✅ 기존 선택 제거 후 새 선택 추가
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.quizId !== quizId);
      return [...filtered, { quizId, selectedAnswer }];
    });
  };

  const handleSubmitMockTest = () => {
    const unanswered = quizzes.filter(
      (q) => !answers.find((a) => a.quizId === q.quizId)
    );
  
    if (unanswered.length > 0) {
      Alert.alert(
        "확인되지 않은 문제 있음",
        "아직 풀지 않은 문제가 있습니다. 그래도 제출할까요?",
        [
          { text: "취소", style: "cancel" },
          {
            text: "제출",
            onPress: () => postSubmit(),
          },
        ]
      );
    } else {
      Alert.alert("제출", "모의고사를 제출할까요?", [
        { text: "취소", style: "cancel" },
        {
          text: "제출",
          onPress: () => postSubmit(),
        },
      ]);
    }
  };
  
  const postSubmit = async () => {
    try {
      const response = await axiosInstance.post(`/api/mockTest/${mockTestId}/submit`, {
        mockTestId,
        answers,
      });
      if (response.data.isSuccess) {
        Alert.alert("제출 완료", "모의고사가 제출되었습니다!");
        navigation.replace("TestLoading");
      } else {
        Alert.alert("제출 실패", response.data.message);
      }
    } catch (error) {
      Alert.alert("오류", "제출 중 문제가 발생했습니다.");
    }
  };
  

  const nextQuiz = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsSubmit(false);
    } else {
      Alert.alert("마지막 퀴즈입니다.");
    }
  };

  const prevQuiz = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsSubmit(false);
    } else {
      Alert.alert("첫 번째 퀴즈입니다.");
    }
  };

  useEffect(() => {
    fetchMockTest();
  }, []);

  if (quizzes.length === 0 || !currentQuiz) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.topBar}>
        <Text style={styles.topText}>
            <Text style={{ color: '#000' }}>문제: </Text>
            <Text style={{ color: '#70A0FF' }}>{currentIndex + 1}/{quizzes.length}</Text>
        </Text>
        <Text style={styles.topText}>
            <Text style={{ color: timeLeft <= 60 ? '#FF2626' : '#000' }}>시간: </Text>
            <Text style={{ color: timeLeft <= 60 ? '#FF2626' : '#70A0FF' }}>{formatTime(timeLeft)}</Text>
        </Text>
      </View>

      <View marginBottom={12}>
        <Title content={currentQuiz.question} />
      </View>
      <View marginBottom={17}>
        <Content content={currentQuiz.questionDetail} />
      </View>

      <View style={styles.buttonContainer}>
        <NavButtonPrev onPress={prevQuiz} />
        <NavButtonNext onPress={nextQuiz} />
      </View>

        <View style={styles.answer}>
            <TouchableOpacity onPress={() => submitAnswer(currentQuiz.quizId, "O")}>
                {currentSelectedAnswer === "O" ? (
                <Check width={165} height={75} />
                ) : (
                <O width={165} height={75} />
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => submitAnswer(currentQuiz.quizId, "X")}>
                {currentSelectedAnswer === "X" ? (
                <Check width={165} height={75} />
                ) : (
                <X width={165} height={75} />
                )}
            </TouchableOpacity>
        </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity onPress={handleSubmitMockTest} style={styles.submitButton}>
            <Text style={styles.submitText}>제출하기</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },  
  topBar: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 20,
  },
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303437'
  },
  answer: {
    width: 360,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    position: "absolute",
    zIndex: 10,
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 30,
  },
  submitButton: {
    width: widthPercentage(28),
    height: widthPercentage(12),
    backgroundColor: "#D2E7FF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end", 
  },
  submitText: {
    color: "#268AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  
});

export default TestDetail;
