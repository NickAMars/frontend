# Start Server Application

    creating a front end application which provides the capability of creating a group.
    fetching the groups and colors. Displaying the user for the selected color.

## install packages creating the node modules with the following command

    `npm install`

## Available Scripts

### run the application using this script

    `npm start`

### run the application in test mode with

    `npm run test`

### look at the application test converage

    `npm test -- --coverage`

## Introduction

Project is to collect the data from api display them in the drop down list and show them in the drop down. it also gives you a way that you can update the view to see the color. You can select on the drop down and see which user has a color and which user is in the current group.

## Endpoints To recieve data:

    `[GET] /api/${version}/groups?color={value}`
    `[POST] /api/${version}/groups`

## Assumptions made

User was to select colors from exist color by the drop down selecter.\
We are not allow to add multiple groups at a giving time.\
Group names with colors as grouping names by groups.\
user is able to add eny number of persons to a particular group.\
user is not able to submit an empty list of items for a group.\
user is only allow to enter 50 characters for group and user.



## Thing to do

Divide the ModalForm into more peices.\
Work on test case for component using jest

