/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import './styles.css';



const ShoppingList = (props) => {
    
    const [userRecipes, setRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    
    // Stores user recipes from props
    // But functions as a boolean to check if props have loaded
    let propsLoaded = props.user.recipes;
    
    if(propsLoaded && userRecipes.length === 0){
        
        let aux = props.user.recipes.map((recipe) => (
                // [Recipe, quantity]
                [recipe, 1]
            ));
        
        const localList = JSON.parse(localStorage.getItem("userList"));
        if(localList !== null) {
            if(Object.keys(localList[props.userId]).length > 0) {
                for(let i = 0; i < aux.length; i++) {
                    aux[i][1] = localList[props.userId][aux[i][0]._id];
                }
            }
        }  
        setRecipes(aux);
    }
    
    const updateLocalStorage = () => {
        let localList = JSON.parse(localStorage.getItem("userList"));
            
        if(localList === null) {
            if(Object.keys(localList[props.userId]).length > 0) {
                let storedRecipes = {};
                userRecipes.forEach((recipe) => {
                    storedRecipes[recipe[0]._id] = recipe[1];
                });

                
                localList[props.userId] = storedRecipes;

                localStorage.setItem("userList", JSON.stringify(localList));
            }
        }
    };

    useBeforeUnload(
        useCallback(() => {
            let storedRecipes = {};
            userRecipes.forEach((recipe) => {
                storedRecipes[recipe[0]._id] = recipe[1];
            });

            let localList = JSON.parse(localStorage.getItem("userList"));
            localList[props.userId] = storedRecipes;

            localStorage.setItem("userList", JSON.stringify(localList));
        }, [userRecipes])
    );

    //Use effect that renders the shopping list when the userRecipes array is updated
    useEffect(() => {    
        if(propsLoaded) getShoppingList();
        //updateLocalStorage();
    }, [userRecipes]);
    
     
    // This works btw
    const getRecipes = (recipeIndex, newQuantity) => {
        
        setRecipes(userRecipes.map((recipe, i) => recipeIndex == i ? [recipe[0], newQuantity] : recipe))
        updateLocalStorage();
    }

    const getShoppingList = () => {        
        // Consolidate ingredients into one array of objects
        // Each object is keyed with the ingredient name and has a value of the total amount and unit
        let shoppingList = {};
        
        // Loop through each recipe
        for (let i = 0; i < userRecipes.length; i++) {
            
            // Loop through each ingredient in the recipe
            for (let j = 0; j < userRecipes[i][0].ingredients.length; j++) {
                
                // Passes if the recipe quantity is greater than zero
                // Quantity is stored in the second element of the userRecipes array 
                if(userRecipes[i][1] > 0) {
                    // IF the ingredient is not already in the shopping list, add it
                    // ELSE add the amount to the existing amount
                    if (!shoppingList[userRecipes[i][0].ingredients[j].ingredient]) {
                        
                        //Create amount by multiplying the ingredient amount by the recipe quantity
                        let newAmount = parseInt(userRecipes[i][0].ingredients[j].amount) * userRecipes[i][1];
                        shoppingList[userRecipes[i][0].ingredients[j].ingredient] = {"amount": newAmount, "unit":userRecipes[i][0].ingredients[j].unit};
                    
                    } else { 
                        
                        //Create amount by multiplying the ingredient amount by the recipe quantity
                        let newAmount = parseInt(userRecipes[i][0].ingredients[j].amount) * userRecipes[i][1];
                        shoppingList[userRecipes[i][0].ingredients[j].ingredient].amount += newAmount;
                    }
                }
            }
        }//End of loop
        
        // Convert the shopping list object into an array of JSX elements
        const shoppingListArray = Object.entries(shoppingList).map(([ingredient, { amount, unit }]) => (
        
            <li className="shop-li" key={ingredient}>
                {`${ingredient}: ${amount} ${unit}`}
            </li>
        ));
        
        //console.log("SHOPPING LIST ARRAY: ", shoppingListArray);
        setShoppingList(shoppingListArray);
    }
  
    return (
        <>
            <div>
                <div className="shop-card">
                <div className="shop-header">
                    <div className="shop-title">Recipes</div>
                    <div className="shop-body">
                        <ul className="shop-ul"> {
                            
                            userRecipes.map((recipe, index) => (
                                <li className="shop-li" key={recipe[0]._id}>
                                    {recipe[0].name} 
                                    <input
                                        type="number"
                                        value={userRecipes[index][1]}
                                        onChange={(e) => getRecipes(index, parseInt(e.target.value))}
                                        //onChange={(e) => {setRecipes(userRecipes.map((recipe, i => index == i ? [recipe[0], e.target.value] : recipe )  ))}}
                                        min={0}
                                    />
                                </li>
                            ))
                        }</ul>
                    </div>
                </div>
            </div> 
            
            <div className="shop-card">
                <div className="shop-header">
                    <div className="shop-title">Shopping List</div>
                    <div className="shop-body">
                        {/* <ul className="shop-ul"> {getShoppingList()} </ul> */}
                        <ul className="shop-ul"> {shoppingList} </ul>
                    </div>
                </div>
            </div>
            </div>
            </>
    );
}

export default ShoppingList;