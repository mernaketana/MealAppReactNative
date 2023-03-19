import { View, Text, StyleSheet } from "react-native";

export default function MealDetails({duration, affordability, complexity}){
    return(
        <View style={styles.details}>
            <Text style={styles.detailItem}>
                {duration}m
            </Text>
            <Text style={styles.detailItem}>
                {affordability.toUpperCase()}
            </Text>
            <Text style={styles.detailItem}>
                {complexity.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center'
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12
    }
});