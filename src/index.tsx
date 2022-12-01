import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/";
import App from "./App";
import { BrowserRouter, HashRouter} from "react-router-dom";
import store from "./reducers/redux-store";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { parse, stringify } from 'query-string';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <HashRouter>
    <QueryParamProvider adapter={ReactRouter6Adapter}    options={{
        searchStringToObject: parse,
        objectToSearchString: stringify,
      }}>
        <App />
      </QueryParamProvider>
    </HashRouter>
  </Provider>
);

