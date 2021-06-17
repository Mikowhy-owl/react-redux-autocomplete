import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { setSearchString, setShowOptions, setUsers } from "./redux/actions";

const App = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(true);

  const users = useSelector((state) => state.input.users);
  const searchString = useSelector((state) => state.input.searchString);
  const showOptions = useSelector((state) => state.input.showOptions);

  React.useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => dispatch(setUsers(data)))
      .finally(setIsLoading(false));
  }, []);

  const handleSearchString = (e) => {
    const value = e.target.value;

    if (value !== "") {
      dispatch(setShowOptions(true));
    } else {
      dispatch(setShowOptions(false));
    }
    dispatch(setSearchString(value));
  };

  return (
    <div
      className="main-container"
      onClick={() => dispatch(setShowOptions(false))}
    >
      <div className="form-container">
        <div className="form-div">
          <form>
            <input
              type="text"
              placeholder="Start typing..."
              value={searchString}
              onChange={(e) => handleSearchString(e)}
              onClick={() => dispatch(setShowOptions(true))}
              className="input"
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          {showOptions ? (
            <div className="options-container">
              {isLoading ? (
                <div className="option">Loading... </div>
              ) : (
                users
                  .filter((x) =>
                    x.name.toLowerCase().includes(searchString.toLowerCase())
                  )
                  .map((option) => (
                    <div
                      key={option.id}
                      className="option"
                      onClick={() => {
                        dispatch(setSearchString(option.name));
                        dispatch(setShowOptions(false));
                      }}
                    >
                      {option.name}
                    </div>
                  ))
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
