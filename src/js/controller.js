import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
    try {
        // getting id of recipe(link hash)
        const id = window.location.hash.slice(1); // removing '#'

        if (!id) return;

        // update results to mark the active one
        resultsView.update(model.getSearchResultsPage());

        // rendering loading spinner
        recipeView.renderSpinner();

        // loading recipe
        await model.loadRecipe(id);

        // rendering recipe
        recipeView.render(model.state.recipe);

        // updating bookmark view (for active one)
        bookmarksView.update(model.state.bookmarks);
    } catch (err) {
        // console.error(`${err.message} |^_^| Controller)`);
        recipeView.renderError();
        console.error(err);
    }
};

const controlSearchResults = async function () {
    try {
        // get query
        const query = searchView.getQuery();

        if (!query) return;

        // render res spinner
        resultsView.renderSpinner();

        // getting data
        await model.searchRecipes(query);

        // rendering results
        resultsView.render(model.getSearchResultsPage());

        // rendering pagination
        paginationView.render(model.state.search);
    } catch (err) {
        resultsView.renderError();
    }
};

const controlPaginationBtn = function (page) {
    resultsView.render(model.getSearchResultsPage(page));
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // recalculate amount of ingridients
    model.updateServings(newServings);

    // update recipeView
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    // 1) Add/remove bookmark
    if (!model.state.recipe.bookmarked) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deleteBookmark(model.state.recipe.id);
    }

    // 2) update recipe view
    recipeView.update(model.state.recipe);

    // 3) Render bokmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlersPagination(controlPaginationBtn);
};
init();

// if (module.hot) {
//     module.hot.accept();
// }
