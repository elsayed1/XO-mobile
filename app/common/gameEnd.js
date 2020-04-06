import React from "react";
import { Text, StyleSheet } from "react-native";
import { Overlay, Button, Card } from "react-native-elements";

const GameEnd = props => {
  return (
    <Overlay
      isVisible={props.isVisible}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      width={300}
      height={200}
    >
      <Card>
        <Text style={styles.text}>Game Over</Text>
        <Text style={styles.text}>{props.winner} is the winner</Text>
        <Button title="play again" onPress={props.playAgain} />
      </Card>
    </Overlay>
  );
};
const styles = StyleSheet.create({
  text: {
    marginBottom: 5,
    fontSize: 30,
    color: "#816F90"
  }
});
export default GameEnd;
