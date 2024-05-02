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
    console.log('propsLoaded: ', props.user.recipes)
    if(propsLoaded && userRecipes.length === 0){
        console.log('passed with prop: ', props.user.recipes)
        let aux = props.user.recipes.map((recipe) => (
                // [Recipe, quantity]
                [recipe, 1]
            ));
        
        const localList = JSON.parse(localStorage.getItem("userList"));
        console.log('localList: ', localList)
        console.log('localList: ', localList[props.userId])
        if(localList !== null) {
            if(localList[props.userId] !== undefined) {
                for(let i = 0; i < aux.length; i++) {
                    aux[i][1] = localList[props.userId][aux[i][0]._id];
                }
            }
        }  else {
            let localList = {};
            localList[props.userId] = {};
            aux.forEach((recipe) => {
                localList[props.userId][recipe[0]._id] = 1;
            });
            localStorage.setItem("userList", JSON.stringify(localList));
        }
        console.log('aux: ', aux)
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
                console.log('storedRecipes: ', storedRecipes)
                console.log('localList: ', localList[props.userId]);
                localStorage.setItem("userList", JSON.stringify(localList));
            
            }
        
        }
        
    };

    useBeforeUnload(
        useCallback(() => {
            
            let localList = JSON.parse(localStorage.getItem("userList"));
            let storedRecipes = {};
                userRecipes.forEach((recipe) => {
                    storedRecipes[recipe[0]._id] = recipe[1];
                });

                localList[props.userId] = storedRecipes;
                console.log('storedRecipes: ', storedRecipes)
                console.log('localList: ', localList[props.userId]);
                localStorage.setItem("userList", JSON.stringify(localList));
        }, [userRecipes])
    );

    //Use effect that renders the shopping list when the userRecipes array is updated
    useEffect(() => {    
        if(propsLoaded) getShoppingList();
        if(propsLoaded) updateLocalStorage();
    }, [userRecipes]);
    
     
    // This works btw
    const getRecipes = (recipeIndex, newQuantity) => {
        
        setRecipes(userRecipes.map((recipe, i) => recipeIndex == i ? [recipe[0], newQuantity] : recipe))
    }

    const getShoppingList = () => {        
        // Consolidate ingredients into one array of objects
        // Each object is keyed with the ingredient name and has a value of the total amount and unit
        let shoppingList = {};
        console.log('userRecipes: ', userRecipes)
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
                        console.log(userRecipes[i][0].ingredients[j].ingredient, userRecipes[i][1])
                        let newAmount = parseInt(userRecipes[i][0].ingredients[j].amount) * userRecipes[i][1];
                        let convertedAmount = convert(newAmount).from(userRecipes[i][0].ingredients[j].unit).toBest({cutoffNumber: 2});
                        console.log('converted amount for: ' ,userRecipes[i][0].ingredients[j].ingredient,newAmount ,userRecipes[i][0].ingredients[j].unit, convertedAmount)
                        shoppingList[userRecipes[i][0].ingredients[j].ingredient].amount += convertedAmount.val;
                        shoppingList[userRecipes[i][0].ingredients[j].ingredient].unit = convertedAmount.unit;
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