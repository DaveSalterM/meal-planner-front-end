import './styles.css';
//import Card from 'react-bootstrap';


const ShoppingList = (props) => {

    if(props.user.recipes){
        const userRecipes = props.user.recipes;
        console.log("USER RECIPES: ", userRecipes);
    
        // Consolidate ingredients into one array of objects
        // Each object is keyed with the ingredient name and has a value of the total amount and unit
        let shoppingList = {};
        for (let i = 0; i < userRecipes.length; i++) {
            for (let j = 0; j < userRecipes[i].ingredients.length; j++) {
                if (!shoppingList[userRecipes[i].ingredients[j].ingredient]) {
                    shoppingList[userRecipes[i].ingredients[j].ingredient] = {"amount": parseInt(userRecipes[i].ingredients[j].amount), "unit":userRecipes[i].ingredients[j].unit};
                } else {
                    shoppingList[userRecipes[i].ingredients[j].ingredient].amount += parseInt(userRecipes[i].ingredients[j].amount);
                }
            }
        }
        console.log("SHOPPING LIST: ", shoppingList);
    }     
       
    return (
        <div>
            <h1>Shopping List</h1>
        </div>
    );
    
}

export default ShoppingList;