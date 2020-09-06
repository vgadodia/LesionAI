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

function ConfirmLibraryImage({ route, navigation }) {
  const { photoUrl, base64 } = route.params;
  // console.log(base64)

  const getResult = async () => {
    // console.log(photoUrl);
    const prediction = "Taj Mahal";
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
      let googleVisionRes = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          "ENTER GOOGLE CLOUD API KEY",
        {
          method: "POST",
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64,
                },
                features: [{ type: "LANDMARK_DETECTION", maxResults: 5 }],
              },
            ],
          }),
        }
      );
      let json = await googleVisionRes.json();
      try {
        name = json["responses"][0]["landmarkAnnotations"][0]["description"];
      } catch (error) {
        navigation.navigate("ResultsScreen", {
          name: "No Data Available",
          image:
            "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          text: "No information available",
          url: "https://google.com",
        });
        return;
      }
    } catch (error) {
      navigation.navigate("ResultsScreen", {
        name: "No Data Available",
        image:
          "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        text: "No information available",
        url: "https://google.com",
      });
      return;
    }

    console.log(name);

    try {
      let response = await fetch(
        "https://landmarkapp-backend.herokuapp.com/monuments",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      let json = await response.json();
      console.log(json);
      let { image, text, url } = json;
      if (name === "Taj Mahal") {
        image =
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80";
      }
      if (json["url"]) {
        navigation.navigate("ResultsScreen", {
          name,
          image,
          text,
          url,
        });
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

  // console.log(photoUrl);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground style={styles.image} source={{ uri: photoUrl }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() =>
              navigation.navigate("ResultsScreen", {
                diagnosis: "actinic keratosis",
                confidence: 96.53,
              })
            }
          >
            <Text style={styles.registerText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: "#F49F1C" }]}
            onPress={() => navigation.navigate("ImageScreen")}
          >
            <Text style={styles.registerText}>Rechoose</Text>
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

export default ConfirmLibraryImage;
