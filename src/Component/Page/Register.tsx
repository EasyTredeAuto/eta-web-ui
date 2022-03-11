import React, { memo, useRef } from "react"
import { BiLogInCircle } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { registerState } from "../../Recoil/atoms"
import { TextFieldBase } from "../Element/CustomMaterial.element"
import { TextHeaderH1 } from "../Element/Fontsize.element"
import { ButtonLogin, LinkSignUp } from "../Element/Login.element"
import * as ajax from "../../Utils/ajax"
import {
  BoxContent,
  BoxFooter,
  BoxRegister,
  Container,
} from "../Element/Register.element"
import { LoginDto } from "../../Recoil/atoms/auth"
import Swal from "sweetalert2"

const Register = memo(() => {
  const btnSubmit = useRef<HTMLButtonElement>(null)
  const [user, setUser] = useRecoilState(registerState)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elementValue = e.target.value
    const elementName = e.target.name
    setUser({ ...user, [elementName]: elementValue })
  }

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (user.email === "" || user.password === "") {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please enter your email and password.",
      })
    } else if (user.password !== user.confirmPassword) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "password and confirm password do not match.",
      })
    } else if (user.password.length <= 8) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Password must be more than 8 characters.",
      })
    } else {
      const result = await ajax
        .register({ email: user.email, password: user.password } as LoginDto)
        .then((result) => result)
        .catch((error) => error)
      if (result.id) {
        navigate("/")
        window.location.reload()
      } else {
        Swal.fire({
          title: "Warning",
          icon: "warning",
          text: result.message,
        })
      }
    }
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      btnSubmit.current?.click()
    }
  }

  return (
    <Container>
      <BoxRegister>
        <TextHeaderH1 color={"#14FFEC"}>Register</TextHeaderH1>
        <BoxContent onSubmit={handleRegister}>
          <TextFieldBase
            fullWidth
            label="Email"
            type="email"
            id="username"
            name="email"
            onChange={handleChange}
            onKeyPress={handleKeywordKeyPress}
          />
          <TextFieldBase
            style={{ marginTop: "1rem" }}
            fullWidth
            type="password"
            label="Password"
            id="password"
            name="password"
            onChange={handleChange}
            onKeyPress={handleKeywordKeyPress}
          />
          <TextFieldBase
            style={{ marginTop: "1rem" }}
            fullWidth
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            onKeyPress={handleKeywordKeyPress}
          />
          <ButtonLogin ref={btnSubmit} type="submit" onClick={handleRegister}>
            <BiLogInCircle style={{ marginRight: "0.5rem" }} />
            Register
          </ButtonLogin>
        </BoxContent>
        <BoxFooter
          style={{ display: "flex", justifyContent: "center" }}
          margin={"0 0 1rem 0"}
        >
          <LinkSignUp to="/login">Go to Login</LinkSignUp>
        </BoxFooter>
      </BoxRegister>
    </Container>
  )
})

export default Register
