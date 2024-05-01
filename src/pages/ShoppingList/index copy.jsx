import './styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import API from '../../../utils/API';

const ShoppingList = (props) => {
    console.log("token: ", props.token);
    console.log("userId: ", props.userId);

    const [userRecipes, setRecipes] = useState([]);
    
    // Stores user recipes from props
    // But functions as a boolean to check if props have loaded
    let propsLoaded = props.user.recipes;
    
    if(propsLoaded && userRecipes.length === 0){
        let aux = props.user.recipes.map((recipe) => (
            // [Recipe, quantity]
            [recipe, 1]
        ));
        console.log("AUX: ", aux);
        setRecipes(aux);
        console.log("Recipe initialize: ", userRecipes);   
    }
    
    useEffect(() => {
        getShoppingList();
    }, [userRecipes]);

    // const [isLoading, setIsLoading] = useState(true);
    // console.log("PROPS: ", props);
    // useEffect(() => {
    //     if(propsLoaded) {
    //         API.getOneUser(props.userId).then((res) => {
    //             console.log("USESTATE RECIPES: ", res.recipes);
    //             setRecipes(res.recipes);    
    //         })
    //         .then(() => { 
    //             setIsLoading(false);
    //         });
    //     }
    // }, [props.userId]);    
    // console.log(".THEN RECIPES: ", stateRecipes);
    
    
     
    // This works btw
    const getRecipes = (index, value) => {
        
        let aux = userRecipes;
        aux[index][1] = value
        setRecipes(aux);
        console.log("GET RECIPES: ", userRecipes);
    }

    const renderRecipes = () => {
        
        if(propsLoaded){
            //console.log("GET RECIPES: ", userRecipes);
            const recipesArray = userRecipes.map((recipe, index) => (
                <li className="shop-li" key={recipe[0]._id}>
                    {recipe[0].name} 
                    <input
                        type="number"
                        value={userRecipes[index][1]}
                        onChange={(e) => getRecipes(index, parseInt(e.target.value))}
                        min={0}
                    />
                </li>
            ));
            return recipesArray;
        }
    }
    

    const getShoppingList = () => {
        
        //console.log("getShoppingList > Props: ", props.user.recipes)
        console.log("getShoppingList > userRecipes ", userRecipes);
        
        // Whole thing breaks if it's not wrapped in this if statement :(
        if(propsLoaded){
            
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
                    } else {
                        console.log("ELSE: ", userRecipes[i][0].ingredients[j].ingredient, userRecipes[i][1]);
                    
                    }
                }
            }//End of loop
            
            console.log("SHOPPING LIST: ", shoppingList);
            // Convert the shopping list object into an array of JSX elements
            const shoppingListArray = Object.entries(shoppingList).map(([ingredient, { amount, unit }]) => (
            
                <li className="shop-li" key={ingredient}>
                    {`${ingredient}: ${amount} ${unit}`}
                </li>
            ));
            //console.log("SHOPPING LIST ARRAY: ", shoppingListArray);
            return shoppingListArray;
        
        }//End of if(propsLoaded)
    }
  
    return (
        <>
            <div>
                <div className="shop-card">
                <div className="shop-header">
                    <div className="shop-title">Recipes</div>
                    <div className="shop-body">
                        <ul className="shop-ul"> {renderRecipes()} </ul>
                    </div>
                </div>
            </div> 
            
            <div className="shop-card">
                <div className="shop-header">
                    <div className="shop-title">Shopping List</div>
                    <div className="shop-body">
                        <ul className="shop-ul"> {getShoppingList()} </ul>
                    </div>
                </div>
            </div>
            </div>
            </>
    );
}

export default ShoppingList;