import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import CohortRepo from "./pages/cohortRepo";
import logo from "./logo.png";
import { css } from "emotion";
import { ARRANGER_API } from "./config";
import urlJoin from "url-join";
import { API_BASIC_AUTH_PAIR } from "./config";
import createArrangerFetcher from "./pages/cohortRepo/arrangerFetcher/createArrangerFetcher";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const DisclaimerBanner = () => {
  const [shown, setShown] = React.useState(true);
  return (
    <div
      className={css`
        display: ${shown ? "flex" : "none"};
        justify-content: space-between;
        align-items: center;
        background: black;
        opacity: 0.8;
        color: white;
        padding: 10px;
      `}
    >
      The IHCC Atlas currently has a combination of real and mock data for demo
      purpose. The data is not appropriate for research.
      <button
        onClick={() => setShown(false)}
        className={css`
          max-height: 20px;
          border-radius: 100px;
          border: none;
          border: none;
          cursor: pointer;
        `}
      >
        ok
      </button>
    </div>
  );
};

function App() {
  const customHistory = createBrowserHistory();
  const fullView = css`
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  `;
  const headerStyle = css`
    height: 64px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.04;
    letter-spacing: normal;
    color: #191970;
    background: white;
    border-bottom: solid 2px #dcdde1;
    width: 100%;
    justify-content: space-between;
  `;
  const logoStyle = css`
    width: 142px;
  `;
  const pageContainer = css`
    position: relative;
    flex: 1;
  `;

  const index = "cohort_centric";
  const graphqlField = "cohort";
  const projectId = "ihcc";

  const authorizationHeader = `Basic ${btoa(API_BASIC_AUTH_PAIR)}`;

  const client = new ApolloClient({
    uri: urlJoin(ARRANGER_API, `/${projectId}/graphql`),
    headers: {
      authorization: authorizationHeader,
    },
  });

  // This guy supports requests made by arranger's UI components
  const arrangerFetcher = createArrangerFetcher({
    defaultHeaders: {
      authorization: authorizationHeader,
    },
  });

  return (
    <ApolloProvider client={client}>
      <div className={fullView}>
        <div className={headerStyle}>
          <div
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <img src={logo} className={logoStyle}></img>
            International HundredK+ Cohorts Consortium
          </div>
          <div
            className={css`
              text-align: right;
              margin-right: 10px;
              color: black;
            `}
          >
            IHCC Cohort Atlas
          </div>
        </div>
        <div className={pageContainer}>
          <DisclaimerBanner />
          <Router history={customHistory}>
            <Switch>
              <Route exact path="/">
                <CohortRepo
                  index={index}
                  graphqlField={graphqlField}
                  projectId={projectId}
                  arrangerFetcher={arrangerFetcher}
                />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
