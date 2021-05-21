import React from 'react'
import styled from 'styled-components';
import { Highlight, InstantSearch } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';

export default function Hit({ hit }) {
  return (
    <article>
      <Link
        to={`/posts/${hit.objectID}`}
      >
        <h3>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h3>
        <Paragraph>
          <Highlight attribute="content" hit={hit} tagName="mark" />
        </Paragraph>
        <div>タグ</div>
      </Link>
    </article>
  )
}

const Paragraph = styled.p`
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`
