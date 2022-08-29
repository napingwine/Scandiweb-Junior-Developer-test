import React from 'react';
import { Route, Routes } from 'react-router';
import HeaderContainer from './components/Header/HeaderContainer';
import ProductCardList from './components/ProductCardList/ProductCardList';
import CartListPage from './components/Cart/CartListPage/CartListPage';
import ProductPageContainer from './components/ProductPage/ProductPageContainer';
import MiniCart from './components/Cart/MiniCart/MiniCart';

class App extends React.Component {
  render() {
    return (
      <>
        <HeaderContainer />
        <main>
        <Routes>
          <Route path='' element={<ProductCardList />}/>
          <Route path='/cart' element={<CartListPage />}/>
          <Route path='/id:id' element={<ProductPageContainer />}/>
        </Routes>
        <MiniCart/>
        </main>
      </>
    )
  }
};

export default App;
