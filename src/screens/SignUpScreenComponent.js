import React from "react"

import AuthenticationComponent from "../components/AuthenticationComponent"

const SignUpScreen = props => {
  return (
    <AuthenticationComponent
      isLogin={false}
      isSignUp={true}
      navigation={props.navigation}
    />
  )
}

export default SignUpScreen
