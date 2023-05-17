
function Search({doSearch, searchBox}) {


    const search = function(){
        doSearch(searchBox.current.value);

    }


    return (
        <span className="input-group m-0 p-0">
          <input
              type="text"
              className="form-control border-0 rounded-0"
              placeholder="Search here"
              ref ={searchBox}
              onKeyUp={search}

          />
          <button
              className="btn btn-primary  border-0 rounded-0"
              type="button"
              id="search_button_2"
          >
            <i className="bi bi-search"/>
          </button>
        </span>
    );
}

export default Search;