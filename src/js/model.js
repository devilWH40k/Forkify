import { async } from 'regenerator-runtime';
import { API_URL, API_KEY, RES_PER_PAGE } from './config';
import { AJAX } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

const createRecipeObject = function (data) {
    return {
        id: data.id,
        title: data.title,
        publisher: data.publisher,
        sourceUrl: data.source_url,
        image: data.image_url,
        servings: data.servings,
        cookingTime: data.cooking_time,
        ingredients: data.ingredients,
        ...(data.key && { key: data.key }),
    };
};

export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

        state.recipe = createRecipeObject(data.data.recipe);

        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }
    } catch (err) {
        throw err;
    }
};

export const searchRecipes = async function (query) {
    try {
        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && { key: rec.key }),
            };
        });

        // reset the page
        state.search.page = 1;

        // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    } catch (err) {
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const startIndex = (page - 1) * state.search.resultsPerPage;
    const endIndex = page * state.search.resultsPerPage;

    return state.search.results.slice(startIndex, endIndex);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
    // adding a recipe to the state
    state.bookmarks.push(recipe);

    // mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
};

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    // mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
};

const init = function () {
    const storage = localStorage.getItem('bookmarks');

    if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// for developing purposes
const clearBookmarks = function () {
    localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(
                ([key, value]) => key.startsWith('ingredient') && value !== ''
            )
            .map(([_, value]) => {
                const ingArr = value.split(',').map(ing => ing.trim());
                if (ingArr.length !== 3)
                    throw new Error(
                        'Wrong ingredient format! Should be divided by commas!!!'
                    );

                const [quantity, unit, description] = ingArr;

                return {
                    quantity: quantity ? +quantity : null,
                    unit,
                    description,
                };
            });

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };

        const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

        state.recipe = createRecipeObject(data.data.recipe);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
};
