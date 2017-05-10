## Product Delivery
 Final product hosted at https://seattle-foodsafety.herokuapp.com/ 

## Product Plan Components
### Problem Statement: 
  - King County's Health Department has populated inspection results for food service establishments since 2006. Food inspection data is important because people should be aware of unsafe food services and protect their health.
  - My goal is to build an interactive web tool to make the public aware of food inspection violations and help them identify safe food establishments in their neighbourhoods.
  
### Personal Learning Goals: 
  - Learn a new JavaScript-based MVC stack: MongoDB/SQL, Express.js, Angular.js and Node.js. 
  - Learn to consume API using JavaScript.
  - Learn D3.js for data visualization.

### Market Research: 
  I built a similar dashboard in Tableau before. However, there are things that I couldn't achieve in Tableau and hope to improve with JavaScript:
  - Tableau is NOT free. A license is very expensive and once expired, the dashboard creator won't be able to edit a past project. Therefore, it's impossible to update my previous dashboard with the latest data from King County.
  - Tableau Public is a web platform hosting final visualization products. Interactivity with visualizations is very slow for large datasets because visualizations are stored in Tableau Public in image format. Building my own dashboard website in JavaScript will allow faster interactivity with visualizations.
  - As far as I know, Tableau doesn't consume API.
  
### User Personas:
  - Main target user group: the general public.

### Trello Board:
  - Trello board: https://trello.com/b/puOnm0iz/capstone-food-inspection
  
### MVP Feature Set: 
  - User can see the list of all food service establishments (aka businesses) in Seattle.
  - User can filter businesses based on 3 criteria: 
      - Safe or Unsafe (based on the latest inspection results)
      - Seat Capacity / Type
      - Zip Codes
  - User can see address, phone number and business license number of any business.
  - User can click on a business and search with Bing.
  - User can reset the search process and start from scratch.
  - User can see a map visualization showing geographical distribution of safe or unsafe businesses.
   
### Technology selections:
  - Front-end: 
      - Angular.js
      - D3.js
  - Back-end: 
      - Node.js
      - Express.js
      - MongoDB
  - Infrastructure: 
      - Heroku for website hosting
      - mLab for MongoDB database hosting
  - Food Inspection API: https://data.kingcounty.gov/Health/Food-Establishment-Inspection-Data/f29f-zza5#showMore
 
 
  
  
