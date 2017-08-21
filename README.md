## Making it Go

To get the application started, execute

```bash
> yarn
> yarn run demo
```

(Uses port 3000 for front end and 9000 for API)

Then go to `http://localhost:3000/`

## Tests

There are a few tests (mainly just for demonstration) to run them simply execute

```bash
> yarn test
```

## What this is

This is a very basic react application that gives users a little insight into the stack overflow issues that have "auth0" as one of their tags. The "Top Tags" page shows all of the other tags associated with Stack Overflow issues grouped by tag. This graph can be useful to see where Auth0 users have the most trouble. The "Historical" page shows a line graph of number of "auth0" issues per month and year over time. This could be useful to try to corrolate how well QA and documentation handles new versions of the various Auth0 systems.

## Project Structure

All of my code is nested under "src" as that is where create react app wants it so the jest test watcher works correctly. The "components" folder include basic, stateless components that can be used across the application. If a component has tests or CSS, it is nested in it's own folder. "api" houses the very basic hapi server used to get the Stack Overflow issues from Google Big Query. The "containers" folder is any component that is `connected` to the redux state tree. Finally, the "redux" folder includes all of the typical redux code you'd expect (reducers, actions, and selectors).

## Decisions

This was seeded using create react app. I used that mainly because I wanted to skip all the webpack setup steps. I elected to store all state in the redux tree as using redux was part of the assignment. On personal projects, I'm more inclined to only store things in the redux tree that are cross cutting in nature. For example, I store the selected filter on the "Top Tags" page in the redux tree. On a personal project, I might not have done that as nothing else cares about that but the one component where it's used.

I did not `connect` the `withData` higher order component for two reasons. One, I didn't really like the idea of side effect connecting a wrapped component just by using the `withData` higher order component. The second reason was that each component that uses it requires slightly different data from the redux tree so there would have been more complexity there to juggle.

I wanted to try to use webtask for my API, but I had trouble getting `@google-cloud/bigquery` loaded and working in that context, so I punted and just used a local hapi server as my API.

The front end JWT implementation is "ok". It's not the redux way, but it works by doing page redirects and re-renders. I used the auth0 documentation heavily for the basic implementation which gave me a great starting point. Given more time, I'd probaly come back to this and clean it up some.