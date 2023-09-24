# Sensorfact assignment frontend developer

### Goal

The goal of this assignment is to assess your skills as a frontend developer.

In this assignment, we included a few of the technologies that we use in our
existing solution:

- **React:**
  We have multiple interfaces for internal users (e.g. an application
  to register machine specific information) and external users (e.g. an
  application to view the energy consumption patterns for each machine). These
  applications are created using ReactJS.
- **GraphQL:**
  Within Sensorfact we expose most of our data regarding measurements, machine
  specific configuration and industry knowledge via a GraphQL API.
- **TypeScript:**
  All our new projects use TypeScript, because we like the benefits that the type system
  offers us during development, reviews and testing. Unfortunately, we still have to maintain and improve legacy projects that rely on pure JavaScript. Your familiarity with both and the migration process between them is important.

### Process

> TLDR;
>
> 1. Spend approximately half a day on the assignment
> 2. Make a conscious decision on what you want to focus on: it's fine if you
>    cannot complete the entire assignment.
> 3. Send us your solution before the technical interview
> 4. Contact us if you have any questions

Please keep in mind the following:

- We intend for you to spend only a few hours (approximately half a day) on this
  assignment, which is too little to do everything you might want. Decide what you
  want to focus on and reserve some time to wrap it up and communicate how far you
  got.
- We understand that you may not have experience with all aspects of this
  assignment. Make sure that you can show something during the technical
  interview and make an effort to learn something new. It's usually really
  interesting to discuss how you learn and act if you're stuck, as you will also
  encounter new challenges regularly when working for Sensorfact.
- Take this assignment as an opportunity to show us your style: what you like to
  work on, what you find important.
- If you have any further questions, do not hesitate to contact us.

During the technical interview, we will discuss your solution. Some of the
topics could be:    

- Why did you decide to use specific libraries?
- Can you walk us through your choices and decisions?
- What aspects of the work did you like or dislike?
- What aspects of the assignment were easy or difficult for you?
- Was there anything you had not worked with before?
- To what extent is the code clean and easy to maintain?
- What would you improve next?

Make sure to send us the assignment before the technical interview (either share
access to a Git repo or send us a zip file). This allows us to prepare relevant
questions for you.

### Assignment

The following use case is a baseline. The only hard requirements we impose are the use of React and Typescript. You have complete freedom over all other libraries and tools. You may use a different API than the one suggested as long as you remain true to the spirit of the assignment. 

### Use case

In this assignment you will create a small [React](https://reactjs.org/) project
that consumes the [SpaceX Api](https://studio.apollographql.com/public/SpaceX-pxxbxen/home?variant=current) to
display information about their launches. The end user needs to be able to
select multiple launches from the list that you display and request the
estimated total energy that these launches consumed. The result needs to be
displayed as well.

The question from business to you is:

> We think it would be interesting to show how much energy is used by the
> SpaceX launches, so that people can rethink if it is worth it to take a trip
> into space. Our ideas are still quite vague, but do you think you can create a
> first draft of a web page that shows this information?

The front end application should:

- Query [SpaceX Api](https://studio.apollographql.com/public/SpaceX-pxxbxen/home?variant=current) for launches.
  You decide which launches to display and whether or not to include filters.
- Display launch information
- Allow the user to select multiple launches
- Allow the user to request the estimated total energy usage for the selected
  launches
- Display the estimated energy consumption for the selected launches.

Note:

The estimated energy can be calculated using some simple assumptions:

- The consumed energy depends only on the mass of the rocket that was used for
  the launch + the mass of the fuel
- It costs about 15 kg of fuel bring 1 kg of mass to the Lower Earth Orbit
- The fuel has an energetic value of 1.35\*10^7 Joules / kg

### What we would like to see

You are asked to create a simple application using [React](https://reactjs.org/) and
[TypeScript](https://www.typescriptlang.org/).

We would like to see at least:

- The application should consume an API and retrieve a list of items.
- A user should be able to view the list of items.
- A user should be able to select some items in the list and view aggregated information about the items selected.

But it will be great if you can cover some of this topics which we consider will bring more substance to the use case presentation: 

-  Assume you have access to a `user` object at the top level of your application ( retrieved from the auth system ). Filter out some items from the list based on the user's permissions to view these items. You are free to mock the `user` object and the `permissions` structure however you see fit.
-  Using a data visualization library/framework, compare data from multiple launches in one view.
-  If you're using a UI library, pick one component you believe you will need and customize it, visually or in terms of provided functionality.

- You can use any UI library (some examples are [Material UI](https://mui.com/),
  [Ant Design](https://ant.design/)) or none at all.

- You can use any client of your choice to query the API (some
  examples are [Apollo client](https://www.apollographql.com/docs/react/),
  [GraphQL request](https://github.com/prisma-labs/graphql-request),
  [Relay](https://relay.dev/)).


### Notes
If you want to run the API locally you can use this alternative project:

- https://github.com/SpaceXLand/api