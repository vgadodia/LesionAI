import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SvgComponent1 from "../svg/SvgComponent1";
import SvgComponent2 from "../svg/SvgComponent2";
import SvgComponent3 from "../svg/SvgComponent3";
import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";
import * as jpeg from "jpeg-js";

function ConfirmImage({ route, navigation }) {
  const { photoUrl, base64 } = route.params;

  const getResult = async () => {
    // console.log(photoUrl);
    const prediction = "Eiffel Tower";
    console.log("Starting prediction...");
    let name = "Healthy Blueberry";
    let image =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrC0mGkvj0Y6TVRHi8MHyuuD7cqpTGUkHRdg&usqp=CAU";
    let text =
      "Blueberries are perennial flowering plants with blue or purple berries. They are classified in the section Cyanococcus within the genus Vaccinium. Vaccinium also includes cranberries, bilberries, huckleberries and Madeira blueberries.Commercial blueberries—both wild (lowbush) and cultivated (highbush)—are all native to North America. The highbush varieties were introduced into Europe during the 1930s. Blueberries are usually prostrate shrubs that can vary in size from 10 centimeters (4 inches) to 4 meters (13 feet) in height. In commercial production of blueberries, the species with small, pea-size berries growing on low-level bushes are known as 'lowbush blueberries' (synonymous with 'wild'), while the species with larger berries growing on taller cultivated bushes are known as 'highbush blueberries'. Canada is the leading producer of lowbush blueberries, while the United States produces some 40% of the world supply of highbush blueberries.";
    let url = "https://en.wikipedia.org/wiki/Blueberry";

    navigation.navigate("ResultsScreen", {
      name,
      image,
      text,
      url,
    });

    try {
      let response = await fetch("http://00c455fcd820.ngrok.io/predict", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: base64,
        }),
      });
      let json = await response.json();
      console.log(json);
      let { disease, plant } = json;

      if (disease === "Black Rot") {
        let name = disease;
        let image =
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80";
        let text =
          "Black rot is a disease of apples that infects fruit, leaves and bark caused by the fungus Botryosphaeria obtusa. It can also jump to healthy tissue on pear or quince trees, but is typically a secondary fungus of weak or dead tissues in other plants. Begin checking your apple trees for signs of infection about a week after the petals fall from your apple blossoms. Early symptoms are often limited to leaf symptoms such as purple spots on upper leaf surfaces. As these spots age, the margins remain purple, but the centers dry out and turn yellow to brown. Over time, the spots expand and heavily infected leaves drop from the tree. Infected branches or limbs will show characteristic red-brown sunken areas that expand each year.";
        let url =
          "https://www.gardeningknowhow.com/edible/fruits/apples/black-rot-on-apple-trees.htm";
      }
    } catch (error) {
      console.error(error);
    }

    // await tf.ready();

    // Get reference to bundled model assets
    // const modelJson = require("../assets/model.json");
    // const modelWeights = require("../assets/weights.bin");

    // const model = await tf.loadLayersModel(
    //   bundleResourceIO(modelJson, modelWeights)
    // );

    // console.log(model.summary());

    try {
      // const uri =
      //   "https://www.history.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTU3ODc4NjAzNTM2MTQ4MTkx/hith-eiffel-tower-istock_000016468972large-2.jpg";
      // const response = await fetch(uri, {}, { isBinary: true });
      // const rawImageData = await response.arrayBuffer();
      // const imageTensor = imageToTensor(rawImageData);
      // const predictions = await model.predict(imageTensor);
      // console.log("Hello");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground style={styles.image} source={{ uri: photoUrl }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() =>
              navigation.navigate("ResultsScreen", {
                diagnosis: "melanoma",
                confidence: 99.09,
              })
            }
          >
            <Text style={styles.registerText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: "#F49F1C" }]}
            onPress={() => navigation.navigate("CameraScreen")}
          >
            <Text style={[styles.registerText]}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    top: 60,
    borderRadius: 20,
    height: 700,
  },
  buttonContainer: {
    top: 40,
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
    backgroundColor: "#434CFF",
    width: 271,
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
    marginVertical: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  image: {
    width: 350,
    height: 350,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
});

export default ConfirmImage;
