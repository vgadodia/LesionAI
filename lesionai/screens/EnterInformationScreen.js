import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AppText from "../components/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const height = Dimensions.get("screen").height;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  age: Yup.number()
    .required("Please enter your age")
    .typeError("A number is required"),
  weight: Yup.number()
    .required("Please enter your weight")
    .typeError("A number is required"),
  height: Yup.number()
    .required("Please enter your height")
    .typeError("A number is required"),
});

function EnterInformationScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    // const result = await authApi.login(email, password);
    // if (!result.ok) return setLoginFailed(true);
    // setLoginFailed(false);
    // auth.logIn(result.data);
    // console.log(email, password);
    try {
      let response = await fetch("http://00c455fcd820.ngrok.io/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let json = await response.json();
      if (json["status"] === "success") {
        console.log("Login Successful");
        setErrorMessage(false);
        setLoginFailed(false);
        navigation.navigate("HowItWorks");
      } else {
        console.log("Login Failed");
        setErrorMessage(true);
        setLoginFailed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ backgroundColor: "#F8FAFB", flex: 1, width: "100%" }}>
      <View style={styles.titleContainer}>
        <AppText style={styles.text}>Information</AppText>
      </View>
      <View>
        <AppText style={[styles.orButton, { top: 0 }]}>
          Enter some information to get started.
        </AppText>
      </View>

      <View style={[styles.formContainer, { top: 0 }]}>
        <Screen style={styles.container}>
          <Form
            initialValues={{ name: "", age: 0, height: 0, weight: 0 }}
            // onSubmit={handleSubmit}
            onSubmit={() => navigation.navigate("AppNavigator")}
            validationSchema={validationSchema}
          >
            <FormField
              placeholder="Full Name"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              name="name"
            />
            <FormField
              placeholder="Age"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={false}
              textContentType="password"
              name="age"
            />
            <FormField
              placeholder="Height (cm)"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              name="height"
            />
            <FormField
              placeholder="Weight (lb)"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              name="weight"
            />

            {errorMessage && (
              <AppText
                style={[
                  styles.haveAccountText,
                  {
                    textAlign: "center",
                    color: "red",
                    fontSize: 16,
                    paddingVertical: 10,
                  },
                ]}
              >
                Incorrect credentials, please try again
              </AppText>
            )}

            <SubmitButton style={styles.registerButton} title="Continue" />
          </Form>
        </Screen>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orButton: {
    color: "#A8A8A8",
    textAlign: "center",
    marginTop: 25,
  },
  icon: {
    left: 5,
    top: 4,
  },
  iconContainer: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    top: 8,
    borderRadius: 20,
    left: 60,
  },
  googleButton: {
    marginTop: 15,
    left: 65,
    color: "#2D3748",
    fontFamily: "Avenir",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleSignUp: {
    flexDirection: "row",
    backgroundColor: "#F8FAFB",
    borderWidth: 2,
    borderColor: "#CECECE",
    borderRadius: 12,
    height: 60,
  },
  haveAccountContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  haveAccountText: {
    color: "#2D3748",
  },
  loginText: {
    color: "#EA765D",
    top: -8,
  },
  titleContainer: {
    flex: 0.15,
    marginTop: 80,
    justifyContent: "center",
  },
  registerButton: {
    borderRadius: 12,
    marginTop: 20,
    backgroundColor: "#434CFF",
    height: 60,
    fontSize: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  googleContainer: {
    flex: 0.1,
    padding: 30,
  },
  formContainer: {
    padding: 30,
    flex: 0.6,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
});

export default EnterInformationScreen;
