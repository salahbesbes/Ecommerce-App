import _ from "lodash";
import React from "react";
import { Search } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, "$"),
// }));

const initialState = {
  loading: false,
  results: [],
  value: "",
  uid: null,
};

function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return {
        ...state,
        value: action.selection.title,
        uid: action.selection.uid,
      };

    default:
      throw new Error();
  }
}

function SearchExampleStandard({ products }) {
  let ProductsData = products.map(el => ({
    title: el.title,
    price: el.price + " $",
    description: el.description,
    image: el.imgUrl,
    uid: el.uid,
  }));
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = result => re.test(result.title);

        dispatch({
          type: "FINISH_SEARCH",
          results: _.filter(ProductsData, isMatch),
        });
      }, 300);
    },
    [ProductsData]
  );
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <>
      <Search
        fluid
        loading={loading}
        onResultSelect={(e, data) =>
          dispatch({
            type: "UPDATE_SELECTION",
            selection: {
              title: data.result.title,
              uid: data.result.uid,
            },
          })
        }
        onSearchChange={handleSearchChange}
        results={results}
        value={value}
      />
      {state.uid && <Redirect to={`/${state.uid}/details`} />}
    </>
  );
}

export default SearchExampleStandard;
