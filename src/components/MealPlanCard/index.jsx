import './styles.css';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const MealPlanCard = (props) => {
    
    const populateRecipes = () => {
        
        //const userRecipes = props.user.mealPlan[props.day];
        const userRecipes = props.user.recipes;
        
        if (userRecipes) {
            
            console.log("User Recipes",  userRecipes)
            const listRecipes = userRecipes.map((recipe, index) => (   
                    <li key={index} className='plan-li'>
                        <Link to={'/recipes/' + recipe._id} key={index} className='plan-link'>
                            {`${recipe.name}`}
                        </Link>
                        
                    </li>
            ));
            console.log("List Recipes",  listRecipes);
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