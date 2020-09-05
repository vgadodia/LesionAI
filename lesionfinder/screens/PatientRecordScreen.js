import React from "react";
import { View, StyleSheet, Text } from "react-native";

function PatientRecordScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        For ebtesam to create a table-like interface for the patient management
        system.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
    top: 30,
  },
  text: {
    alignSelf: "center",
    top: "40%",
    fontSize: 30,
    textAlign: "center",
  },
});

export default PatientRecordScreen;
