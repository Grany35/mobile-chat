import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const SignInForm = (props) => {
  return (
    <>
      <Input
        label="E-Mail"
        icon={"mail-outline"}
        iconSize={20}
        iconPack={Ionicons}
      />
      <Input label="Password" icon={"lock"} iconSize={20} iconPack={Feather} />
      <SubmitButton
        title="Sign Up"
        onPress={() => console.log("pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;
