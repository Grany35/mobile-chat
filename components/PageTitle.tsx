import { Text, View, StyleSheet } from "react-native";
import colors from "../constants/colors";

export interface PageTitleProps {
  text: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 28,
    color: colors.textColor,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
});

export default PageTitle;
