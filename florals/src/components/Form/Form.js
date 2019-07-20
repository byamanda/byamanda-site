import styled from "@emotion/styled"

import { Button } from "./Button"
import { Group } from "./Group"
import { Info } from "./Info"
import { Input } from "./Input"
import { Label } from "./Label"
import { TextArea } from "./TextArea"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
`

Form.Button = Button
Form.Group = Group
Form.Info = Info
Form.Input = Input
Form.Label = Label
Form.TextArea = TextArea

export { Form }

