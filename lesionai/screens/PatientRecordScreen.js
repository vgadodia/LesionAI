import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";

function PatientRecordScreen(props) {
  const tableHead = [
    "Date",
    "Full Name",
    "Age",
    "Height (cm)",
    "Weight(lb)",
    "Diagnosis",
    "Confidence",
  ];
  const widthArr = [100, 120, 60, 110, 100, 120, 100];

  let tableData = [
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Actinic Keratosis", 96.53],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Melanoma", 99.09],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Melanoma", 98.01],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Melanoma", 97.29],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Melanocytic nevi", 97.81],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Melanoma", 96.82],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Melanocytic nevi", 99.81],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Basal cell carcinoma", 99.21],
    ["9/8/2020", "Veer Gadodia", 24, 180, 140, "Basal cell carcinoma", 97.79],
    console.log("Hello"),
  ];

  // for (let i = 0; i < 30; i += 1) {
  //   const rowData = [];
  //   for (let j = 0; j < 7; j += 1) {
  //     rowData.push(`${i}${j}`);
  //   }
  //   tableData.push(rowData);
  // }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Patient Information</Text>
      </View>

      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "white" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.headerText}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: "white",
              }}
            >
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && {
                      backgroundColor: "rgba(67,76,255,0.2)",
                    },
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#F8FAFB",
  },
  titleText: {
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { height: 50, backgroundColor: "#F49F1C" },
  headerText: { textAlign: "center", fontWeight: "700", color: "white" },
  text: { textAlign: "center", fontWeight: "normal", color: "white" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "rgba(67,76,255,0.4)" },
});

export default PatientRecordScreen;
