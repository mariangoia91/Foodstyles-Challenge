import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

import { LinearGradient } from "expo-linear-gradient"
import * as Font from "expo-font"

import GeneralTermsButton from "../components/GeneralTermsButton"

const HomeScreen = props => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts()
    }
  }, [])

  const loadFonts = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf")
    })
    setFontsLoaded(true)
  }

  if (fontsLoaded == false) {
    return null
  }

  return (
    <LinearGradient
      colors={["#ecc45b", "#e57a50", "#ea7d52"]}
      style={{ flex: 1 }}
    >
      <View style={styles.mainContainer}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={[styles.text, { marginBottom: 16 }]}>
          Sign in to be able to save your preferences and settings
        </Text>
        <Text style={[styles.text, { marginBottom: 32 }]}>
          We do not share your data.
        </Text>

        <TouchableOpacity
          style={[styles.customButton, styles.shadow, styles.largeButton]}
          onPress={() => props.navigation.navigate("SignUp")}
        >
          <Text style={styles.customButtonTitle}>Sign up with email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.largeButton}
          onPress={() => props.navigation.navigate("LogIn")}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 20,
              fontFamily: "Montserrat-Regular"
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>
        <GeneralTermsButton />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginTop: "20%",
    height: 210,
    width: 210,
    resizeMode: "contain",
    marginBottom: 32
  },
  customButton: {
    color: "black",
    backgroundColor: "white",
    marginBottom: 16
  },
  customButtonTitle: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    paddingVertical: 16
  },

  text: {
    fontFamily: "Montserrat-Regular",
    color: "white",
    textAlign: "center",
    fontSize: 20
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  largeButton: {
    width: "70%",
    height: 60,
    borderRadius: 30,
    marginBottom: 32
  }
})

export default HomeScreen
