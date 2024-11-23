import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import TogglePic from "../../assets/images/Word/오른쪽세모.svg";
import ToggleTouched from "../../assets/images/Word/아래세모.svg";
import StarFull from "../../assets/images/Word/채운별.svg";
import Star from "../../assets/images/Word/빈별.svg";
import ToggleContent from "./ToggleContent";

const Toggle = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleArea}>
        <TouchableOpacity onPress={handleToggle}>
          {isToggled ? (
            <ToggleTouched width={14} height={14} />
          ) : (
            <TogglePic width={14} height={14} />
          )}
        </TouchableOpacity>
        <Text style={styles.toggleText}>인사이트</Text>
        <TouchableOpacity onPress={handleFavorite}>
          {isFavorite ? <StarFull /> : <Star />}
        </TouchableOpacity>
      </View>
      {isToggled && (
        <View style={styles.contentArea}>
          <ToggleContent />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  toggleArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 106,
    height: 21,
  },
  toggleText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  contentArea: {
    padding: 10,
  },
});

export default Toggle;
