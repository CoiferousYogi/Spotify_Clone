import { useState } from "react";
import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import TextInput from "../Components/Shared/TextInput";
import PasswordInput from "../Components/Shared/PasswordInput";
import LoginGoogle from "../Components/Shared/LoginGoogle";
import LoginApple from "../Components/Shared/LoginApple";
import LoginFacebook from "../Components/Shared/LoginFacebook";
import Footer from "../Components/Shared/Footer";
import { makeUnauthenticatedPOSTRequest } from "../Utils/serverHelpers";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["cookie"]);
  const navigate = useNavigate();

  const SignUp = async () => {
    if (email !== confirmEmail || password !== confirmPassword) {
      alert("Email and/or Password do not match");
      return;
    }

    const data = { email, password, username, firstName, lastName };

    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data,
    );

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

  //console.log(password);

  return (
    <div className="flex flex-col items-center bg-[#191414] overflow-x-hidden">
      <div className="menu bg-[#191414] sm:w-6/12 w-full h-full flex my-3 rounded-lg flex-col py-6 pb-12">
        <div className="icon flex justify-center w-full mt-3 mb-2">
          <Icon icon="bi:spotify" color="white" height="50px" />
        </div>

        <div className="header flex align-middle justify-center h-16">
          <h1 className="heading flex flex-col items-center align-middle text-white text-5xl font-semibold tracking-tighter mb-2">
            <span className="mb-2">Sign up to</span>
            <span>start listening</span>
          </h1>
        </div>
        <br></br>
        <br></br>
        <br></br>

        <div className="IconsLogin flex flex-col items-center align-middle justify-center space-y-2 pb-15 mt-4">
          <div className="inputRegion w-6/12 px-2 flex items-start justify-start align-middle flex-col bg-transparent text-white">
            <TextInput
              label="Email address"
              placeholder="name@domain.com"
              value={email}
              setValue={setEmail}
              className="mb-0 w-full py-3 px-2 font-light text-base"
            />

            <TextInput
              label="Confirm email"
              placeholder="Confirm your email address"
              value={confirmEmail}
              setValue={setConfirmEmail}
              className="mb-0 w-full py-3 px-2 font-light text-base"
            />

            <TextInput
              label="First Name"
              placeholder="John"
              value={firstName}
              setValue={setFirstName}
              className="mb-0 w-full py-3 px-2 font-light text-base"
            />

            <TextInput
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              setValue={setLastName}
              className="mb-0 w-full py-3 px-2 font-light text-base"
            />

            <TextInput
              label="What should we call you?"
              placeholder="Your Username"
              value={username}
              setValue={setuserName}
              className="mb-0 w-full py-3 px-2 font-light text-base"
            />

            <PasswordInput
              label="Password"
              placeholder="Enter a Password"
              value={password}
              setValue={setPassword}
              className="mb-0 w-full py-3 px-2 font-light text-base"
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              className="mb-0 w-full py-3 px-2 font-light text-base"
            />

            <p className="flex align-middle justify-start w-full underline text-[#1db954] cursor-pointer font-light text-xs px-2 mb-6">
              Use phone number instead
            </p>

            <button
              className="bg-[#1db954] w-full rounded-full py-2.5 text-base font-bold text-[#191414]
        hover:bg-[#22da63] hover:scale-[1.05]"
              onClick={(e) => {
                e.preventDefault();
                SignUp();
              }}
            >
              Sign Up
            </button>
            <br></br>
            <br></br>

            <div className="separation flex flex-row align-middle items-center w-full">
              <hr className=" border-gray-700 w-6/12"></hr>
              <span className="text-white px-3"> or </span>
              <hr className=" border-gray-600 w-6/12"></hr>
            </div>

            <br></br>
            <br></br>

            <div className="loginIcons w-full space-y-2">
              <LoginGoogle />
              <LoginFacebook />
              <LoginApple />
            </div>

            <br></br>

            <hr className=" border-gray-700 rounded-full w-full"></hr>

            <br></br>

            <p className="w-full bg-transparent text-center pb-5 text-sm font-light">
              <span className="text-gray-300">Already have an account? </span>
              <span className="w-full underline hover:text-[#1db954] cursor-pointer font-semibold">
                Log in here
              </span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupComponent;
