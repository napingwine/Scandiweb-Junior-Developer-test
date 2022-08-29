import React from 'react';
import { connect } from 'react-redux';
import { apolloClient } from '../../app/GraphQL/apolloClient';
import { LOAD_CATEGORIES, LOAD_CURRENCIES, LOAD_SOME_CATEGORY } from '../../app/GraphQL/Queries';
import Header from './Header';
import { setCurrentCurrency, setAllCurrencies, setAllCategories, setCurrentCategory, setCurrentCategoryProducts, showMiniCart } from '../../app/Redux/mainReducer';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props)
    this.onSetCurrentCurrency = this.onSetCurrentCurrency.bind(this)
    this.onCategorySelect = this.onCategorySelect.bind(this)
    this.showMiniCart = this.showMiniCart.bind(this)
  };

  componentDidMount() {
    this.getData();
    this.setCurrentProductsList(this.props.main.currentCategory)
  };

  getData() {
    const categories = () => {
      return apolloClient.query({
        query: LOAD_CATEGORIES
      })
    };

    const currencies = () => {
      return apolloClient.query({
        query: LOAD_CURRENCIES
      })
    };

    Promise.all([categories(), currencies()]).then(res => {
      const categoriesArr = res[0].data.categories.reduce((acc, cur) => {
        acc.push(cur.name)
        return acc
      }, []);
      const currenciesArr = res[1].data.currencies;

      this.props.setAllCurrencies(currenciesArr);
      this.props.setCurrentCurrency(currenciesArr[0]);
      this.props.setAllCategories(categoriesArr);
      this.props.setCurrentCategory(categoriesArr[0])
    })
  };

  setCurrentProductsList(category) {
    apolloClient.query({
      query: LOAD_SOME_CATEGORY,
      variables: { "input": { "title": category } }
    })
      .then(res => this.props.setCurrentCategoryProducts(res.data.category.products))
  };

  onSetCurrentCurrency(el) {
    this.props.setCurrentCurrency(el);
  };

  onCategorySelect = (category) => {
    this.props.setCurrentCategory(category);
    this.setCurrentProductsList(category);
  };

  showMiniCart(){
    this.props.showMiniCart(true)
  };

  render() {
    const { categories, allCurrencies, currentCategory, currency, itemsAmountInCart } = this.props.main;
    return (<Header
      currencies={allCurrencies}
      currentCurrency={currency}
      setCurrentCurrency={this.onSetCurrentCurrency}
      categories={categories}
      currentCategory={currentCategory}
      onCategorySelect={this.onCategorySelect}
      itemsAmountInCart={itemsAmountInCart}
      showMiniCart={this.showMiniCart}
      hideMiniCart={this.hideMiniCart}
    />)
  };
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { setAllCategories, setAllCurrencies, setCurrentCurrency, setCurrentCategory, setCurrentCategoryProducts, showMiniCart })(HeaderContainer);