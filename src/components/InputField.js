import React from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"

const InputField = props => {
  return (
    <View
      style={[
        { width: "100%", justifyContent: "center", alignItems: "center" }
      ]}
    >
      <Text style={[styles.fieldText, { marginBottom: 8 }]}>{props.title}</Text>
      <TextInput
        style={[styles.input, styles.roundedCorners, { marginBottom: 24 }]}
        keyboardType={props.keyboardType}
        secureTextEntry={props.isSecure}
        autoCorrect={false}
        autoCapitalize={props.autoCapitalize}
        onChangeText={text => props.mutator(text)}
        value={props.value}
      />
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
  },
  roundedCorners: {
    borderRadius: 8
  },
  input: {
    fontFamily: "Montserrat-Regular",
    width: "80%",
    height: 45,
    backgroundColor: "white",
    fontWeight: "600",
    paddingHorizontal: 8
  }
})

export default InputField
