import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import colors from "../constants/colors";
import { signUp } from "../utils/actions/authActions";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpFrom = (props) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
      setError("");
    }
  }, [error]);

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = async() => {
    try {
      setIsLoading(true);
      signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError("");
      props.setIsSignUp(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        icon={"user-o"}
        iconSize={20}
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChange={inputChangedHandler}
        errorText={formState.inputValidities["firstName"]}
      />
      <Input
        id="lastName"
        label="Last Name"
        icon={"user-o"}
        autoCapitalize="none"
        iconSize={20}
        iconPack={FontAwesome}
        onInputChange={inputChangedHandler}
        errorText={formState.inputValidities["lastName"]}
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
        errorText={formState.inputValidities["email"]}
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
        errorText={formState.inputValidities["password"]}
      />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign Up"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignUpFrom;
