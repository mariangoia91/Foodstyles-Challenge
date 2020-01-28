import React from "react"
import { StyleSheet, View, Text, Alert } from "react-native"

function displayGeneralTerms() {
  Alert.alert(
    "General Terms",
    "These are the general terms and conditions",
    [{ text: "OK", onPress: () => console.log("Exited General Terms") }],
    { cancelable: false }
  )
}

const GeneralTermsButton = props => {
  return (
    <View style={{ bottom: 32, position: "absolute" }}>
      <Text style={styles.term_service}>
        By signing in I accept the{" "}
        <Text
          onPress={() => displayGeneralTerms()}
          style={(styles.term_service, { textDecorationLine: "underline" })}
        >
          General Terms
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  term_service: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    color: "white"
  }
})

export default GeneralTermsButton
