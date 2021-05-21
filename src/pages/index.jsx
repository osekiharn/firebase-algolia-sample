import React from "react";
import styled from 'styled-components';
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import { InstantSearch } from 'react-instantsearch-dom';
import AutoComplete from '../components/Search';

const algoliasearch = require("algoliasearch");
const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID,
  process.env.REACT_APP_ADMIN_API_KEY
);

export default function SearchPostsComponent(props) {
  const onSuggestionSelected = (value) => (_, { suggestion }) => {
    props.history.push(`/posts/${suggestion.objectID}`)
  }


  return (
    <Wrapper>
      <Container>
        <InstantSearch
          indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
          searchClient={client}
        >
          <AutoComplete
            onSuggestionSelected={onSuggestionSelected}
          />
        </InstantSearch>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  padding: 24px;
`

const StyledInput = styled(Input)`
  width: 250px;
  margin-top: 10px;
`

const StyledCard = styled(Card)`
  margin-top: 20px;
  width: 250px;
`