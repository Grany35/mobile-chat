import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useCallback, useReducer, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import SubmitButton from "../components/SubmitButton";
import colors from "../constants/colors";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import {
  updateSignedInUserData,
  userLogout,
} from "../utils/actions/authActions";
import { UserUpdateModel } from "../utils/interfaces/userUpdateModel";
import { updateLoggedInUserData } from "../store/authSlice";
import ProfileImage from "../components/ProfileImage";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  const userData = useSelector((state: any) => state.auth);

  const firstName: string = userData.firstName || "";
  const lastName: string = userData.lastName || "";
  const email: string = userData.email || "";
  const about: string = userData.about || "";

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about,
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
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = useCallback(async () => {
    const updatedValue = formState.inputValues;
    try {
      setIsLoading(true);
      await updateSignedInUserData(
        userData.id,
        updatedValue as UserUpdateModel
      );
      dispatch(updateLoggedInUserData({ newData: updatedValue }));
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;
    return (
      currentValues.firstName != firstName ||
      currentValues.lastName != lastName ||
      currentValues.email != email ||
      currentValues.about != about
    );
  };

  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage size={80} />

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

        {showSuccessMessage && (
          <Text style={{ color: colors.blue, marginTop: 5 }}>
            Saved Successfully
          </Text>
        )}

        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        ) : (
          hasChanges() && (
            <SubmitButton
              title="Save"
              onPress={saveHandler}
              style={{ marginTop: 20 }}
              disabled={!formState.formIsValid}
            />
          )
        )}
        <SubmitButton
          title="LogOut"
          onPress={() => dispatch<any>(userLogout())}
          style={{ marginTop: 20 }}
          color={colors.red}
        />
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer:{
    alignItems: "center",
  }
});

export default SettingsScreen;
