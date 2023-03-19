import React, { useRef, useState, useEffect } from "react";
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AppState,
  DeviceEventEmitter,
  Modal
} from 'react-native';
import  Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from './screens/CategoriesScreen'
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SingleCategoryScreen from './screens/SingleCategoryScreen';
import SingleMealScreen from './screens/SingleMealScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import FavouritesContextProvider from './store/context/favourites-context';
import {Provider} from 'react-redux';
import { store } from './store/redux/store'

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator(){
  return (
    <BottomTab.Navigator sceneContainerStyle={{backgroundColor:'#fafafa'}} screenOptions={{
      tabBarActiveBackgroundColor: 'white',
      tabBarActiveTintColor: 'black',
      tabBarInactiveBackgroundColor: 'white' ,
      tabBarInactiveTintColor: 'grey',
      tabBarLabelStyle: {
        fontSize: 12,
      },
      headerShown: true,
      headerStyle: {
        backgroundColor: '#fafafa',   
        elevation: 0, ///////////////////////////////////////////////////////////////,
        shadowColor: 'black',
      },
      headerTitleAlign: "center",
      headerTintColor: "black",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold'
      },  
      headerShadowVisible: true    
    }}>
      <BottomTab.Screen name='allCategories' component={CategoriesScreen} options={{
        tabBarIcon: ({focused}) => <Icon name="home" size={30} color={focused? 'black' : 'grey'} />,
        tabBarLabel: "Home",
        headerTitle: "Home"
      }} />
      <BottomTab.Screen name='favourites' component={FavouritesScreen} options={{
        tabBarIcon: ({focused}) => <Icon name="heart" size={25} color={focused? 'black' : 'grey'} />,
        tabBarLabel: "Favourites",
        headerTitle: "Favourites"
      }} />
    </BottomTab.Navigator>
  );
}



const App: () => Node = () => {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [modalVisibility, setModalVisibility] = useState(false);



  useEffect(() => {
    const nativeEventListener = DeviceEventEmitter.addListener('ActivityStateChange',
    (e)=>{
      console.log('jjjjjjjjjjjjjjjjjjj')
        console.log(e.event);
        if(e.event === 'background'){
          setModalVisibility(true);
        }
        if(e.event === 'active'){
          setModalVisibility(true);
        }
        console.log(modalVisibility)
    })
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current === 'inactive'
      ) {
        setModalVisibility(true)
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    })}, [modalVisibility])

  return (
    <>
      {/* <FavouritesContextProvider> USING CONTEXT AS A STATE MANAGEMENT TOOL */}
      <Provider store={store}>
      <StatusBar backgroundColor={'#fafafa'} barStyle={'dark-content'} />
      
        <NavigationContainer>
        <Modal animationType="slide"
        transparent={true}
        visible={modalVisibility}><View style={{backgroundColor:'red', flex:1}}></View></Modal>
          <Stack.Navigator>
              <Stack.Screen name="Home" component={BottomTabNavigator} options={{
                // title: 'All Categories',
                headerTransparent: true,
                headerShown: false
              }}/>
              <Stack.Screen name="SingleCategory" component={SingleCategoryScreen}/>
              <Stack.Screen name='SingleMeal' component={SingleMealScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
      {/* </FavouritesContextProvider> */}
    </>
  );
            }

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: 'center'
  },
});

export default App;
