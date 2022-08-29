import { gql } from "@apollo/client";

export const LOAD_CATEGORIES = gql`
query {
  categories{
    name
  }
}
`

export const LOAD_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`

export const LOAD_SOME_CATEGORY = gql`
  query SOME_CATEGORY($input: CategoryInput) {
    category(input: $input){
      name
      products {
        id
        name
        inStock
        gallery
        brand
        prices{
          currency{
        		label
            symbol
          }
          amount
        }
      }
    }
}
`
export const LOAD_ITEM_BY_ID = gql`
  query GET_ITEM_BY_ID($ID: String!) {
    product(id:$ID){
      id
      name
      inStock
      gallery
      description
      brand
      prices {
        currency{
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`