
import { FlatList, View, Text, Dimensions, } from "react-native";
import { StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoriesGrid from "../components/CategoriesGrid";


export default function CategoriesScreen({navigation}){

    function renderCategory(itemData){

        function pressHandler(){
            navigation.navigate('SingleCategory', {categoryId: itemData.item.id});
        }
    
        return (
            <CategoriesGrid title={itemData.item.title} image={itemData.item.image} color={itemData.item.color} onPress={pressHandler}/>
        );
    };

    return (
            <View style={styles.rootContainer}>
                <View>
                    <FlatList data={CATEGORIES} renderItem={renderCategory} keyExtractor={item => item.id } horizontal={true} showsHorizontalScrollIndicator={false}/>
                </View>
            </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});