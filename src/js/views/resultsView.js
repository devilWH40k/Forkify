import View from './view';
import icons from '../../img/icons.svg';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try again!';
    _message = '';

    _generateMarkup() {
        return this._data.map(res => this._generateMarkupResult(res)).join('');
    }

    _generateMarkupResult(result) {
        return `
            <li class="preview">
                <a class="preview__link" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${
                            result.title.length <= 20
                                ? result.title
                                : result.title.slice(0, 21) + ' ...'
                        }</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    }
}

export default new ResultsView();

// <div class="preview__user-generated">
//     <svg>
//         <use href="${icons}#icon-user"></use>
//     </svg>
// </div>
