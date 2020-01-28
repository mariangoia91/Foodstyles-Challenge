import gql from "graphql-tag"

export const GRAPHQL_SERVER_URL = "https://api.foodstyles.com/graphql"

export const SIGNUP = gql`
  mutation signUpUser(
    $name: String!
    $email: EmailAddress!
    $password: Password!
  ) {
    signUpUser(data: { name: $name, email: $email, password: $password }) {
      accessToken
      user {
        name
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        name
        email
      }
    }
  }
`
