import * as model from './model';
import recipeView from './views/recipeView';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

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
    } catch (e) {
        alert(e);
    }
};

['load', 'hashchange'].forEach(ev =>
    window.addEventListener(ev, controlRecipes)
);
