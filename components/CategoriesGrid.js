import { Pressable, View, Text, Dimensions, ImageBackground, Platform, StyleSheet } from "react-native";

export default function CategoriesGrid({title, image, color, onPress}){
    return (
        <Pressable android_ripple={{color: color}} style={({pressed}) => ({opacity: pressed? 0.75 : null, marginLeft: title == 'Italian'? 25 : null, marginRight: title == 'Salad'? 20 : null, })} onPress={onPress}>
            <View>
                <ImageBackground source={image} resizeMode="cover" style={styles.view} borderRadius={15}>
                <Text style={styles.text} >
                    {title}
                </Text>
                </ImageBackground>
            </View>
        </Pressable>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        fontSize: 40,
        textAlign: 'left',
        color: 'white',
        top: '85%',
        backgroundColor: 'black',
        opacity: 0.75,
        paddingHorizontal: 20,
        width: width/1.3,
    },
    view: {
        paddingHorizontal: 5,
        marginHorizontal: 12,
        height: height/1.6,
        width: width/1.3,
    }
});