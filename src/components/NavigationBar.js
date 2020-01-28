import React from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native"
import { Feather } from "@expo/vector-icons"

const NavigationBar = props => {
  return (
    <View
      style={[
        {
          display: "flex",
          height: 44,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        },
      ]}
    >
      <View
        style={{
          width: "15%",
          height: "100%"
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={props.onPress}
        >
          <Feather
            style={{
              fontSize: 30,
              textAlign: "center",
              color: "white"
            }}
            name="chevron-left"
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: "70%", height: "100%" }}>
        <Text
          style={[
            styles.fieldText,
            {
              flex: 1,
              textAlign: "center",
              width: "100%",
              fontSize: 25,
              fontWeight: "900"
            }
          ]}
        >
          {props.isSignUp ? "Sign up with Email" : "Log in"}
        </Text>
      </View>
      <View
        style={{
          width: "15%",
          height: "100%"
        }}
      ></View>
    </View>
  )
}

const styles = StyleSheet.create({
  fieldText: {
    fontFamily: "Montserrat-Regular",
    width: "80%",
    textAlign: "left",
    fontSize: 18,
    color: "white"
  }
})

export default NavigationBar
