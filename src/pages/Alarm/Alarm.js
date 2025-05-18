// screens/Alarm.js
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import AlarmList from "../../components/Alarm/AlarmList";

const Alarm = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AlarmList
          type="daily"
          title="데일리 퀴즈"
          description="어제 하루 동안 사람들이 가장 많이 푼 퀴즈는 무엇일까요? 지금 바로 확인해보세요!"
          time="16시간 전"
        />
        <AlarmList
          type="review"
          title="복습 퀴즈"
          description="오늘의 복습 퀴즈가 7개 있어요! 지금 바로 복습하고 배운 내용을 정리해보세요."
          time="16시간 전"
        />
        <AlarmList
          type="test"
          title="모의고사"
          description="모의고사 테스트를 치른 지 일주일이 지났어요. 테스트를 보고 새로운 점수에 도전해보세요."
          time="1일 전"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Alarm;
