import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Square = props => {
  return (
    <TouchableOpacity style={styles.Square} onPress={props.onPress}>
      <Text style={styles.text}>{props.value}</Text>
    </TouchableOpacity>
  );
};
Square.defaultProps = {
  value: ""
};
const styles = StyleSheet.create({
  Square: {
    width: 100,
    height: 100,
    shadowColor: "black",
    shadowOpacity: 0.4,
    borderColor: "#FB9D7E",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35284A"
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#F8CD9E"
  }
});

export default Square;
