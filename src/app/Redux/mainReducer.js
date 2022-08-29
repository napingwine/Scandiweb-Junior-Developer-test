const SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY';
const SET_ALL_CURRENCIES = 'SET_ALL_CURRENCIES';
const SET_ALL_CATEGORIES = 'SET_ALL_CATEGORIES';
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
const SET_CURRENT_CATEGORY_PRODUCTS = 'SET_CURRENT_CATEGORY_PRODUCTS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const INCREASE_ITEM_AMOUNT = 'INCREASE_ITEM_AMOUNT';
const DECREASE_ITEM_AMOUNT = 'DECREASE_ITEM_AMOUNT';
const SET_ATTRIBUTE = 'SET_ATTRIBUTE';
const SHOW_MINI_CART = 'SET_MINI_CART';
const SHOW_CURRENCY_POPUP = 'SET_CURRENCY_POPUP';

const initialState = {
  currency: {},
  allCurrencies: [],
  categories: [],
  currentCategory: '',
  currentCategoryProducts: [],
  cartList: [],
  itemsAmountInCart: 0,
  showMiniCart: false,
  isCurrencyPopUp: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CURRENCY:
      return {
        ...state,
        currency: action.payload
      };
    case SET_ALL_CURRENCIES:
      return {
        ...state,
        allCurrencies: action.payload
      };
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      };
    case SET_CURRENT_CATEGORY_PRODUCTS:
      return {
        ...state,
        currentCategoryProducts: action.payload
      };
    case ADD_ITEM_TO_CART: {
      const addItem = () => {
        const itemIndex = state.cartList.findIndex((el) =>
          JSON.stringify(el.attributes) === JSON.stringify(action.payload.attributes) && el.id === action.payload.id
        );
        const items = JSON.parse(JSON.stringify(state.cartList));
        if (itemIndex >= 0) {
          items[itemIndex].amount += action.payload.amount
          return items
        } else {
          return [...items, action.payload]
        }
      }
      return {
        ...state,
        cartList: addItem(),
        itemsAmountInCart: state.itemsAmountInCart + action.payload.amount
      }
    };
    case INCREASE_ITEM_AMOUNT: {
      let newCartList = JSON.parse(JSON.stringify(state.cartList));
      const itemIndex = newCartList.findIndex(el => el.itemListID === action.payload);
      newCartList[itemIndex].amount++;
      return {
        ...state,
        cartList: newCartList,
        itemsAmountInCart: state.itemsAmountInCart + 1
      }
    };
    case DECREASE_ITEM_AMOUNT: {
      let newCartList = JSON.parse(JSON.stringify(state.cartList));
      const itemIndex = newCartList.findIndex(el => el.itemListID === action.payload);
      if (newCartList[itemIndex].amount > 1) {
        newCartList[itemIndex].amount--;
      } else {
        newCartList = newCartList.filter(el => el.itemListID !== action.payload)
      }
      return {
        ...state,
        cartList: newCartList,
        itemsAmountInCart: state.itemsAmountInCart - 1
      }
    };
    case SET_ATTRIBUTE: {
      let newCartList = JSON.parse(JSON.stringify(state.cartList));
      const itemIndex = newCartList.findIndex(el => {
        return el.itemListID === action.payload.itemID
      });
      const attributeIndex = newCartList[itemIndex].attributes.findIndex(el => el.id === action.payload.attributeID);
      newCartList[itemIndex].attributes[attributeIndex].items.map(el => {
        if (el.id === action.payload.attribute.id) {
          return el.selected = true
        } else {
          return el.selected = false
        }
      })
      return {
        ...state,
        cartList: newCartList
      }
    };
    case SHOW_MINI_CART:
      return {
        ...state,
        showMiniCart: action.payload
      };
    case SHOW_CURRENCY_POPUP:
      return {
        ...state,
        isCurrencyPopUp: action.payload
      }
    default:
      return state;
  };
};

export const setCurrentCurrency = payload => ({ type: SET_CURRENT_CURRENCY, payload });
export const setAllCurrencies = payload => ({ type: SET_ALL_CURRENCIES, payload });
export const setAllCategories = payload => ({ type: SET_ALL_CATEGORIES, payload });
export const setCurrentCategory = payload => ({ type: SET_CURRENT_CATEGORY, payload });
export const setCurrentCategoryProducts = payload => ({ type: SET_CURRENT_CATEGORY_PRODUCTS, payload });
export const addItemToCart = payload => ({ type: ADD_ITEM_TO_CART, payload });
export const increaseItemAmount = payload => ({ type: INCREASE_ITEM_AMOUNT, payload });
export const decreaseItemAmount = payload => ({ type: DECREASE_ITEM_AMOUNT, payload });
export const setAttribute = payload => ({ type: SET_ATTRIBUTE, payload });
export const showMiniCart = payload => ({ type: SHOW_MINI_CART, payload });
export const showCurrencyPopUp = payload => ({ type: SHOW_CURRENCY_POPUP, payload });

export default mainReducer;