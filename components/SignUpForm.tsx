import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useReducer } from "react";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const initialState = {
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpFrom = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );
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
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignUpFrom;
