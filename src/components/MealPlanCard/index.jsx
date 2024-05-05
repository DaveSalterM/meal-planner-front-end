import API from '../../../utils/API';
import './styles.css';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
//import { useEffect, useState } from 'react';


const MealPlanCard = (props) => {
    
    //const [listMealPlan, setListMealPlan] = useState([]);

    const handleDeleteRecipe = (recipe) => {
        // console.log("Delete Recipe:",recipe.name, "from",props.day);
        // console.log("User prop", props.user._id);
        // console.log("token", props.token);
        API.removeFromMealPlan(
            props.user._id,
            { recipeId: recipe._id, dayOfWeek: props.day },
            props.token
        ).then((response) => {
            console.log('Recipe removed from meal plan:', response);
            window.location.reload();
        });
    }
    
    const populateRecipes = () => {
        
        const userMealPlan = props.user.meal_plan;
        //const userRecipes = props.user.recipes;
        
        if (userMealPlan !== undefined) {
            if (userMealPlan[props.dayIndex].recipes !== undefined) {
                const listRecipes = userMealPlan[props.dayIndex].recipes.map((recipe, index) => (   
                    <li key={index} className='plan-li'>
                        <Link to={'/recipes/recipedish/' + recipe._id} key={index} className='plan-link'>
                            {`${recipe.name}`}
                        </Link>
                        <FaTrashAlt className="plan-delete" onClick={() => handleDeleteRecipe(recipe)} />
                    </li> 
                ));
                console.log("listRecipes", listRecipes)
                return listRecipes;
                // setListMealPlan(listRecipes);
                // console.log("listMealPlan", listMealPlan)
            }
        }
        console.log("=======================")
    }
    
    // useEffect(() => {
    //     populateRecipes();
    // }, [listMealPlan]);

    return (    
        <div className='plan-card'>
            <div className='plan-card-header'>
                <h2>{props.day}</h2> 
            </div>
            
            <div className='plan-card-body'>
                <ul className='plan-ul'> {populateRecipes()} </ul>
            </div>
            
        </div>
    );
}

export default MealPlanCard;