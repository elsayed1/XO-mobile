import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "./Login";
import Board from "./Board";

const MainNavigator = createStackNavigator({
  Home: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Board: {
    screen: Board,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(MainNavigator);
