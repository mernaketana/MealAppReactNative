import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, Image, StyleSheet, Platform } from "react-native";
import MealDetails from "../MealDetails";

export default function MealItem({id, title, imageUrl, duration, complexity, affordability }){

    const navigation = useNavigation();

    function pressHandler(){        
        navigation.navigate('SingleMeal', {mealId: id});
    } 

    return (
    <View style={styles.mealItemContainer}>
        <Pressable android_ripple={{color: '#ccc'}} style={({pressed}) => ({opacity: pressed? 0.75 : null})} onPress={pressHandler}>
            <View style={styles.innerContainer}>
                <View>
                    <Image source={{uri: imageUrl}} style={styles.image} />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                    <MealDetails affordability={affordability} complexity={complexity} duration={duration} />
            </View>
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    mealItemContainer: {
        marginVertical: 15,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: {width: 0, height:2},
        shadowRadius: 8,
        overflow: Platform.OS == 'android'? 'hidden' : 'visible', // So that the shadow is visible on ios
    },
    innerContainer: { // So thatr the rounded corners are visible on ios, the border raduis and the overflow hidden have to be on a different container than the one that holds the shadow
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
        color: 'black'
    },
});