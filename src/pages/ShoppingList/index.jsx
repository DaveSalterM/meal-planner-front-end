/* eslint-disable react-hooks/exhaustive-deps */
import convert from 'convert-units';
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
        
        console.log('Check localList: ', localList)
        if(localList !== undefined) {
            console.log("made it here", localList)
            if(localList[props.userId] !== undefined) {
                for(let i = 0; i < aux.length; i++) {
                    aux[i][1] = localList[props.userId][aux[i][0]._id];
                }
                console.log('IF localList: ', localList)
            }  else {
            let localList = {};
            localList[props.userId] = {};
            console.log('ELSE localList: ', localList)
            aux.forEach((recipe) => {
                localList[props.userId][recipe[0]._id] = 1;
            });
            }   
            localStorage.setItem("userList", JSON.stringify(localList));
        }
        setRecipes(aux);
    }
    
    const updateLocalStorage = () => {
        let localList = JSON.parse(localStorage.getItem("userList"));
            
        
        if(localList !== null) {
            
            if(localList[props.userId] !== undefined) {
                let storedRecipes = {};
                userRecipes.forEach((recipe) => {
                    storedRecipes[recipe[0]._id] = recipe[1];
                });
                
                localList[props.userId] = storedRecipes;
                localStorage.setItem("userList", JSON.stringify(localList));
            
            }
        
        }
        
    };

    // Function converts all unit measurements in shopping list to appropriate display units
    // Called in getShoppingList after the for loops
    const convertUnits = (shoppingList) => {
        
        let convertedAmount = {
            val: 0,
            unit: ""
        };
        
        for(let ingredient in shoppingList) {
            
            // If the ingredient is in grams and the amount is greater than 1 oz and less than 16 oz
            // Convert to oz
            if(shoppingList[ingredient].unit === "g") {

                convertedAmount = convert(shoppingList[ingredient].amount).from('g').toBest({cutoffNumber: 2, exclude: ['in3','ft3','yd3','tsp', 'tbsp', 'cups', 'fl-oz', 'gal', 'qt', 'pnt','t']});
                shoppingList[ingredient] = {"amount": convertedAmount.val, "unit": convertedAmount.unit};
            
            // If ingredient is more than 16 oz OR more than 453.592 grams
            // Distinction is made incase grams are used for large quantities
            } else if ((shoppingList[ingredient].unit === "oz" && shoppingList[ingredient].amount > 16) || shoppingList[ingredient].unit === "g" && shoppingList[ingredient].amount > 453.592) {
                convertedAmount.val = convert(shoppingList[ingredient].amount).from('oz').to('lb');
                convertedAmount.unit = "lb";
                shoppingList[ingredient] = {"amount": convertedAmount.val, "unit": convertedAmount.unit};

            // Just converts 'tbsp' to 'Tbs' for the conversion
            // Then converts to best unit   
            } else if(shoppingList[ingredient].unit === "tbsp") {
                
                convertedAmount = convert(shoppingList[ingredient].amount).from('Tbs').toBest({cutoffNumber: 2, exclude: ['in3','ft3','yd3', 'qt', 'pnt', 'oz', 'lb', 't']});
                if(convertedAmount.unit === "Tbs") convertedAmount.unit = "tbsp";
                shoppingList[ingredient] = {"amount": convertedAmount.val, "unit": convertedAmount.unit};
            
            // Converts all other units to best unit
            } else if (shoppingList[ingredient].unit !== "lb" && shoppingList[ingredient].unit !== "oz") { 
                convertedAmount = convert(shoppingList[ingredient].amount).from(shoppingList[ingredient].unit).toBest({exclude: ['in3','ft3','yd3', 'qt', 'pnt', 'oz', 'lb', 't']});
                shoppingList[ingredient] = {"amount": convertedAmount.val, "unit": convertedAmount.unit};
            }
            // Rounds the amount to 2 decimal places
            shoppingList[ingredient].amount = Math.round(shoppingList[ingredient].amount * 100) / 100;
        }
        return shoppingList;
    }

    // Function to update local storage when the user navigates away from the page
    useBeforeUnload(
        useCallback(() => {
            
            let localList = JSON.parse(localStorage.getItem("userList"));
            let storedRecipes = {};
                userRecipes.forEach((recipe) => {
                    storedRecipes[recipe[0]._id] = recipe[1];
                });

                localList[props.userId] = storedRecipes;
                localStorage.setItem("userList", JSON.stringify(localList));
        }, [userRecipes])
    );


	//Use effect that renders the shopping list when the userRecipes array is updated
	useEffect(() => {
		if (propsLoaded) getShoppingList();
		if (propsLoaded) updateLocalStorage();
	}, [userRecipes]);


	// This works btw
	const getRecipes = (recipeIndex, newQuantity) => {
		setRecipes(
			userRecipes.map((recipe, i) =>
				recipeIndex == i ? [recipe[0], newQuantity] : recipe
			)
		);
	};

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
                        let newAmount = parseFloat(userRecipes[i][0].ingredients[j].amount) * userRecipes[i][1];
                        
                        shoppingList[userRecipes[i][0].ingredients[j].ingredient] = {"amount": newAmount, "unit":userRecipes[i][0].ingredients[j].unit};
                    
                    } else { 
                        
                        //Create amount by multiplying the ingredient amount by the recipe quantity
                        let newAmount = parseInt(userRecipes[i][0].ingredients[j].amount) * userRecipes[i][1];
                        shoppingList[userRecipes[i][0].ingredients[j].ingredient].amount += newAmount;
                    }
                }
            }
        }//End of for loop

        // Convert the units of items in the shopping list
        shoppingList = convertUnits(shoppingList);

        // Convert the shopping list object into an array of JSX elements
        const shoppingListArray = Object.entries(shoppingList).map(([ingredient, { amount, unit }]) => (
        
            <li className="shop-li" key={ingredient}>
                {`${ingredient}: ${amount} ${unit}`}
            </li>
        ));
        
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
            <div className="split right" />
            </>
    );
}
export default ShoppingList;
