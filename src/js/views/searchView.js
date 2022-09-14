class SearchView {
    _parentEl = document.querySelector('.search');
    _button = this._parentEl.querySelector('.search__btn');
    _input = this._parentEl.querySelector('.search__field');

    getQuery() {
        const query = this._input.value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._input.value = '';
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();
