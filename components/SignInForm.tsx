import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useReducer } from "react";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = (props) => {
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
        id="email"
        label="E-Mail"
        icon={"mail-outline"}
        iconSize={20}
        autoCapitalize="none"
        iconPack={Ionicons}
        onInputChange={inputChangedHandler}
        errorText={formState.inputValidities["email"]}
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
        errorText={formState.inputValidities["password"]}
      />
      <SubmitButton
        title="Sign In"
        onPress={() => console.log("pressed")}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignInForm;
