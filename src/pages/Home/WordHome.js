import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import SearchBar from "../../components/Home/searchBar";
import BookmarkBar from "../../components/Home/bookmarkBar";
import CategoryBox from "../../components/Home/categoryBox";
import Accounting from "../../assets/images/Home/accounting.svg";
import IT from "../../assets/images/Home/it.svg";
import Marketing from "../../assets/images/Home/marketing.svg";
import HR from "../../assets/images/Home/hr.svg";
import Captain from "../../assets/images/Home/captain.svg";
import Negotiate from "../../assets/images/Home/negotiate.svg";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

export default function WordHome() {
  const navigation = useNavigation(); // Access navigation object

  const handlePress = (category) => {
    console.log(`Category clicked: ${category}`); // Console log on click
    navigation.navigate("WordList", {category});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar />
        <BookmarkBar onPress={() => navigation.navigate("WordLikeList")}/>
        <View style={styles.categoryArea}>
          <CategoryBox
            title="정확한 회계 처리"
            subtitle="회계/재무"
            icon={<Accounting />}
            onPress={() => handlePress("회계재무")}
          />
          <CategoryBox
            title="IT 프로젝트 관리"
            subtitle="기술/IT"
            icon={<IT />}
            onPress={() => handlePress("기술IT")}
          />
        </View>
        <View style={styles.categoryArea}>
          <CategoryBox
            title="효과적인 고객 유치"
            subtitle="마케팅/세일즈"
            icon={<Marketing />}
            onPress={() => handlePress("마케팅세일즈")}
          />
          <CategoryBox
            title="인사 관리를 위한"
            subtitle="HR/조직"
            icon={<HR />}
            onPress={() => handlePress("HR조직")}
          />
        </View>
        <View style={styles.categoryArea}>
          <CategoryBox
            title="리더의 소통 방법"
            subtitle="리더십/팀워크"
            icon={<Captain />}
            onPress={() => handlePress("리더십팀워크")}
          />
          <CategoryBox
            title="효과적인 협상 전략"
            subtitle="협상/의사결정"
            icon={<Negotiate />}
            onPress={() => handlePress("협상의사결정")}
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
