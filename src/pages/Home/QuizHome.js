import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation hook
import SearchBar from "../../components/Home/searchBar";
import ReviewBar from "../../components/Home/reviewBarQuiz";
import CategoryBox from "../../components/Home/categoryBox";
import Bag from "../../assets/images/Home/bag.svg";
import Card from "../../assets/images/Home/card.svg";
import Email from "../../assets/images/Home/email.svg";
import Pen from "../../assets/images/Home/pen.svg";
import Outfit from "../../assets/images/Home/outfit.svg";
import Meeting from "../../assets/images/Home/meeting.svg";

const windowWidth = Dimensions.get("window").width;

export default function QuizHome() {
  const navigation = useNavigation(); // Access navigation object

  const goLikeList = () => {
    navigation.navigate("QuizLikeList");
  };

  const handlePress = (category) => {
    navigation.navigate("QuizList", {category});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar />
        <ReviewBar onPress={goLikeList}/>
        <View style={styles.categoryArea}>
          <CategoryBox
            title="업무의 첫걸음"
            subtitle={
              <>
                <Text style={{ color: "#F2892E" }}>매너</Text>
                <Text>와 </Text>
                <Text style={{ color: "#F2892E" }}>일</Text>
                <Text>의 기본</Text>
              </>
            }
            icon={<Bag />}
            onPress={() => handlePress("기본 매너")}
          />
          <CategoryBox
            title="첫인상을 좌우하는"
            subtitle={
              <>
                <Text style={{ color: "#007AFF" }}>명함</Text>
                <Text> 공유 매너</Text>
              </>
            }
            icon={<Card />}
            onPress={() => handlePress("명함 공유 매너")}
          />
        </View>
        <View style={styles.categoryArea}>
          <CategoryBox
            title="이렇게 보내면 OK!"
            subtitle={
              <>
                <Text>팀장님께</Text>
                <Text>{"\n"}</Text>
                <Text style={{ color: "#008D39" }}>메일</Text>
                <Text> 보내기</Text>
              </>
            }
            icon={<Email />}
            onPress={() => handlePress("팀장님께 메일 보내기")}
          />
          <CategoryBox
            title="명확하고 간결하게,"
            subtitle={
              <>
                <Text style={{ color: "#FD553E" }}>보고서</Text>
                <Text> 작성법</Text>
              </>
            }
            icon={<Pen />}
            onPress={() => handlePress("직장인 글쓰기 Tip")}
          />
        </View>
        <View style={styles.categoryArea}>
          <CategoryBox
            title="상황별 스타일링 가이드"
            subtitle={
              <>
                <Text style={{ color: "#141587" }}>TPO</Text>
                <Text>에 맞는 </Text>
                <Text style={{ color: "#B14D00" }}>복장</Text>
              </>
            }
            icon={<Outfit />}
            onPress={() => handlePress("TPO에 맞는 복장")}
          />
          <CategoryBox
            title="원활한 의견 전달"
            subtitle={
              <>
                <Text style={{ color: "#98A304" }}>회의</Text>
                <Text> 시 소통 전략</Text>
              </>
            }
            icon={<Meeting />}
            onPress={() => handlePress("커뮤니케이션 매너")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  categoryArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
});
