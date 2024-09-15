# Project Title
Aftermath

## Overview

An app to split a restaurant bill between friends.

### Problem Space

Are you sick of pulling out that calculator app after a nice meal with friends, painstakingly trying to split an item three-way while struggling to remember the total you had calculated for yourself thus far so you can later add on to that amount? Are you just as confused reading that sentence as you are doing those calculations? Don't forget about the tip, too.

Splitting a bill fairly can be a troublesome task when dining with a large party. Items are at risk of either being skipped over or counted twice, dishes can be shared between multiple people thus resulting in an extra calculation to be made, dividing tax and tip adds yet another pesky step, and any mistakes in the process will inevitably lead back to square one.

### User Profile

Groups of people dinning in restraurants:
- Where the number of people in the party outweighs that of which a bill can be split due to restaurant policy
- Looking to avoid the tedious calculations that comes with splitting the bill

### Features

Users will be able to:
- Upload an image of their receipt
- Add names of their party members to the bill
- Assign line items to the person who ordered it
- Split the cost of a single line item between multiple people
- Divide tax and tip proportionally

## Implementation

### Tech Stack

- React
- Express
- MySQL
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express

### APIs

- Veryfi OCR API (limit of 100 calls per month)

### Sitemap

- Home page
- Edit page

### Mockups

#### Home Page
![](proposal-files/home-page.png)

#### Edit Page
![](proposal-files/edit-page.png)

### Data

![](proposal-files/sql-tables.png)

### Endpoints

**POST /bills**
- Makes a POST request to Veryfi API and adds the response body into database

Response:
```
{
    "bill_id": 2,
    "bill_tax": 2.93,
    "bill_tip": 6.75,
    "bill_total": 54.68,
    "bill_items": [
        {
            "item_id": 6,
            "item_name": "Margherita Pizza",
            "item_quantity": 1,
            "item_total": 20.00,
            "item_split": 0
            "item_members_id": []
        },
        ...
    ]
}

```

**GET /bills/:id**
- Get all details for the bill a user uploaded

Parameters:
- id: Bill id as a number

Response:
```
{
    "bill_id": 2,
    "bill_tax": 2.93,
    "bill_tip": 6.75,
    "bill_total": 54.68,
    "bill_items": [
        {
            "item_id": 6,
            "item_name": "Margherita Pizza",
            "item_quantity": 1,
            "item_total": 20.00,
            "item_split": 0
            "item_members_id": []
        },
        ...
    ]

}

```

**PUT /bills/:id**
- Users will be able to update item name, item quantity, item total, tip amount, tax amount, total amount, add members to split bill between, add a member to split an item between

Parameters:
- id: Bill id as a number

Response:
```
{
    "bill_id": 2,
    "bill_tax": 2.93,
    "bill_tip": 6.75,
    "bill_total": 54.68,
    "bill_items": [
        {
            "item_id": 6,
            "item_name": "Margherita Pizza",
            "item_quantity": 1,
            "item_total": 20.00,
            "item_split": 3
            "item_members_id": [1, 2, 3]
        },
        ...
    ],
    "bill_members": [
        {
            "member_id": 1,
            "member_name": "Ed",
            "member_total": 6.67,
            "member_items_id": [6]
        },
        ...
    ]

}

```

## Roadmap

- 1 pt = 30 mins
- 2 pt = 1 hour
- 3 pt = <4 hours
- 5 pt = Whole day
----------------------------------------------------------------------------
- Set Up
    - Create react project for front-end and push to GitHub repo (1 pt)
    - Create SASS variables, mixins, typography (2 pt)
    - Create express project for back-end and push to GitHub repo (1 pt)
    - Set up migration and seed with data from 10 collected receipts (3 pt)

- Feature: Home Page
    - Set up HTML and SCSS in front-end (2 pt)
    - Implement upload image feature (2 pt)

- Feature: Edit Page
    - Set up HTML and SCSS for front-end, including what will be dynamic (3 pt)
    - Set up POST /bills on back-end (3 pt)
    - Implement POST /bills in front-end (3 pt)
    - Set up GET /bills/:id (2 pt)
    - Implement GET /bills/:id in front-end (3 pt)
    - Set up PUT /bills/:id (2 pt)
    - Implement PUT /bills/:id in front-end (3 pt)

- Tesing and debugging (5 pt)

- DEMO DAY

## Future Implementations

- Incorporate camera feature so users can take a picture of receipt directly from the app
- Implement user login feature so users can manage their past bills
    - Keep track of amounts that have not been paid back and by whom
    - Check off a person who has already paid back what they owe
- Add people from user's phone contacts to the bill
- Allow users to request payment from party members via payment apps like Venmo

