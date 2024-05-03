import './styles.css';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const MealPlanCard = (props) => {
    
    const handleDeleteRecipe = (recipe) => {
        console.log("Delete Recipe:",recipe.name, "from",props.day);
    }
    
    const populateRecipes = () => {
        
        //const userRecipes = props.user.mealPlan[props.day];
        const userRecipes = props.user.recipes;
        
        if (userRecipes) {
            
            const listRecipes = userRecipes.map((recipe, index) => (   
                    <li key={index} className='plan-li'>
                        
                        
                        <Link to={'/recipes/recipedish/' + recipe._id} key={index} className='plan-link'>
                            {`${recipe.name}`}
                        </Link>
                        <div className="plan-delete" onClick={() => handleDeleteRecipe(recipe)} >
                            {/* <FaTrashAlt id="trash-button" /> */}
                            x
                        </div>
                    </li>
            ));
            return listRecipes;
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