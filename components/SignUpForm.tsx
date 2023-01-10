import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { validateInput } from "../utils/actions/formActions";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const SignUpFrom = (props) => {
  const inputChangedHandler = (inputId: string, inputValue: string) => {
    console.log(validateInput(inputId, inputValue))
  };
  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        icon={"user-o"}
        iconSize={20}
        iconPack={FontAwesome}
        onInputChange={inputChangedHandler}
      />
      <Input
        id="lastName"
        label="Last Name"
        icon={"user-o"}
        iconSize={20}
        iconPack={FontAwesome}
        onInputChange={inputChangedHandler}
      />
      <Input
        id="email"
        label="E-Mail"
        icon={"mail-outline"}
        keyboardType="email-address"
        autoCapitalize="none"
        iconSize={20}
        iconPack={Ionicons}
        onInputChange={inputChangedHandler}
      />
      <Input
        id="password"
        label="Password"
        icon={"lock"}
        autoCapitalize="none"
        secureTextEntry
        iconSize={20}
        iconPack={Feather}
        onInputChange={inputChangedHandler}
      />
      <SubmitButton
        title="Sign Up"
        onPress={() => console.log("pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpFrom;
