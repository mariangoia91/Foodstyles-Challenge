import React from "react"

import AuthenticationComponent from "../components/AuthenticationComponent"

const LogInScreen = props => {
  return (
    <AuthenticationComponent
      isLogin={true}
      isSignUp={false}
      navigation={props.navigation}
    />
  )
}

export default LogInScreen
