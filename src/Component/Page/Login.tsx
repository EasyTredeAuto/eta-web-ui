import {
  CheckboxRemember,
  FormLabel,
  TextFieldBase,
} from "../StyledComponent/CustomMaterial.element"
import { TextHeaderH1 } from "../StyledComponent/Fontsize.element"
import {
  BoxContent,
  BoxFooter,
  BoxLogin,
  ButtonLogin,
  Container,
  LinkForgotPassword,
  LinkSignUp,
} from "../StyledComponent/Login.element"
import { BiLogInCircle } from "react-icons/bi"
import { memo, useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { LoginDto, loginState } from "../../Recoil/atoms/auth"
import { useNavigate, useParams } from "react-router-dom"
import * as ajax from "../../Utils/ajax"
import Swal from "sweetalert2"
import { approveEmail } from "../../Recoil/actions/Authentication.action"
import liff from "@line/liff"
import { LineProfileDto } from "../../Recoil/atoms/todo-line"
import { Button } from "@mui/material"

const lineBtn = { marginBottom: 15 }

const Login: React.FunctionComponent = memo(() => {
  const homeRef = useRef<HTMLAnchorElement>(null)
  const btnSubmit = useRef<HTMLButtonElement>(null)
  const [user, setUser] = useRecoilState(loginState)
  const [remember, setRemember] = useState(false)
  const [LineLogin, setLineLogin] = useState(false)
  const navigate = useNavigate()
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      approveEmail(token)
    }
  }, [token])

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (user.email === "" || user.password === "") {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please enter your email and password.",
      })
    } else if (user.password.length <= 8) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Password must be more than 8 characters.",
      })
    } else {
      const result = await ajax
        .login(user as LoginDto)
        .then((result) => result)
        .catch((error) => error)

      if (result.id) {
        if (result.roles === "ADMIN") {
          window.location.href = "https://www.smaretas.com/admin/user"
        } else {
          window.location.href = "https://www.smaretas.com/user/dashboard"
        }

        if (remember) {
          localStorage.setItem("email", user.email)
          localStorage.setItem("password", user.password)
        } else {
          localStorage.removeItem("email")
          localStorage.removeItem("password")
        }
        window.location.reload()
      } else {
        Swal.fire({
          title: "Warning",
          icon: "warning",
          text: "email or password invalid",
        })
      }
    }
  }

  const lineLogin = async () => {
    console.log(1)
    const idToken = await liff.getIDToken()
    const { displayName, userId, pictureUrl } = await liff.getProfile()
    const body = {
      displayName,
      userId,
      pictureUrl,
      idToken,
    } as LineProfileDto
    const result = await ajax.lineLogin(body)
    if (result.id) {
      if (result.roles === "ADMIN") {
        window.location.href = "https://www.smaretas.com/admin/user"
      } else {
        window.location.href = "https://www.smaretas.com/user/dashboard"
      }
    } else {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: result.message,
      })
    }
  }

  useEffect(() => {
    const fetchConfigLine = async () => {
      await liff.init({ liffId: process.env.REACT_APP_LINE_LIFFID as string })

      if (liff.isLoggedIn()) {
        await lineLogin()
      } else {
        if (liff.isInClient()) {
          await lineLogin()
        } else {
          liff.login()
        }
      }
    }

    fetchConfigLine()
  }, [liff, LineLogin])

  useEffect(() => {
    function fetchData() {
      const email = localStorage.getItem("email")
      const password = localStorage.getItem("password")
      if (email && password) setRemember(true)
      setUser({ email: email ? email : "", password: password ? password : "" })
    }
    fetchData()
  }, [setUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elementValue = e.target.value
    const elementName = e.target.name
    setUser({ ...user, [elementName]: elementValue })
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      btnSubmit.current?.click()
    }
  }

  return (
    <Container>
      <BoxLogin>
        <TextHeaderH1 color={"#14FFEC"}>LOGIN</TextHeaderH1>
        <BoxContent onSubmit={handleLogin}>
          <Button
            type="button"
            fullWidth
            style={lineBtn}
            color="success"
            variant="contained"
            onClick={() => setLineLogin(true)}
          >
            line login
          </Button>
          <TextFieldBase
            value={user.email}
            fullWidth
            size="small"
            type="email"
            label="Email"
            name="email"
            onChange={handleChange}
            onKeyPress={handleKeywordKeyPress}
          />
          <TextFieldBase
            value={user.password}
            style={{ marginTop: "1rem" }}
            fullWidth
            focused={user.password !== ""}
            type="password"
            size="small"
            label="Password"
            name="password"
            onChange={handleChange}
            onKeyPress={handleKeywordKeyPress}
          />
          <BoxFooter>
            <FormLabel
              control={
                <CheckboxRemember
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }}
                  checked={remember}
                  onClick={() => setRemember(!remember)}
                />
              }
              label="Remember Me"
            />
            <LinkForgotPassword href="#">Forgot Password</LinkForgotPassword>
          </BoxFooter>
          <ButtonLogin ref={btnSubmit} type="submit" onClick={handleLogin}>
            <BiLogInCircle style={{ marginRight: "0.5rem" }} />
            Login
          </ButtonLogin>
        </BoxContent>

        <LinkSignUp ref={homeRef} style={{ display: "none" }} to="/home" />
        <BoxFooter
          style={{ display: "flex", justifyContent: "center" }}
          margin={"0 0 1rem 0"}
        >
          <LinkSignUp to="/register">
            You don't have an account? Signup!
          </LinkSignUp>
        </BoxFooter>
      </BoxLogin>
    </Container>
  )
})

export default Login
