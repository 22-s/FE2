import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation hook
import MannerSearchBar from "../../components/Home/MannerSearchBar";
import MannerReviewBar from "../../components/Home/MannerReviewBar";
import CategoryBox from "../../components/Home/categoryBox";
import Bag from "../../assets/images/Home/bag.svg";
import Card from "../../assets/images/Home/card.svg";
import Email from "../../assets/images/Home/email.svg";
import Pen from "../../assets/images/Home/pen.svg";
import Outfit from "../../assets/images/Home/outfit.svg";
import Meeting from "../../assets/images/Home/meeting.svg";
import TitleBar from "../../components/Home/titleBar";

export default function MannerHome() {
  const navigation = useNavigation();

  const handlePress = (category) => {
    //카테고리 클릭 시
    console.log(`Category clicked: ${category}`);
    navigation.navigate("MannerList", { category });
  };

  const handleSearch = (searchText) => {
    navigation.navigate("MannerList", { searchText });
  };

  const handleClickReviewBox = () => {
    navigation.navigate("ReviewMannerList");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <MannerSearchBar onSearch={handleSearch} />
        <MannerReviewBar onPress={handleClickReviewBox} />
        <TitleBar
          title={"Manner Category"}
          subTitle={"원하는 카테고리의 매너설명서를 읽어보세요."}
        />
        <View style={styles.categoryArea}>
          <CategoryBox
            title="업무의 첫걸음"
            subtitle={
              <>
                <Text style={{ color: "#F2892E" }}>기본</Text>
                <Text> 매너</Text>
              </>
            }
            icon={<Bag />}
            onPress={() => handlePress(1)}
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
            onPress={() => handlePress(2)}
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
            onPress={() => handlePress(3)}
          />
          <CategoryBox
            title="명확하고 간결하게,"
            subtitle={
              <>
                <Text>직장인 </Text>
                <Text style={{ color: "#FD553E" }}>글쓰기 </Text>
                <Text>Tip</Text>
              </>
            }
            icon={<Pen />}
            onPress={() => handlePress(4)}
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
            onPress={() => handlePress(5)}
          />
          <CategoryBox
            title="원활한 의견 전달"
            subtitle={
              <>
                <Text style={{ color: "#98A304" }}>커뮤니케이션 </Text>
                <Text>매너</Text>
              </>
            }
            icon={<Meeting />}
            onPress={() => handlePress(6)}
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
