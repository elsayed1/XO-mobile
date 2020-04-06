import React, { Component } from "react";
import MainNavigator from "./MainNavigator";
import { StyleSheet } from "react-native";
class App extends Component {
  render() {
    return <MainNavigator style={styles.navigator} />;
  }
}

const styles = StyleSheet.create({
  navigator: {
    width: "100%",
    height: "100%",
    flex: 1
  }
});
export default App;
