import { useEffect, useState } from "react";
import Hitachi from "../../assets/img/web_logo.png";
import TopImage from "../../assets/img/top-image.png";
import BottomImage from "../../assets/img/bottom-image.png";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate } from "react-router-dom";
import useLoginApi from "../../apis/login/loginApi";
import BpCheckbox from "../../modules/checkbox/BpCheckbox";

interface LoginData {
  email: string;
  password: string;
}

const Page = () => {
  const { login, isLoading } = useLoginApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const token = localStorage.getItem("token");
  const emailLocal = localStorage.getItem("email");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const resetData = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (emailLocal) {
      setEmail(emailLocal);
      setRememberMe(true);
    }
  }, [emailLocal]);

  const loginHandle = async (e: any) => {
    e.preventDefault();

    const data: LoginData = {
      email: email,
      password: password,
    };
    const response = await login(data);

    if (response?.success) {
      if (rememberMe) {
        localStorage.setItem("email", email);
      }
      resetData();
    }
  };

  return token ? (
    <Navigate to="/dashboard" />
  ) : (
    <div
      className="min-h-screen flex flex-col justify-center"
      style={{ background: "#21234A" }}
    >
      <div className="flex justify-end">
        <img src={TopImage} alt="" className="absolute" />
      </div>

      <div className="flex">
        <img src={BottomImage} alt="" className="absolute bottom-0" />
      </div>
      <div className="flex justify-center mt-auto">
        <img src={Hitachi} alt="" width={250} />
      </div>
      <div className="relative my-5 py-1 sm:max-w-xl mx-auto md:w-4/12 w-full max-w-4xl">
        <div
          className="relative px-5 py-5 backdrop-blur-sm shadow-lg rounded-xl sm:p-20"
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-lg font-semibold text-white mt-3 mb-3">
                Login
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={loginHandle}>
                  <div className="relative mb-3">
                    <TextField
                      id="outlined-basic"
                      label="LDAP ID"
                      variant="outlined"
                      fullWidth
                      className="bg-white rounded-sm"
                      color="warning"
                      type="text"
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        sx: {
                          fontWeight: "200 !important",
                        },
                      }}
                      InputLabelProps={{
                        style: { fontWeight: "normal" },
                      }}
                    />
                  </div>
                  <div className="relative mb-3">
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        htmlFor="outlined-adornment-password"
                        style={{
                          fontWeight: "normal",
                          marginBottom: "10px",
                          paddingBottom: "10px",
                        }}
                        color="warning"
                        size="small"
                      >
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        className="bg-white rounded-sm"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        color="warning"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                          fontWeight: "200 !important",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                  <div className="relative mb-3">
                    <div className="flex items-center gap-4">
                      <BpCheckbox
                        value={rememberMe}
                        onChange={(e: any, v: any) => {
                          e.preventDefault();
                          setRememberMe(v);
                        }}
                        sx={{ padding: 0 }}
                      />
                      <p className="text-xs text-gray-500">Remember Me</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      variant="contained"
                      size="medium"
                      fullWidth
                      style={{ background: isLoading ? "#61677A" : "#fb771a" }}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading ..." : "Login"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center mt-auto mb-3">
        <div className="flex-col">
          <p className="text-white text-center">
            PT HITACHI CONSTRUCTION MACHINERY INDONESIA
          </p>
          <p className="text-gray-400 text-center">
            Copyright © 2023 PT Nuansa Cerah Informasi
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
