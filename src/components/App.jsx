import React, { lazy, Suspense } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
const Index = lazy(() => import(/* webpackChunkName: "Index" */'../pages'));
const Edit = lazy(() => import(/* webpackChunkName: "Edit" */'../pages/edit'));
const Header = lazy(() => import(/* webpackChunkName: "Header" */'./Header'));

const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
  }
`

export default function BaseRouter() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<>loading...</>}>
        <Container>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/new" component={Edit} />
              <Route exact path="/" component={Index} />
              <Route exact path="/posts/:id" component={Edit} />
            </Switch>
          </BrowserRouter>
        </Container>
      </Suspense>
    </>
  )
}

const Container = styled.div`
  margin-top: 80px;
`