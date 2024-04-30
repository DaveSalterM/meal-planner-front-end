import './styles.css';


const ShoppingList = (props) => {

    const getRecipies = (e) => {
        console.log("CHECKED: ", e);
            let userRecipes = props.user.recipes.map((recipe) => (
                [recipe, 1]
            ));
            userRecipes[e][1] = userRecipes[e][1] === 0 ? 1 : 0;
            console.log("USER RECIPES: ", userRecipes);
    }

    const renderRecipies = () => {
        
        if(props.user.recipes){
         
            // Get user recipes and tie a quantity to each recipe
            let userRecipes = props.user.recipes.map((recipe) => (
                [recipe, 1]
            ));

            //console.log("GET RECIPES: ", userRecipes);
            const recipesArray = userRecipes.map((recipe, index) => (
                <li className="shop-li" key={recipe[0]._id}>
                <input type="checkbox" value={recipe[1]} onClick={() => getRecipies(index)} defaultChecked/>
                    {recipe[0].name} 
                </li>
            ));
            return recipesArray;
        }
    }
    

    const getShoppingList = () => {
        
        
        // Whole thing breaks if it's not wrapped in this if statement :(
        if(props.user.recipes){
            // Get the user's recipes
            //const userRecipes = props.user.recipes;
            
            let userRecipes = props.user.recipes.map((recipe) => (
                [recipe, 1]
            ));

            userRecipes[2][1] = 0;
            console.log("USER RECIPES: ", userRecipes);
            //console.log("MORE RECIPES: ", moreRecipes);

            // Consolidate ingredients into one array of objects
            // Each object is keyed with the ingredient name and has a value of the total amount and unit
            let shoppingList = {};
            
            // Loop through each recipe
            for (let i = 0; i < userRecipes.length; i++) {
                
                // Loop through each ingredient in the recipe
                for (let j = 0; j < userRecipes[i][0].ingredients.length; j++) {
                    
                    // Passes if the recipe quantity is greater than zero
                    // Quantity is stored in the second element of the userRecipes array
                    if (userRecipes[i][1] > 0) {  
                        
                        // If the ingredient is not already in the shopping list, add it
                        if (!shoppingList[userRecipes[i][0].ingredients[j].ingredient]) {
                            shoppingList[userRecipes[i][0].ingredients[j].ingredient] = {"amount": parseInt(userRecipes[i][0].ingredients[j].amount), "unit":userRecipes[i][0].ingredients[j].unit};
                        
                        } else { 
                            // If the ingredient is already in the shopping list, add the amount to the existing amount
                            shoppingList[userRecipes[i][0].ingredients[j].ingredient].amount += parseInt(userRecipes[i][0].ingredients[j].amount);
                        }
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
            return shoppingListArray;
        }//End of if
    }
        
        return (
            <div>
            
                <div className="shop-card">
                    <div className="shop-header">
                        <div className="shop-title">Recipes</div>
                        <div className="shop-body">
                            <ul className="shop-ul"> {renderRecipies()} </ul>
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
        );
}

export default ShoppingList;