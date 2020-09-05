import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function CameraButton({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="home"
          color={"#FFFFFF"}
          size={40}
          style={{ bottom: 15 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    width: 140,
    backgroundColor: "#434CFF",
    bottom: 20,
  },
});

export default CameraButton;
