import Feather from "@expo/vector-icons/build/Feather";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useCallback, useReducer, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import SubmitButton from "../components/SubmitButton";
import colors from "../constants/colors";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { updateSignedInUserData } from "../utils/actions/authActions";
import { UserUpdateModel } from "../utils/interfaces/userUpdateModel";

const SettingsScreen = (props) => {
  const userData = useSelector((state: any) => state.auth);
  console.log(userData)

  const initialState = {
    inputValues: {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      about: userData.about || "",
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = async() => {
    const updatedValue=formState.inputValues;
    try {
      setIsLoading(true);
     await updateSignedInUserData(userData.id,updatedValue as UserUpdateModel)
     setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings" />
      <Input
        id="firstName"
        label="First Name"
        icon={"user-o"}
        iconSize={20}
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChange={inputChangedHandler}
        errorText={formState.inputValidities["firstName"]}
        initialValue={userData.firstName}
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
        initialValue={userData.lastName}
      />
      <Input
        id="about"
        label="About"
        icon={"information-circle-outline"}
        autoCapitalize="none"
        iconSize={20}
        iconPack={Ionicons}
        onInputChange={inputChangedHandler}
        initialValue={userData.about}
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
        initialValue={userData.email}
      />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Save"
          onPress={saveHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
