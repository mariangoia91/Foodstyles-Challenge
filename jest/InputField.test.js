import React from "react"
import InputField from "../src/components/InputField"

import renderer from "react-test-renderer"

test("renders correctly", () => {
  const tree = renderer.create(<InputField />).toJSON()
  expect(tree).toMatchSnapshot()
})
