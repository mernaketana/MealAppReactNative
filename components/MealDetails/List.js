import { View, Text, StyleSheet,  } from "react-native";

export default function List({list}){
    return(
        list.map(listItem => (
            <View  key={listItem} style={styles.listItem}>
                <Text style={styles.listItemText}>{listItem}</Text>
            </View>
        ))
    );
}

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 7,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,  
        backgroundColor: 'grey',   
    },
    listItemText: {
        textAlign: "center",
    }
});