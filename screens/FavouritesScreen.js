import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { FavouritesContext } from "../store/context/favourites-context";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";


export default function FavouritesScreen(){

    // const favMealsContext = useContext(FavouritesContext);
    // const favMealsIds = favMealsContext.ids;
    const favMealsIds = useSelector((state) => state.favouriteMeals.ids)
    const favMeals = MEALS.filter(meal => favMealsIds.includes(meal.id));

    return(
        favMeals.length !== 0? <MealsList displayedMeals={favMeals} /> : <View style={styles.rootContaoner}>
            <Text style={styles.text}>
                You have no favourite meals!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContaoner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
});