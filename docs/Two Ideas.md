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
Installations Used to Create this Project