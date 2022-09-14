import View from './view';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    render(data) {
        super.render(data);

        this._toggleActiveBtn(data.page);
    }

    _generateMarkup() {
        const currPage = this._data.page;
        const maxPage = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        let markup = '';

        if (maxPage === 1) return '';

        // pages <= 6 -> 1, 2, 3, 4, 5
        if (maxPage <= 6) {
            markup += this._generateMarkupButtons(
                ...[...Array(maxPage).keys()].map(x => ++x)
            );

            return markup;
        }

        // page < 3 -> 1, 2, 3 ... max-1, max
        if (currPage < 3) {
            markup += this._generateMarkupButtons(1, 2, 3);
            markup += this._generateMarkupDots();
            markup += this._generateMarkupButtons(maxPage - 1, maxPage);
            return markup;
        }

        // page is 3 -> 1, 2, 3, 4 ... max
        if (currPage === 3) {
            markup += this._generateMarkupButtons(1, 2, 3, 4);
            markup += this._generateMarkupDots();
            markup += this._generateMarkupButtons(maxPage);
            return markup;
        }

        // page > 3 and <= max - 3 -> 1 ... 4, -->5<--, 6 ... 18
        if (currPage > 3 && currPage <= maxPage - 3) {
            markup += this._generateMarkupButtons(1);
            markup += this._generateMarkupDots();
            markup += this._generateMarkupButtons(
                currPage - 1,
                currPage,
                currPage + 1
            );
            markup += this._generateMarkupDots();
            markup += this._generateMarkupButtons(maxPage);
            return markup;
        }

        // page is max - 2 -> 1 ... 6, -->7<--, 8, 9
        if (currPage === maxPage - 2) {
            markup += this._generateMarkupButtons(1);
            markup += this._generateMarkupDots();
            markup += this._generateMarkupButtons(
                maxPage - 3,
                maxPage - 2,
                maxPage - 1,
                maxPage
            );
            return markup;
        }

        // last two
        if (currPage >= maxPage - 1) {
            markup += this._generateMarkupButtons(1);
            markup += this._generateMarkupDots();
            markup += this._generateMarkupButtons(Math.floor(maxPage / 2));
            markup += this._generateMarkupDots();
            markup += this._generateMarkupButtons(maxPage - 2);
            markup += this._generateMarkupButtons(maxPage - 1);
            markup += this._generateMarkupButtons(maxPage);
            return markup;
        }

        return `
        <button class="btn--inline pagination__btn" data-page="${currPage}">
            <span>Error!!!!</span>
        </button>
        `;
    }

    _generateMarkupButtons(...pages) {
        return pages
            .map(page => {
                return `
            <button class="btn--inline pagination__btn" data-page="${page}">
                <span>${page}</span>
            </button>
            `;
            })
            .join('');
    }

    _generateMarkupDots() {
        return `
        <span class="pagination__dots">...</span>
        `;
    }

    _toggleActiveBtn(page) {
        const currBtn = document.querySelector(
            `.pagination__btn[data-page="${page}"]`
        );

        currBtn.classList.add('pagination__btn--active');
    }

    addHandlersPagination(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.pagination__btn');

            if (!btn) return;

            const page = Number(btn.dataset.page);

            handler(page);
        });
    }
}

export default new PaginationView();
