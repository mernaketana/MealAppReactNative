import { View, Text, StyleSheet } from "react-native";

export default function Subtitle({children}){
    return (
        <View style={styles.subtitleBorder}>
            <Text style={styles.subtitle}>
                {children}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 6,
        textAlign: "center"
    },
    subtitleBorder: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        padding: 6,
        marginHorizontal: 16,
        marginVertical: 4
    }
});