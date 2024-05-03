import './styles.css';
import MealPlanCard from '../../components/MealPlanCard'

const MealPlan = (props) => {
    
    return (
        <div className='meal-plan'>
            <h1>Meal Plan</h1>
            <MealPlanCard day={'Sunday'} user={props.user}/>
            <MealPlanCard day={'Monday'} user={props.user}/>
            <MealPlanCard day={'Tuesday'} user={props.user}/>
            <MealPlanCard day={'Wednesday'} user={props.user}/>
            <MealPlanCard day={'Thursday'} user={props.user}/>
            <MealPlanCard day={'Friday'} user={props.user}/>
            <MealPlanCard day={'Saturday'} user={props.user}/>
        </div>
    );
}

export default MealPlan;