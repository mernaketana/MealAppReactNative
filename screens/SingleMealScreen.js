import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MealDetails from "../components/MealDetails";
import List from "../components/MealDetails/List";
import Subtitle from "../components/MealDetails/Subtitle";
import { MEALS } from "../data/dummy-data";
import { FavouritesContext } from "../store/context/favourites-context";
import { addFavourite, removeFavourite } from "../store/redux/favourites";

export default function SingleMealScreen({route, navigation}){

    // const favMealsContext = useContext(FavouritesContext);

    const favMealsIds = useSelector((state) => state.favouriteMeals.ids);
    const dispatch = useDispatch();
    
    const mealId = route.params.mealId;
    
    const meal = MEALS.find(meal => meal.id == mealId);

    const mealIsFav = favMealsIds.includes(mealId);


    function pressFavHandler(){
        if(mealIsFav){
            // favMealsContext.removeFavourite(mealId);
            dispatch(removeFavourite({id: mealId}));
        }
        else{
            // favMealsContext.addFavourite(mealId);
            dispatch(addFavourite({id: mealId}));
        }
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            title: meal.title.length > 16 ? `${meal.title.slice(0, 17)}...` : meal.title,
            headerRight: () => <IconButton icon={'cards-heart'} color={mealIsFav? 'red' : 'black'} onPress={pressFavHandler} />,
        });
    } , [mealId, navigation, pressFavHandler])  

    return (
        <ScrollView style={{marginBottom: 20}}>
            <Image source={{uri: meal.imageUrl }} style={styles.image}/>
            <Text style={styles.title}>
                {meal.title}
            </Text>
            <View>
                <MealDetails affordability={meal.affordability} complexity={meal.complexity} duration={meal.duration} />
            </View>
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List list={meal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List list={meal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: "center",
    },
    listOuterContainer: {
        alignItems: 'center'
    },
   listContainer: {
    width: '95%'
   }
});