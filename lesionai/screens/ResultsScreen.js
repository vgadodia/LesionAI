import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import WelcomeSvg from "../components/WelcomeSvg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

function ResultsScreen({ route, navigation }) {
  const { diagnosis, confidence } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <Text style={styles.title}>Results</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate("ImageScreen")}>
          {/* <MaterialCommunityIcons
            style={styles.icon}
            name="close-circle"
            size={50}
          /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.card}>
          <Text style={styles.resultTitle}>
            {diagnosis === "melanoma" ? "Melanoma" : "Actinic Keratosis"}
          </Text>
          <Text style={styles.infoText} numberOfLines={10}>
            Our algorithm predicted that the lesion is {diagnosis} with a
            confidence of {confidence}%
          </Text>
          <TouchableOpacity
            style={[styles.registerButton]}
            onPress={() => navigation.navigate("ImageScreen")}
          >
            <Text style={styles.registerText}>Select another image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    left: 160,
    bottom: 20,
  },
  infoText: {
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "normal",
    textAlign: "center",
    top: 25,
  },
  resultTitle: {
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    top: 0,
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 15,
    top: 10,
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    height: "60%",
    borderRadius: 15,
    alignItems: "center",
    top: 40,
    padding: 20,
  },
  registerText: {
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  registerButton: {
    backgroundColor: "#F49F1C",
    width: 271,
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
    marginTop: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.8,
    padding: 30,
    top: 20,
  },
  subtext: {
    color: "#5A5A5A",
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    top: 31,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
    top: 30,
  },
});

export default ResultsScreen;
