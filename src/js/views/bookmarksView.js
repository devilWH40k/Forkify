import View from './view';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet!';
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        return this._data.map(res => this._generateMarkupResult(res)).join('');
    }

    _generateMarkupResult(result) {
        const id = window.location.hash.slice(1);

        return `
            <li class="preview">
                <a class="preview__link ${
                    result.id === id ? 'preview__link--active' : ''
                }" href="#${result.id}">
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
                        <div class="preview__user-generated ${
                            result.key ? '' : 'hidden'
                        }">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
        `;
    }
}

export default new BookmarksView();
