import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const SignUpFrom = (props) => {
  return (
    <>
      <Input
        label="First Name"
        icon={"user-o"}
        iconSize={20}
        iconPack={FontAwesome}
        errorText="Error"
      />
      <Input
        label="Last Name"
        icon={"user-o"}
        iconSize={20}
        iconPack={FontAwesome}
      />
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

export default SignUpFrom;
