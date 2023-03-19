import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { MEALS, CATEGORIES } from "../data/dummy-data";

export default function SingleCategoryScreen({route, navigation}){

    const categoryId = route.params.categoryId; 
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId));

    useLayoutEffect(() => { // When we want the change to happen simultaneously while rendering and not after
        const categoryName = CATEGORIES.find(category => category.id == categoryId).title;
        navigation.setOptions({
            title: categoryName
        });
    }, [categoryId, navigation])

    return(
        <MealsList displayedMeals={displayedMeals} />
    )
}