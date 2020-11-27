import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const DrinkGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleDrinkStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

export default function DrinksPage({ data }) {
  return (
    <>
      <SEO title={`Drinks! We have ${data.drinks.totalCount} in stock`} />
      <h2 className="center">
        We have {data.drinks.totalCount} drinks available. Dine in only!
      </h2>
      <DrinkGridStyles>
        {data.drinks.nodes.map((drink) => {
          const rating = Math.floor(Math.random() * 6);
          return (
            <SingleDrinkStyles key={drink.id}>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} />
              <h3>
                {drink.strDrink} - {drink.strGlass}
              </h3>
              {Math.floor(Math.random() * 12) + 1.99}
              <p title={`${rating} out of 5 stars`}>
                {'⭐'.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {'⭐'.repeat(5 - rating)}
                </span>
                <span>{Math.floor(Math.random() * 1500)}</span>
                <p>{drink.strInstructions}</p>
              </p>
            </SingleDrinkStyles>
          );
        })}
      </DrinkGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    drinks: allDrink {
      nodes {
        id
        strDrink
        strDrinkThumb
        strInstructions
        strGlass
      }
      totalCount
    }
  }
`;
