import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MannerListBox from "../../components/Manner/MannerListBox";
import SearchBar from "../../components/Home/searchBar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function MannerList() {
  const navigation = useNavigation(); // navigation 훅 사용

  const data = [
    {
      title: "OpenAI DevDay, 최고급 청바지를 선보이다.",
      content:
        '"골드러시 시대에는 금맥을 찾는 대신 청바지나 곡괭이를 팔아라"라는 비즈니스 격언, 한 번쯤 들어보셨을 겁니다. 과거 캘...',
      images: {},
    },
    {
      title: "에이닷, 이렇게 좋은데 외않써?",
      content:
        "최근 흥미로운 기사를 하나 읽었습니다. 한국생성형AI연구원에서 발표한 생성형AI 활용 조사 결과에 대한 내용이었는데요...",
      images: {},
    },
    // 추가 데이터...
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listArea}>
        <View style={{paddingHorizontal: 20, paddingTop: 10}}>
          <SearchBar />
        </View>
        {data.map((item, index) => (
          <TouchableOpacity key={index}>
            <MannerListBox
              category={item.category}
              title={item.title}
              content={item.content}
              date={item.date}
              images={item.images}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listArea: {
    paddingLeft: 7,
    paddingRight: 7,
  },
});
