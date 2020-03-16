import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { NavBar } from '@components';
import { withWebId } from '@inrupt/solid-react-components';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  position: relative;
`;



const NotLoggedInLayout = props => {
  const { component: Component, webId, ...rest } = props;
  const ComponentWrapper = styled(Component)`
    padding-bottom: 60px;
    height: 100%;
    padding-top: 60px;
  `;
  return !webId ? (
    <Route
      {...rest}
      component={matchProps => (
        <Container>
          <NavBar
            {...matchProps}
            toolbar={[
            ]}
          />
          <ComponentWrapper {...matchProps} />
        </Container>
      )}
    />
  ) : (
    <Redirect to="/welcome" />
  );
};

export default withTranslation()(withWebId(NotLoggedInLayout));
