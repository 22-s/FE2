import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../assets/images/TestStep/loading.svg";
import CogWheel from "../../assets/images/TestStep/cogWheel.png";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function TestLoading() {
    const navigation = useNavigation();
  
    const rotate1 = useRef(new Animated.Value(0)).current;
    const rotate2 = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      const spinAnimation = (animatedValue) => {
        Animated.loop(
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      };
  
      spinAnimation(rotate1);
      spinAnimation(rotate2);

      const timeout = setTimeout(() => {
        navigation.replace("TestResult"); // 페이지 이동
      }, 5000);
  
      return () => clearTimeout(timeout);
    }, []);
  
    const spin1 = rotate1.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
  
    const spin2 = rotate2.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-360deg"],
    });
  
    return (
      <View style={styles.container}>
        <View style={styles.loadingWrapper}>
          {/* Loading SVG: 절대 위치 */}
          <Loading style={styles.loadingBackground} />
  
          {/* 톱니바퀴 그룹: 우하단 배치 */}
          <View style={styles.gearWrapper}>
            <Animated.Image
              source={CogWheel}
              style={[styles.gear, styles.gearLarger, { transform: [{ rotate: spin1 }] }]}
            />
            <Animated.Image
              source={CogWheel}
              style={[
                styles.gear,
                styles.gearSmaller,
                { transform: [{ rotate: spin2 }], marginLeft: 0, marginTop: 0 },
              ]}
            />
          </View>
        </View>
  
        <Text style={styles.title}>시험 결과 분석 중..</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    loadingWrapper: {
      width: 100,
      height: 100,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    loadingBackground: {
      position: "absolute",
      width: 100,
      height: 100,
    },
    gearWrapper: {
      position: "absolute",
      bottom: -3,
      right: -11    ,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    gear: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
    gearSmaller: {
        width: 19, 
        height: 19,
        marginLeft: 0,
        marginBottom: 12, 
      },
    gearLarger: {
        width: 25, 
        height: 25,
        marginLeft: 0, 
        marginTop: 20, 
      },
    title: {
      fontFamily: "Pretendard",
      fontSize: 17.5,
      fontWeight: "700",
      color: "#383838",
      marginTop: 10,
    },
  });
  