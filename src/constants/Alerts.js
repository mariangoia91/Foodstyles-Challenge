import { Alert } from "react-native"

export function showFieldValidationError() {
  Alert.alert("Error", "Please fill in all the fields", [{ text: "OK" }], {
    cancelable: false
  })
}

export function showPasswordTooShort() {
  Alert.alert(
    "Error",
    "The password is too short!\nMin. 6 characters.",
    [{ text: "OK" }],
    { cancelable: false }
  )
}

export function showLoginSuccess(name, email) {
  Alert.alert(
    "You have logged in successfully",
    `Name: ${name}\nEmail: ${email}`,
    [{ text: "Log out", onPress: () => console.log("User wants to log out") }],
    { cancelable: false }
  )
}

export function showSignupSuccess(name) {
  Alert.alert(
    "You have signed up successfully",
    `Your new account, ${name}, has been created`,
    [{ text: "OK!" }],
    { cancelable: false }
  )
}

export function showSignupFailed(error) {
  Alert.alert(
    "Error",
    `Your signup has failed with the following error:\n${error}`,
    [{ text: "OK!" }],
    { cancelable: false }
  )
}
