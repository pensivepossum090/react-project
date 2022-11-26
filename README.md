# Development

### Link to Deployed Website
If you used the stencil code, this is https://pensivepossum090.github.io/react-project/

### Goal and Value of the Application 
The goal of this project was to create a bakery where someone can add different items to their cart, see the their cart, see the total price, and sort the item options by price and filter them by whether they are round and tasty. The value of this application for a user is they are able to see different items and gain information on whether they should buy them from the bakery based on price, roundness, an image, and taste. 

### Usability Principles Considered
I tried to create a clear visual heirarchy by putting a border around each item and having the background colors be different. Additionally I tried to make all interactive elements visually respond so that a user wouldn't be unsure when they click on an item. I labeled all my checkboxes even though some had title labels so a user would know what the box is for. I tried to make an interface that was easily learnable by having the cart at the bottom, matching user's mental models of ecommerce sites and have the checkboxes be very simple.

### Organization of Components
I only have one component within App.js. This was the BakeryItem component which displayed a single item's name, a picture of it, it's price, and options to add it and remove it from the cart. All the filter and sorting functions were just in the main App.js. I made BakeryItem components for each individual item by mapping a json that had info on all the bakery items. 

### How Data is Passed Down Through Components
There is a data json which contains all the bakery item info. I mapped the array into BakeryItem components which took in each key-value pair as props in the component. 

### How the User Triggers State Changes
I had a number of state variables which were updated with different user actions. When a user clicked a button, it would call some function that would in turn call at least one update state function. This would update the state variable as defined in the function called, updating the state variables and instantly displaying on the site. For example, when a filter checkbox is checked, a function would be called that would update a state counter variable that would dictate exactly how a state variable holding the BakeryItems would be modified. 

