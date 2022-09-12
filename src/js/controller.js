import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

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

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
};
init();
