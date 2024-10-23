import { Icon } from "@iconify/react";
import { useState } from "react";
import TextInput from "../Components/Shared/TextInput";
import PasswordInput from "../Components/Shared/PasswordInput";
//import GreenActionButton from "../Components/Shared/GreenActionButton";
import LoginGoogle from "../Components/Shared/LoginGoogle";
import LoginApple from "../Components/Shared/LoginApple";
import LoginFacebook from "../Components/Shared/LoginFacebook";
import LoginPhoneNumber from "../Components/Shared/LoginPhoneNumber";
import Footer from "../Components/Shared/Footer";
import { makeUnauthenticatedPOSTRequest } from "../Utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };

    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

    if (response && !response.err) {
      //console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30); // token is valid for 30 days
      setCookie("token", token, { path: "/", expires: date });
      alert("Success!!!");
      navigate("/home");
    } else {
      alert("Failure :(");
    }

    //console.log(data);
  };

  return (
    <div className="flex flex-col items-center w-screen bg-gradient-to-t from-black to-gray-700 overflow-x-hidden">
      <div className="menu bg-[#191414] sm:w-6/12 w-full h-full flex my-8 rounded-lg flex-col py-6 pb-12">
        <div className="icon flex justify-center w-full mt-8 mb-2">
          <Icon icon="bi:spotify" color="white" height="40px" />
        </div>

        <div className="header flex align-middle justify-center h-16">
          <h1 className="heading text-white text-3xl font-semibold tracking-tighter mb-2">
            Log in to Spotify
          </h1>
        </div>

        <div className="IconsLogin flex flex-col items-center align-middle justify-center space-y-2 pb-15 mt-4">
          <div className="w-5/12 space-y-2">
            {/*<!-- Google Button -->*/}
            <LoginGoogle />

            {/*<!-- Facebook Button -->*/}
            <LoginFacebook />

            {/*<!-- Apple Button -->*/}
            <LoginApple />

            {/*<!-- Phone Number Button -->*/}
            <LoginPhoneNumber />
          </div>
          <br></br>
          <br></br>

          <hr className=" border-gray-800 rounded-full w-9/12"></hr>

          {/* Email and Password input fields along with login button */}
          <br></br>

          <div className="inputRegion w-6/12 px-2 flex items-start justify-start align-middle flex-col bg-transparent text-white text-base font-light">
            <TextInput
              label="Email or username"
              placeholder="Email or username"
              className="mb-4 w-11/12"
              value={email}
              setValue={setEmail}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              className="mb-6 w-11/12"
              value={password}
              setValue={setPassword}
            />
            <button
              className="bg-[#1db954] w-full rounded-full py-2.5 text-base font-bold text-[#191414]
        hover:bg-[#22da63] hover:scale-[1.05]"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Log In
            </button>
            <br></br>
            <br></br>
            <p className="flex align-middle justify-center w-full underline hover:text-[#1db954] cursor-pointer font-light text-sm">
              Forgot your password?
            </p>
            <br></br>
            <p className="w-full bg-transparent text-center pb-5 text-sm font-light">
              <span>Don't have an account? </span>
              <span className="w-full underline hover:text-[#1db954] cursor-pointer">
                Sign up for Spotify
              </span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginComponent;
