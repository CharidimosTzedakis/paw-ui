# GlobalWebIndex Engineering Challenge

## Exercise: CatLover

Create a React application for cat lovers which is going to build upon thecatapi.com and will have 3 views.
The **first** view displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the URL of the modal and send it to your friends - they should see the same image as you can see.

The **second** view displays a list of cat breeds. Each breed opens a modal again with a list of cat images of that breed. Each of those images must be a link to the image detail from the previous point.

The **third** view allows you do the following things:

- Display your favourite cats
- Remove an image from your favourites (use any UX option you like)

You can find the API documentation here: https://developers.thecatapi.com/
We give you a lot of freedom in technologies and ways of doing things. We only insist on you using React.js. Get creative as much as you want, we WILL appreciate it. You will not be evaluated based on how well you follow these instructions, but based on how sensible your solution will be. In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.

## Submission

Once you have built your app, share your code in the mean suits you best
Good luck, potential colleague!

## Getting started
prerequisites:
- node v20 or later
- pnpm v8 or later

1. Install dependencies:
```bash
pnpm i
```
2. Put your cat api key in the `.env` file in the prepared env variable (or create a `.env.local` file with the corresponding entry). You can get your
api key from https://thecatapi.com/ by providing your email.
3. Start the project
```bash
pnpm run dev
```
4. Run the unit tests:
```bash
pnpm run test
```
## Implementation notes
- developed the solution using the antd component library
- light and dark theme
- used a virtualized list solution to enable the user to load as many pictures as desired
- works for desktop and mobile viewports
- used the @thatapicompany/thecatapi package for the requests and for the api types
- improved accessibility with keyboard usage of the app
- provided adequate unit testing coverage
- The console error "refused to set unsafe header 'user-agent'" is because of the line:
https://github.com/thatapicompany/thecatapi/blob/main/src/services/ApiRequest/ApiRequest.ts#L82
in the @thatapicompany/thecatapi that was used for making the requests. From the npm registry description, I figured
it could be used in the frontend as well. However, it tries to setup the user-agent header. 

## Next steps
If the development of the project would continue, the following improvements could be made:

 - error messages/failed states
   - now UI remains in loading state if something goes wrong and does not give feedback of the error
   - maybe an alert that something went wrong or an error state for the UI
   - react error boundaries to specific parts of the app, eg the modal routes, to make the app more resilient
 - use react-query for data fetching
   - explore breeds modal would benefit from caching, because the breeds and the cat images for that breeds are specific
 - As a UI improvement, antd progress component (https://ant.design/components/progress) could be used, to show in a 5
 number scale more information about the breed (eg energy level, affection level)
 - pagination for easiest browsing of the favourite images, if their number is more than a few
 - some integration and e2e tests using cypress