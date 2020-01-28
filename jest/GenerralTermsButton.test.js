import React from "react"
import GeneralTermsButton from "../src/components/GeneralTermsButton"

import renderer from "react-test-renderer"

test("renders correctly", () => {
  const tree = renderer.create(<GeneralTermsButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
