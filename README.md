This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## This is a home project for Labster

First of all, from the requirements document, I see that the application 
should be able to manage only the dictionaries, which are a named sets of string pairs (from and to).

From technical requirements I see the app is frontend only, so no backend was implemented. 
Data is being stored in redux store and could be easily moved to e.g. LocalStorage by just adding corresponding middleware.

#### Application consist of:
 + Main page (Overview page)
    + Displaying created dictionaries
    + Removing any dictionary
    + Moving to dictionary edit form
 + Dictionary edit form
    + Creating new dictionaries
    + Editing any dictionary
    + Validating input according to functional requirements
    
#### Application is written in Typescript using React and the following libraries:
 + Bootstrap (+ React Bootstrap)
 + Redux store (+ Redux Toolkit)
 + Final Form (+ React Final Form + React Final Form Arrays)
 + React Router
 + Reselect

#### Notes
 - Validation of clones is redundant, forks check is covering full clone as well.
 If it's a must to display exactly clone error message, this validation should be done in the same way
 by creating another set of concatenated pairs and performing this check first.
 - Redux store is an overkill for such an app. It could have been solved using React context
 - Tests are more like functional tests, so covering functionality, user can face
 - Again, app has no backend, but it should not be an issue as well to write Redux middleware and sync the data

----------

##### _Below sections are kept from CRA README.md_
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
