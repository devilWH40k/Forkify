# Forkify

**Forkify** - small front-end application for searching and managing recipes. Try it by yourself at https://forkify-devil.netlify.app.

---

## Used technologies

-   modern JS (ES6+)
-   Sass
-   HTML
-   Parcel
-   Babel
-   some other npm packages

---

## Features

The list of the features:

-   Searching for recipes (only by [key words])
-   Results pagination
-   Detailed information about a recipe with a source link
-   Calculating amount of the ingredients by the number of servings
-   You can bookmark any recipe you want and get it later from the bookmark list, they will be stored in the local storage
-   Uploading your own recipe

---

## Deployment

You must install the **[node]** at first!

1. Clone the repository:
    ```sh
    $ git clone https://github.com/devilWH40k/Forkify.git
    ```
2. Move to project directory:
    ```sh
    $ cd Forkify
    ```
3. Install application requirements:
    ```sh
    $ npm i
    ```
4. Start the local dev server (will be available at http://localhost:1234):
    ```sh
    $ npm start
    ```
5. After finishing development you can build your project by using:
    ```sh
    $ npm run build
    ```
6. Then you can just use **[netlify]** to deploy your project, have fun xD

[key words]: https://forkify-api.herokuapp.com/phrases.html
[node]: https://nodejs.org/en/download/
[netlify]: https://app.netlify.com
