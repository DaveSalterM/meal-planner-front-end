# Meal Mapper

![Static Badge](https://img.shields.io/badge/MIT-license?style=flat-square&label=License&labelColor=%23cdcdcd&color=salmon)

## Description

This application provides a HUB for food enthusiasts to share their favorite dishes. If you have a Michelin star dish you want to share, or a family secret recipe, this application will allow you to do just that. You can create your own recipes and share it with everyone, or find another user's greatest masterpiece. If you fall in love with a certain dish, you can save it to your favorites by pressing the like button. You also have your own profile to view all the recipes you have created, your favorite recipes, and you can even edit your recipes!

Deployed Application: [click me!](https://mealmapper.netlify.app/)

## Installation

The link above is the current, active site, so you, the user, do not need to install anything. However, if you believe you can add even better features, or change anything that you do not like, feel free to clone the repo onto your local machine. Please note that this application requires Node.JS and MongoDB installed for it to work properly. This repo is specifically for the front end. If you want to clone the back-end repo, go here: [The Back-End](https://github.com/DaveSalterM/meal-planner)

Additionally, you may need to change some configurations in both the front-end and back-end repositories. In the front-end repo (this repo), you will need to head to the `utils` folder and update the `URL_PREFIX` in the `API` file. There is already a localhost link that is commented out. Comment that one back in and comment out the onrender URL. In the back-end repo (link above), you will need to edit the `connection.js` file in the `config` folder. All that needs to be changed is commenting out `connectionString` and commenting in the one below it (also called `connectionString`). Additionally, head over to the `uploadController.js` file in the `controllers` foler and comment out `lines 10-12` and comment in `lines 7-9`. Lastly, create your own `.env` file in the root directory and add `TOKEN_SECRET=` and add any string that you want.

In both repos, install all npm packages required:

```
npm i
```

Then in the back-end repo, run the seed to seed some pre-made data:

```
npm run seed
```

Additionally, in the back-end repo, run this command in the root directory:

```
nodemon
```

After all of these steps, in the front-end repo, run this command in the root directory:

```
npm run dev
```

## Usage

This application is mainly used to connect food enthusiasts together and share their recipes. You can try and create a recipe off the top of your head or upload a recipe that you think other users would love.
See below for a peek at our website:

![](/assets//mealmap.jpg)
![](/assets/meal%20map%201.jpg)

## Technologies

- React.JS
- MongoDB
- HTML
- CSS
- Javascript

## Resources

React packages used:

- react-router-dom
- react-icons
- react-toastify

NPM packages used:

- convert-units
- fracty
- numeric-quantity

Other functional npm packages required for the back-end to function:

- Express
- bcrypt
- jsonwebtoken
- mongoose
- multer

## Contributing

Feel free to reach out for any issues, remarks, or feature requests!

## Contact Us

Contributors contact:

GitHub accounts: [Kyle Yee](https://github.com/kyleyee522), [Willie Yeh](https://github.com/willieyeh1), [David Salter](https://github.com/DaveSalterM), and [Keanu Ford](https://github.com/KeanuFord)
