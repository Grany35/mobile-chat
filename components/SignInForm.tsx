import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { validateInput } from "../utils/actions/formActions";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const SignInForm = (props) => {
  const inputChangedHandler = (inputId: string, inputValue: string) => {
    validateInput(inputId, inputValue);
  };
  return (
    <>
      <Input
        id="email"
        label="E-Mail"
        icon={"mail-outline"}
        iconSize={20}
        autoCapitalize="none"
        iconPack={Ionicons}
        onInputChange={inputChangedHandler}
      />
      <Input
        id="password"
        label="Password"
        autoCapitalize="none"
        secureTextEntry
        icon={"lock"}
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

export default SignInForm;
