/* eslint-disable constructor-super */
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  PageNotFoundWrapper,
  PageNotFoundContent
} from "./page-not-found.style";

/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <PageNotFoundWrapper>
      <PageNotFoundContent>
        <img src="img/404.png" alt="404" />
        <div>
          <Link to="/" className="ids-link">
            {t("notFound.redirectButton")}
          </Link>
        </div>
      </PageNotFoundContent>
    </PageNotFoundWrapper>
  );
};

export default PageNotFound;
