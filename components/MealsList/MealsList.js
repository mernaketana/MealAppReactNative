import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "./MealItem";



function renderMeal(itemData){
    const item = itemData.item;
    const mealItemProps={
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        duration: item.duration,
        complexity: item.complexity,
        affordability: item.affordability
    }

     

    return <MealItem {...mealItemProps}/>
}

export default function MealsList({displayedMeals}){
    return(
        <View style={styles.container}>
            <FlatList data={displayedMeals} renderItem={renderMeal} keyExtractor={item => item.id}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});