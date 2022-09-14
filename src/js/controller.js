import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
    try {
        // getting id of recipe(link hash)
        const id = window.location.hash.slice(1); // removing '#'

        if (!id) return;

        // rendering loading spinner
        recipeView.renderSpinner();

        // loading recipe
        await model.loadRecipe(id);

        // rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        // console.error(`${err.message} |^_^| Controller)`);
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        // reset the page
        model.state.search.page = 1;

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
        // temporary for revealing app mistakes
        resultsView.renderError(err.message);
    }
};

const controlPaginationBtn = function (page) {
    resultsView.render(model.getSearchResultsPage(page));
    paginationView.render(model.state.search);
};

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlersPagination(controlPaginationBtn);
};
init();

// if (module.hot) {
//     module.hot.accept();
// }
