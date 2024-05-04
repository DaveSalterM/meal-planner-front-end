import './styles.css';
import MealPlanCard from '../../components/MealPlanCard'

const MealPlan = (props) => {
    return (
        <div className='meal-plan'>
            <h1>Meal Plan</h1>
            <MealPlanCard day={'Sunday'} user={props.user} token={props.token} dayIndex={0} />
            <MealPlanCard day={'Monday'} user={props.user} token={props.token} dayIndex={1}/>
            <MealPlanCard day={'Tuesday'} user={props.user} token={props.token} dayIndex={2}/>
            <MealPlanCard day={'Wednesday'} user={props.user} token={props.token} dayIndex={3}/>
            <MealPlanCard day={'Thursday'} user={props.user} token={props.token} dayIndex={4}/>
            <MealPlanCard day={'Friday'} user={props.user} token={props.token} dayIndex={5}/>
            <MealPlanCard day={'Saturday'} user={props.user} token={props.token} dayIndex={6}/>
        </div>
    );
}

export default MealPlan;