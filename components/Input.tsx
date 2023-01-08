import { View, StyleSheet, Text, TextInput } from "react-native";
import colors from "../constants/colors";

const Input = (props) => {
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
        <TextInput style={styles.input} />
      </View>

      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.error}</Text>
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
