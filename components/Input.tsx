import { View, StyleSheet, Text, TextInput } from "react-native";
import colors from "../constants/colors";

const Input = (props) => {
  const onChangeText = (text) => {
    props.onInputChange && props.onInputChange(props.id, text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        {props.icon && (
          <props.iconPack
            name={props.icon}
            size={props.iconSize || 15}
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={onChangeText}
        />
      </View>

      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: colors.nearlyWhite,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    color: colors.grey,
  },
  label: {
    marginVertical: 8,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  input: {
    color: colors.textColor,
    flex: 1,
    letterSpacing: 0.3,
    paddingTop: 0,
    fontSize: 16,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    letterSpacing: 0.3,
  },
});

export default Input;
