import { createContext, useState } from "react";

export const FavouritesContext = createContext({
    ids: [],
    addFavourite: (id) => {},
    removeFavourite: (id) => {}
});

export default function FavouritesContextProvider({children}){

    const [favMealsIds, setFavMealsIds] = useState([]);

    function addFavourite(id){
        setFavMealsIds((currentIds) => [...currentIds, id]);
    }

    function removeFavourite(id){
        setFavMealsIds((currentIds) => currentIds.filter(mealId => mealId !== id));
    }

    const value= {
        ids: favMealsIds,
        addFavourite: addFavourite,
        removeFavourite: removeFavourite,
    }

    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}