import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"

import HomeScreen from "../screens/HomeScreenComponent"
import SignUpScreen from "../screens/SignUpScreenComponent"
import LogInScreen from "../screens/LogInScreenComponent"

const Navigator = createStackNavigator(
  {
    Home: HomeScreen,
    LogIn: LogInScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)

const App = createAppContainer(Navigator)

export default App
