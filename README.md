# 411-Project

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

# Additional Ideas:
# Recipe recommendation application: 
- Users input their dietary preferences, cooking skill level, and available ingredients. (Stored in database)
- Two data sets via API: 
  1. Nutritional information about various ingredients
  2. Recipes
- Third-party authentication will be implemented to allow users to log in with Google or Facebook using OAuth.
- Front end: app - drop-down menus to select dietary preferences, cooking skill level, and available ingredients out of given options, displays results.

# Travel planning application: 
- Users input their travel destination, budget, and preferences. (Stored in database)
- Two data sets via API: 
  1. Travel information such as popular tourist destinations, local events, and user ratings for activities and accommodations
  2. Local weather conditions
- Third-party authentication will be implemented to allow users to log in with Google or Facebook using OAuth.
- Front end: app or website - users input travel destination, budget, and preferences and a timetable with activities and their costs are shown.
- Alternatively, users could choose not to input their travel destination, and a world map would be shown with possible destinations highlighted with extra information when clicked on.
