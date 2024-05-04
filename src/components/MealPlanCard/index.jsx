import './styles.css';
import { Link } from 'react-router-dom';

const MealPlanCard = (props) => {
    
    const handleDeleteRecipe = (recipe) => {
        console.log("Delete Recipe:",recipe.name, "from",props.day);
    }
    
    const populateRecipes = () => {
        
        const userMealPlan = props.user.meal_plan;
        //const userRecipes = props.user.recipes;
        
        if (userMealPlan) {
            if (userMealPlan[props.dayIndex].recipes.length !== 0) {
                const listRecipes = userMealPlan[props.dayIndex].recipes.map((recipe, index) => (   
                    <li key={index} className='plan-li'>
                        <Link to={'/recipes/recipedish/' + recipe._id} key={index} className='plan-link'>
                            {`${recipe.name}`}
                        </Link>
                        <div className="plan-delete" onClick={() => handleDeleteRecipe(recipe)} >
                            x
                        </div>
                    </li> 
                ));
                return listRecipes;
            }
        }
    }
    


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