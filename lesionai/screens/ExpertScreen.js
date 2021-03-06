import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import WelcomeSvg from "../components/WelcomeSvg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

function ExpertScreen({ navigation }) {
  const name = "Sue Bottino";
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRkKTSd4m984aA1RlxiK0ae7f7UG7s-qIyBXw&usqp=CAU";
  const text = "sue@newtoncommunityfarm.org";
  const url = "https://google.com";
  console.log(name, image, text, url);

  // console.log(name, image, wiki);

  // const getResult = async () => {
  //   // Get reference to bundled model assets
  //   const modelJson = require("../assets/model.json");
  //   const modelWeights = require("../assets/weights.bin");

  //   const model = await tf.loadLayersModel(
  //     bundleResourceIO(modelJson, modelWeights)
  //   );

  //   const uri =
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRkKTSd4m984aA1RlxiK0ae7f7UG7s-qIyBXw&usqp=CAU";
  //   const response = await fetch(uri, {}, { isBinary: true });
  //   const imageData = await response.arrayBuffer();
  //   const imageTensor = decodeJpeg(imageData);
  //   const prediction = (await model.predict(imageTensor))[0];
  //   setPrediction({ prediction });
  //   console.log(prediction);
  //   console.log("Hello");
  // };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Agricultural Experts</Text>
      </View>
      <View style={[styles.buttonContainer, { top: 50 }]}>
        <TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.resultTitle}>{name}</Text>
            <Text style={[styles.infoText, { top: 10 }]} numberOfLines={10}>
              {text}
            </Text>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerText}>617-916-9655</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.registerButton, { bottom: 20 }]}>
              <Text style={styles.registerText}>Email</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, { top: -20 }]}>
        <TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.resultTitle}>Greg Maslowe</Text>
            <Text style={[styles.infoText, { top: 10 }]} numberOfLines={10}>
              NewtonCommunityFarm@comcast.net
            </Text>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerText}>617-916-9655</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.registerButton, { bottom: 20 }]}>
              <Text style={styles.registerText}>Email</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    left: 160,
    bottom: 60,
  },
  infoText: {
    fontFamily: "Avenir",
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
    top: 25,
  },
  resultTitle: {
    fontFamily: "Avenir",
    fontSize: 22,
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
    width: "90%",
    height: "70%",
    borderRadius: 15,
    alignItems: "center",
    top: -30,
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
    backgroundColor: "#38C570",
    width: 271,
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
    marginTop: 40,
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
    fontSize: 25,
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

export default ExpertScreen;
