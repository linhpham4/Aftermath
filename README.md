# Aftermath
An app to split a restaurant bill between friends.

### Say goodbye to doing math after a dinner night out

Are you sick of pulling out that calculator app after a nice dinner night out with friends, painstakingly trying to split an item three-way while struggling to remember the total you had calculated for yourself thus far so you can later add on to that amount? Are you just as confused reading that sentence as you are doing those calculations? Don't forget about the tip, too.

Splitting a bill fairly can be a troublesome task when dining out with a large party. Items are at risk of either being skipped over or counted twice, dishes can be shared between multiple people thus resulting in an extra calculation to be made, dividing tax and tip adds yet another pesky step, and any mistakes in the process will inevitably lead back to square one.

### Features

Users will be able to:
- Upload an image of their receipt
- Edit any incorrect values after the image as been converted to text
- Add names of their party members to the bill
- Assign line items to the person who ordered it
- Split the cost of a single line item between multiple people
- Each person's individual total and total with tax + tip will automatically be calculated

## Getting Started

### External API
- This app uses the Veryfi OCR API to convert images to text. To generate the API key, client ID, and username needed to make POST requests, sign up for a free account here: https://www.veryfi.com/
- Verify your email to set up your portal account
- After logging into your account, open up settings on the left sidebar and go to keys to find the necessary information. Make an .env file in the aftermath-server directory and fill in the corresponding variables from .env.sample.

### Setting up
#### Server directory
- Make a new local database and fill in the rest of the variables in the server .env file.
- Run `npm install` to install necessary dependencies.
- Run `npx knex migrate:latest` to create tables in your database.
- Run `npx knex seed:run` to populate the tables with mock data.
- Run `npm run start` to start your server.
#### Client directory
- Make an .env file in the aftermath-client directory and fill in the variable as seen in .env.sample.
- Run `npm install` to install necessary dependencies.
- Run `npm run dev` to start client side.

## How to use the app
### Home page
- Upload a photo of your receipt and click the upload button.
- An alert will pop up and you will have to wait a few second for the image to be converted.
- The image will be saved in the public/images directory in the server.
- The bills and items table will be updated with the new data from the bill.

### Edit page
- Once the edit page loads, you can edit any text in black if any amounts or item names are incorrect.
    - Changing the price of any items will update the subtotal and total.
    - Changing the price of the tax or tip will update the total.
- To add a person to the bill, click the + button on the top left.
    - A name must be entered into the input field otherwise and error message will appear.
    - If you decide you do not want to add a person, click the x to close the modal.
- To assign a person to an item, click on their avatar in the item section.
    - The avatar of people who are assigned to the item will be bright.
    - The avatar of people who are not assigned to the item will be darkened.
    - Upon assigning, the total of the person's portion of the bill will automatically change at the top.

## Future Implementations
- Incorporate camera feature so users can take a picture of receipt directly from the app
- Implement user login feature so users can manage their past bills
    - Keep track of amounts that have not been paid back and by whom
    - Check off a person who has already paid back what they owe
- Add people from user's phone contacts to the bill
- Allow users to request payment from party members via payment apps like Venmo

