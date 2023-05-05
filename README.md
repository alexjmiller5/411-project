# 411-Project

FreeWater is an iOS app created to connect Users with nearby Water Fountains in an attempt to cutdown on plastic bottle waste. Our app uses Google Firebase's Realtime database to store user accounts and information about water fountains. Written in Javascript using the React Native Expo framework, with a decoupled database architecture through our restful interface. This interface makes used of the Axios package to send https requests to our firebase database and return the results to our Javascript front end. This interface is wrapped in a series of functions in the Rest.js file. The two API's used are the Google Maps Direction API used to generate a route from the user's current location to that of the nearest water fountain. Secondly we make use of the Quotes API and the service RapidAPI, (https://rapidapi.com/martin.svoboda/api/quotes15), to pull random quotes and display them on the home screen. Lastly we use Google Oauth in order for users to be able to easily and quickly login / signup. 


### Four Requirements
- 2 External APIs
- OAuth
- Database
- Front & Back End

### Preliminary Ideas
- Mass text software
- Countdown app
- Card game (something like quiplash, uno)
- Mobile ChatGPT app
- App with water fountain locations
- App to help first-years find their classes
- App to connect people to play pickup sports if you want to
- BeMeal (Copy of bereal for meals) (set times for meal picture reminders)
- Export StudentLink class schedule to Google Calendar

# Idea #1: **FREE WATER**

- Mobile app that tells you the location of the nearest water fountain on a college campus
- Has the expressed purpose of helping people get water for free, and saving the environment from plastic water bottles!
- **FREE can double as an adjective and a verb**
- Login using your school email (OAuth)
- Use GoogleMaps API to show how to get to the water fountain (First API)
- Environtal facts API (https://www.epa.gov/enviro/envirofacts-data-service-api)
- Swift mobile app (Front End)
- Store user information about favorite water fountain locations and personal profile information (Database)
- Water boittle saved counter
- Use floor plans of buildings to spot water fountains

# Idea #2 : **ChatGPT MESSENGER APP**
- We will create a chat app that will allow users to directly chat an AI posing as with anyone they wish
- We will use openAI's ChatGPT AI chat bot along with a description of the desired person in order to replicate this 
- Users will need to create account for OAuth
- An additional API we can call is Wastons sentiment analysis to give each conversation a score, it will start at neutral and we will also pass this conversation score to ChatGPT in order to influence responses.
- The database will store user's login information, contacts the user creates in the form of a name, description and sentiment score.
- The front end will be a simple messenger application with where the user can create a contact by adding a name and description, they will also be able to view past conversations. 
- To generate responses we will feed the following prompt to ChatGPT: you are a person described by the following description, *description*, your name is *name*, so far in your conversation I have been nice or mean to you on a scale of *current sentiment score* out of *maximum sentiment score*, respond to the following *user message*
