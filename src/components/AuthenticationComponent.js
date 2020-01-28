import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native"

import { ApolloProvider, Mutation } from "react-apollo"
import { InMemoryCache, HttpLink, ApolloClient } from "apollo-boost"

import * as Font from "expo-font"
import { LinearGradient } from "expo-linear-gradient"

import NavigationBar from "./NavigationBar"
import InputField from "./InputField"

import * as Constants from "../constants/Constants"
import * as Alerts from "../constants/Alerts"

const client = new ApolloClient({
  link: new HttpLink({
    uri: Constants.GRAPHQL_SERVER_URL
  }),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors)
    console.log("networkError", networkError)
  }
})

import GeneralTermsButton from "../components/GeneralTermsButton"

const AuthenticationComponent = props => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  var isLogin = props.isLogin
  var isSignUp = props.isSignUp

  var [loginFailed, setLoginFailed] = useState(false)

  var buttonTitle = ""
  var passwordTitle = ""

  if (isLogin) {
    buttonTitle = "LOG IN"
    passwordTitle = "Password"
  }

  if (isSignUp) {
    buttonTitle = "SIGN UP"
    passwordTitle = "Password (min 6 characters)"
  }

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
      <ApolloProvider client={client}>
        <View style={styles.mainContainer}>
          <SafeAreaView style={[{ marginBottom: 32 }, styles.droidSafeArea]}>
            <NavigationBar
              isSignUp={isSignUp}
              onPress={() => props.navigation.goBack()}
            ></NavigationBar>
          </SafeAreaView>

          {isSignUp == true && (
            <InputField
              title="Name"
              state={name}
              isSecure={false}
              autoCapitalize="words"
              keyboardType="default"
              mutator={text => setName(text)}
            />
          )}

          <InputField
            title="Email"
            state={email}
            isSecure={false}
            keyboardType="email-address"
            autoCapitalize="none"
            mutator={text => setEmail(text)}
          />

          <InputField
            title={passwordTitle}
            state={password}
            isSecure={true}
            keyboardType="default"
            autoCapitalize="none"
            mutator={text => setPassword(text)}
          />

          {isLogin == true && loginFailed == true && (
            <View style={styles.loginError}>
              <Text style={[styles.roundedCorners, styles.loginText]}>
                Email or password is not correct
              </Text>
            </View>
          )}

          {isLoading == true && (
            <ActivityIndicator size="large" color="white" />
          )}

          {/* ____ Login Mutation ____ */}

          {isLogin == true && isLoading == false && (
            <Mutation
              mutation={Constants.LOGIN}
              variables={{
                email: email,
                password: password
              }}
            >
              {(loginUser, { loading, error }) => {
                const submit = () => {
                  console.log("Requesting....")
                  if (error) {
                    console.log("FAILED WITH ERROR", error)
                  }

                  setIsLoading(true)

                  loginUser()
                    .then(res => {
                      setIsLoading(false)
                      setLoginFailed(false)
                      console.log("Logged in Successfully", res)
                      let email = res.data.login.user.email
                      let name = res.data.login.user.name
                      Alerts.showLoginSuccess(name, email)
                    })
                    .catch(err => {
                      setIsLoading(true)
                      setLoginFailed(true)
                    })
                }
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (email.length == 0) {
                        Alerts.showFieldValidationError()
                      } else if (password.length < 6) {
                        Alerts.showPasswordTooShort()
                      } else {
                        submit()
                      }
                    }}
                    style={{ width: "40%" }}
                  >
                    <View style={[styles.greenButton]}>
                      <Text style={[styles.greenButtonText]}>
                        {buttonTitle}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
            </Mutation>
          )}

          {/* ____ Signup Mutation ____ */}

          {isSignUp == true && isLoading == false && (
            <Mutation
              mutation={Constants.SIGNUP}
              variables={{
                name: name,
                email: email,
                password: password
              }}
            >
              {(signUpUser, { loading, error }) => {
                const submit = () => {
                  if (error) {
                    console.log("ERROR:", error)
                  }

                  setIsLoading(true)

                  signUpUser()
                    .then(res => {
                      setIsLoading(false)
                      console.log("Registered successfully", res)
                      let name = res.data.signUpUser.user.name
                      Alerts.showSignupSuccess((name = email))
                      props.navigation.goBack()
                    })
                    .catch(err => {
                      setIsLoading(false)
                      Alerts.showSignupFailed((error = error))
                    })
                }
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (email.length == 0 || name.length == 0) {
                        Alerts.showFieldValidationError()
                      } else if (password.length < 6) {
                        Alerts.showPasswordTooShort()
                      } else {
                        submit()
                      }
                    }}
                    style={{ width: "40%" }}
                  >
                    <View style={[styles.greenButton]}>
                      <Text style={[styles.greenButtonText]}>
                        {buttonTitle}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
            </Mutation>
          )}

          {isLogin == true && (
            <TouchableOpacity
              onPress={() => console.log("Forgot my password pressed")}
              style={{ width: "60%", marginTop: 32 }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-Regular",
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: 18,
                  color: "white"
                }}
              >
                Forgot my password
              </Text>
            </TouchableOpacity>
          )}
          <GeneralTermsButton />
        </View>
      </ApolloProvider>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  roundedCorners: {
    borderRadius: 8
  },

  fieldText: {
    fontFamily: "Montserrat-Regular",
    width: "80%",
    textAlign: "left",
    fontSize: 18,
    color: "white"
  },

  input: {
    fontFamily: "Montserrat-Regular",
    width: "80%",
    height: 45,
    backgroundColor: "white",
    fontWeight: "600",
    paddingHorizontal: 8
  },

  loginError: {
    backgroundColor: "#de4942",
    color: "white",
    borderRadius: 5,
    paddingVertical: 8,
    marginBottom: 16
  },

  loginText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 8,
    color: "white"
  },

  greenButton: {
    borderRadius: 30,
    backgroundColor: "#6ac297",
    height: 60,
    color: "white"
  },

  greenButtonText: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    paddingVertical: 18
  },

  droidSafeArea: {
    paddingTop: Platform.OS === "android" ? 35 : 0
  }
})

export default AuthenticationComponent
