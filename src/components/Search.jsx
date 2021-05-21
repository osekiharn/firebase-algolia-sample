import React, { useState } from 'react';
import styled from 'styled-components';
import { Highlight, Stats, connectAutoComplete } from 'react-instantsearch-dom'
import AutoSuggest from 'react-autosuggest'

/**
 * @see
 * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/autocomplete/react/#results-page-with-autocomplete
 */
function AutoComplete({
  hits,
  currentRefinement,
  refine,
  onSuggestionSelected,
  history,
  match,
}) {
  const [value, setValue] = useState(currentRefinement)
  const getSuggestionValue = (hit) => hit.title;
  const onSuggestionsFetchRequested = ({ value }) => { refine(value) }
  const onSuggestionsClearRequested = () => { refine() }
  const onChange = (_, { newValue }) => {
    setValue(newValue)
  }

  const inputProps = {
    placeholder: '入力例：',
    value,
    onChange,
  }

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div {...containerProps}>
        {children}
        <div
          className="react-autosuggest__suggestion-link"
          onMouseDown={() => {
            history.push(`/show/${match.params.id}`)
          }}
        >
          <Stats translations={{ stats: (nbHits) => `${nbHits} 件の検索結果`}} />
        </div>
      </div>
    )
  }

  return (
    <Wrapper>
      <AutoSuggest
        suggestions={hits}
        onSuggestionSelected={onSuggestionSelected(value)}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
      />
    </Wrapper>
  )
}

export default connectAutoComplete(AutoComplete)

function renderSuggestion(hit) {
  return (
    <Suggestion>
      <a href={`/posts/${hit.id}`}>
        <h3 className="react-autosuggest__suggestions-list__title">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h3>
        <p className="react-autosuggest__suggestions-list__accounting-process">
          <Highlight attribute="content" hit={hit} tagName="mark" />
        </p>
        <p className="react-autosuggest__suggestions-list__category">
          <span>タグ</span>
        </p>
      </a>
    </Suggestion>
  )
}

const Suggestion = styled.div`
  width: 100vw;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  .react-autosuggest__container {
    position: relative;
    width: 100%;
  }
  
  .react-autosuggest__input {
    width: 100%;
    height: 48px;
    padding: 10px 20px 10px 42px;
    font-weight: 300;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
  }
  
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .react-autosuggest__suggestions-container {
    width: 100%;
    display: none;
  }
  
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 51px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }
  
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  
      .react-autosuggest__suggestions-list__title {
      margin-bottom: 6px;
    }
      .react-autosuggest__suggestions-list__accounting-process {
      font-size: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
      .react-autosuggest__suggestions-list__category,
      .react-autosuggest__suggestions-list__account {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 6px;
      font-size: 14px;
  
      .labels {
        > span {
          border: solid 1px #7a766d;
          border-radius: 14px;
          color: #7a766d;
          font-size: 12px;
          padding: 0 8px;
          margin: 2px 0 2px 4px;
          height: 20px;
        }
      }
    }
  }
  
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  
    > a {
      color: #252525;
    }
  }
  
  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
    > h3 {
      text-decoration: underline;
    }
  }
  
  .react-autosuggest__suggestion-link {
    cursor: pointer;
    padding: 10px 20px;
    font-weight: bold;
    
    > a {
      color: #252525;
    }

    &:hover {
      background-color: #ddd;
      text-decoration: underline;
    }
  }
  
`;
