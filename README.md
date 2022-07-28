# Throw Down the Gauntlet

A foam fighting tournament orginazation and scorekeeping app

## Technologies Used

* React
  * React-Router-Dom
* Firebase
  * Authentication
  * Firestore
  * AppCheck
* TailwindCSS
* MaterialUI
* Node.js
  * NPM

## Description

Foam fighting has some niche tournament styles and none of the major tournament organization applicaitons out there supprt these styles. Throw Down the Guantlet aims to let foam fighters create and manage the tournaments they know and love.

## View the site at
[Throw Down the Gauntlet](https://tournaments.blackspire.site/)

## Setup/Installation Requirements

### Getting the Repository

* Clone this repository to your desktop or any directory of your choice
  * Run the command below in a bash terminal with [git](https://github.com/git-guides/install-git) installed
```
git clone https://github.com/CamLRay/Throw-Down-The-Gauntlet.git
```
* Or download as a zip file
  * Click the green code button on the repository page
  * At the bottom of the popup window select `Download ZIP`
  * Extract the downloaded .zip folder

### Installing Dependencies

* Make sure you have [node](https://nodejs.org/en/download/) installed
* Open bash terminal in the top level of this directory
* Run `npm install` to install dependencies

### Adding firebase config

* This project does not include the firbase API information you need, you must create your own in order to use this app locally
  * Sign up for [Firebase](https://firebase.google.com/)
  * In your firebase console add a project
    * Navigate to the project and register a web app
    * copy the Firebase SDK file 
    ```
    const firebaseConfig = {
      apiKey: <Your apiKey>,
      authDomain: <Your authDomain,
      projectId: <Your projectId>,
      storageBucket: <Your storageBucket>,
      messagingSenderId: <Your messagingSenderId>,
      appId: <Your appId>
    };
    ```
    * Replace the firebase config in the projects firebase-config.js file
  * In the project on the left hand panel add Authentication.
    * Select Sign-in method and add Email/Password
  * In the project on the left hand panel add Firestore Database.
    * Create database follow prompts - test mode is fine for now 
    * Once datasbase is provisioned add a collection with Collection id "tournaments" lowercase
      * Auto id
      * no fields
  * You're ready to use the app!
  ```
    npm run start
  ```


## Known Issues
* A lot of the tournament styles are unselectable. These are coming soon!
* No categories
* Design isn't always responsive


### Research & Planning Log
#### Friday, 07/08
* 8:15: Research Firebase with firestore vs mongoDB or MySQL - Firebase for now
* 8:45: Research UI libraries - Material-UI looking good
* 8:55: try out Material-UI and read googles design guidelines
* 9:30: Implemented Material UI on a past project.
* 9:40: Research rating systems, Elo TrueSkill.
* 9:47: Dig deeper into TrueSkill npm package. (TrueSkill allows non-commercial projects SWEET!)
* 10:05: Begin writing user stories.
* 11:45: Beging drawing initial component diagram.
* 2:00: Begin writing proposal
* 3:00: Research Middleware
* 3:20: Test out firebase
* 4:00: Planning Data structure
* 4:30: query requirements


#### Friday, 07/15
* 8:00: Research similar apps to find ideas I like and don't like.
* 8:43: Research bracket calculation algorithms. 

#### User Stories MVP
* A user should be able to create a new tournament as a Tournament Organizer.
* A user should be able to select a tournament style.
* A user should be able to input tournament participants in bulk or individually.
* A user should be able to track scores throughout the tournament.
* For king of the hill and warlord style tournaments users sould be able to track winstreaks or automatically track and store winstreaks.
* For KOTH and Warlord Style, a user should be able to press a button to increment users wincount.

#### User Stories Stretch
* A user should have a profile with fight histoy, rating and statistics.
* A user should be able to sign up for a tournament via a sign up link.
* A Tournament organizer should be able to search users to add to the tournament by an identifier.
* A user should bable to challenge another user to a ranked fight and submit the record.
* A user should be able to set timed tournaments KOTH Warlord style.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022 Cameron Ray
