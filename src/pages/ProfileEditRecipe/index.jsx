import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../../utils/API';
import EditRecipe from '../../components/EditRecipe';
import RecipeCard from '../../components/RecipeCard';

import './styles.css';
<h1>Profile</h1>;

const ProfileEditRecipe = ({ user, userId, token }) => {
	const navigate = useNavigate();

	const [userRecipes, setUserRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (userId !== 0 && Object.keys(user).length !== 0) {
			API.getOneUser(userId)
				.then((user) => {
					setUserRecipes(user.recipes);
				})
				.then(() => setIsLoading(false));
		}
	}, [userId, user]);

	const handleLogout = () => {
		// Perform logout logic here
		// props.logout();
		// navigate('/login');
	};

	return (
		<div className="entirepage">
			<div className="sidebar-column">
				<ul className="sidebar">
					<li id="side-item">Favorites</li>
					<li id="side-item">Change Password</li>
					<li id="side-item">Edit Recipes</li>
					<li id="side-item">Your Recipes</li>
					<li id="side-items" className="sidebars" onClick={handleLogout}>
						Logout
					</li>
				</ul>
			</div>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className="test">
					{userRecipes.map((recipe) => (
						<div key={recipe._id}>
							<Link to={`/recipes/recipedish/${recipe._id}`}>
								<RecipeCard
									image={recipe.imgUrl}
									id={recipe._id}
									user={user}
									userId={userId}
									token={token}
								/>
							</Link>

							<div className="name-and-edit">
								<h1>{recipe.name}</h1>
								<Link to={`/profile/editrecipes/${recipe._id}`}>
									<button>Edit</button>
								</Link>
							</div>
						</div>
					))}
					{/* <EditRecipe /> */}
				</div>
			)}
		</div>
	);
};
export default ProfileEditRecipe;
