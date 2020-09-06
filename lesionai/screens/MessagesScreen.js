import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import useLocation from "./useLocation";
import * as Location from "expo-location";
import AnimatedLoader from "react-native-animated-loader";

let initialMessages = [
  {
    description: "0.0 mi away",
    id: 1,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71sKzRQtXtL._AC_UL600_SR600,600_.png",
    link: "https://www.google.com/search?q=Bunker Hill Monument",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.376340,-71.060774",
    title: "Example 1",
  },
  {
    description: "0.0 mi away",
    id: 2,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71sKzRQtXtL._AC_UL600_SR600,600_.png",
    link: "https://www.google.com/search?q=Soldiers and Sailors Monument",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.355454,-71.066409",
    title: "Example 2",
  },
];

let finalMessages = [
  {
    description: "1.2 mi away",
    id: 1,
    image:
      "https://interactive.wttw.com/sites/default/files/Monuments_1_wide-shot_Hennessey.jpg",
    link: "https://www.google.com/search?q=niche",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.376340,-71.060774",
    title: "niche",
  },
  {
    description: "2.2 away",
    id: 2,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/10/90/51/6e/soldiers-sailors-monument.jpg",
    link: "https://www.google.com/search?q=Ricky's Flower Market",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.379282,-71.093768",
    title: "Ricky's Flower Market",
  },
  {
    description: "2.4 mi away",
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Ether_Monument_Overview.JPG",
    link: "https://www.google.com/search?q=Mahoney's Garden Centers",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.362418,-71.142117",
    title: "Mahoney's Garden Centers",
  },
  {
    description: "3.3 mi away",
    id: 4,
    image: "https://live.staticflickr.com/7250/7658022350_6df0afd547_b.jpg",
    link: "https://www.google.com/search?q=Pemberton Farms Marketplace",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.393820,-71.125703",
    title: "Pemberton Farms Marketplace",
  },
  {
    description: "3.9 mi away",
    id: 5,
    image:
      "https://www.boston-discovery-guide.com/image-files/800-boston-massacre-memorial-common-5x4.jpg",
    link: "https://www.google.com/search?q=Home And Garden Center",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.339053,-71.135045",
    title: "Home And Garden Center",
  },
  {
    description: "4.5 mi away",
    id: 6,
    image:
      "https://t0.gstatic.com/images?q=tbn:ANd9GcT-IEWSlDw3kAu9NROnwF8wslo7pgYwu0iQ2eFuOArwRC5p4oB8mESdMzayW4IltyaSNkOyelwhAI4IhQ",
    link: "https://www.google.com/search?q=Boston Gardener",
    maps:
      "https://www.google.com/maps/search/?api=1&query=42.358729,-71.057460",
    title: "Boston Gardener",
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  // let location = useLocation();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      return { latitude, longitude };
    } catch (error) {
      console.log(error);
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getResult = async () => {
    setLoader(true);
    const { latitude, longitude } = await getLocation();
    let data = [];
    console.log(latitude, longitude);
    try {
      let response = await fetch(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          latitude +
          "," +
          longitude +
          "&type=hospital&rankby=distance&keyword=cancer&key=" +
          "AIzaSyADIV9xQ2UjNyKtEU9O7xVXmt0ZzynxQ4o",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      let json = await response.json();
      for (let i = 0; i < json["results"].length; i++) {
        const name = json["results"][i]["name"];
        const lat = json["results"][i]["geometry"]["location"]["lat"];
        const lon = json["results"][i]["geometry"]["location"]["lng"];
        let distance = getDistanceFromLatLonInKm(latitude, longitude, lat, lon);
        distance = distance / 1.6;
        distance = distance.toFixed(1);
        let temp = {
          id: i,
          title: name,
          maps: "https://maps.google.com/maps?q=" + lat + "," + lon,
          link: "https://www.google.com/search?q=" + name,
          description: distance + " mi away",
        };
        data.push(temp);
      }
      setMessages(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <AnimatedLoader
        visible={loader}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../assets/loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={getResult}>
        <Text style={styles.registerText}>Get Nearby Landmarks</Text>
      </TouchableOpacity>
      <View style={styles.listings}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.description}
              image={item.image}
              link={item.link}
              maps={item.maps}
              onPress={() => Linking.openURL(item.link)}
            />
          )}
          refreshing={refreshing}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  listings: {
    flex: 1,
    padding: 30,
    backgroundColor: "transparent",
    top: 10,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  registerText: {
    fontFamily: "Avenir",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  registerButton: {
    backgroundColor: "#434CFF",
    width: 270,
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
    alignSelf: "center",
    top: 5,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default MessagesScreen;
