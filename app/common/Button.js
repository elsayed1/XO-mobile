import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    alignSelf: "stretch",
    backgroundColor: "rgb(42,55,68)",
    borderRadius: 5,
    marginHorizontal: 25,
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
    color: "#fff"
  }
});

export default Button;
