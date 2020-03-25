import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import { Layout, Menu,  Icon } from 'antd';
//MID
//Root of Equation
import Bisection from './numer/Root of Equation/Bisection'
import FalsePosition from './numer/Root of Equation/FalsePosition'
import Onepoint from './numer/Root of Equation/Onepoint'
import Newtonraphson from './numer/Root of Equation/Newtonraphson'
import Secant from './numer/Root of Equation/Secant'
import Home from './numer/Root of Equation/Home'
//Linear Algebra
import Cramer from './numer/Linear Algebra/Cramer'


import JacobiIterationMethod from './numer/Linear Algebra/JacobiIterationMethod'
import GaussSeidelIteration from './numer/Linear Algebra/GaussSeidelIteration'


//FINAL
//Differentiation
import Forward_h from './numer/Differentiation/Forward_h'
import Forward_h2 from './numer/Differentiation/Forward_h2'
import Backward_h from './numer/Differentiation/Backward_h'
import Backward_h2 from './numer/Differentiation/Backward_h2'
import Central_h2 from './numer/Differentiation/Central_h2'
import Central_h4 from './numer/Differentiation/Central_h4'
//Integration
import CompositeTrapezoidal from './numer/Integration/CompositeTrapezoidal'
import CompositeSimpson from './numer/Integration/CompositeSimpson'
import SimpleTrapezoidaln from './numer/Integration/SimpleTrapezoidal'
import SimpleSimpson from './numer/Integration/SimpleSimpson'
//Regression
import LinearRegression from './numer/Regression/LinearRegression'

import PolynomialRegression from './numer/Regression/PolynomialRegression'
//Interpolation
import Lagrange from './numer/Interpolation/Lagrange'
//k1
//k2

const {  Content,  Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  
  render() {
    return (
      <Router>
      
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={310} /*collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>*/>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['menu_home']} mode="inline">
              <Menu.Item key="menu_home" ><Icon type="user" />Home<Link to="/home" /></Menu.Item>
                
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Root of Equation</span>
                  </span>
                }
              >
                <Menu.Item key="menu_bisection" >Bisection<Link to="/bisection" /></Menu.Item>
                <Menu.Item key="menu_false">FalsePosition<Link to="/falsePosition" /></Menu.Item>
                <Menu.Item key="menu_onepoint">One-Point Iteration<Link to="/onepoint" /></Menu.Item>
                <Menu.Item key="menu_newton">Newton-Raphson<Link to="/newtonraphson" /></Menu.Item>
                <Menu.Item key="menu_secant">Secant Method<Link to="/secant" /></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Linear Algebra</span>
                  </span>
                }
              >
                <Menu.Item key="menu_cramer">Cramer's Rule<Link to="/cramer" /></Menu.Item>
                <Menu.Item key="menu_gauss">Gauss's Elimination</Menu.Item>
                <Menu.Item key="menu_jordan">Gauss Jordan Method</Menu.Item>
                <Menu.Item key="menu_lu">LU Decomposition</Menu.Item>
                <Menu.Item key="menu_cholesky">Cholesky Decomposition</Menu.Item>
                <Menu.Item key="menu_jacobi">Jacobi Iteration Method<Link to="/jacobiIterationMethod" /></Menu.Item>
                <Menu.Item key="menu_seidel">Gauss Seidel Iteration<Link to="/gaussSeidelIteration" /></Menu.Item>
                <Menu.Item key="menu_gradient">Conjugate Gradient Method</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Interpolation</span>
                  </span>
                }
              >
                <Menu.Item key="menu_divide">Newton Divide Difference</Menu.Item>
                <Menu.Item key="menu_lagrange">Lagrange<Link to="/lagrange" /></Menu.Item>
                <Menu.Item key="menu_spline">Spline</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Least Square Error</span>
                  </span>
                }
              >
                <Menu.Item key="menu_linear">Linear Regression<Link to="/linearRegression" /></Menu.Item>
                <Menu.Item key="menu_poly">Polynomial Regression<Link to="/PolynomialRegression" /></Menu.Item>
                <Menu.Item key="menu_multiple">Multiple Linear Regression</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Integration</span>
                  </span>
                }
              >
                <Menu.Item key="menu_compositeTrapzoidal">Composite Trapezoidal Rule<Link to="/compositeTrapezoidal" /></Menu.Item>
                <Menu.Item key="menu_compositeSimpson">Composite Simpson's Rule<Link to="/compositeSimpson" /></Menu.Item>
                <Menu.Item key="menu_simpleTrapezoidal">Simple Trapezoidaln Rule<Link to="/SimpleTrapezoidal" /></Menu.Item>
                <Menu.Item key="menu_simpleSimpson">Simple Simpson's Rule<Link to="/SimpleSimpson" /></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub6"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Differentiation</span>
                  </span>
                }
              >
                <Menu.Item key="menu_forwardh">Forward Divided-Differences O(h)<Link to="/forward_h" /></Menu.Item>
                <Menu.Item key="menu_forward2h">Forward Divided-Differences O(h{<sup>2</sup>})<Link to="/forward_h2" /></Menu.Item>
                <Menu.Item key="menu_backwardh">Backward Divided-Differences O(h)<Link to="/backward_h" /></Menu.Item>
                <Menu.Item key="menu_backward2h">Backward Divided-Differences O(h{<sup>2</sup>})<Link to="/backward_h2" /></Menu.Item>
                <Menu.Item key="menu_central2h">Central Divided-Differences O(h{<sup>2</sup>})<Link to="/Central_h2" /></Menu.Item>
                <Menu.Item key="menu_central4h">Central Divided-Differences O(h{<sup>4</sup>})<Link to="/Central_h4" /></Menu.Item>
              </SubMenu>
              <Menu.Item key="11">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
              <Content style={{ padding: 24, margin: 20, minHeight: 280, }}>

                <Route path="/home" component={Home} />
                <Route path="/bisection" component={Bisection} />
                <Route path="/falsePosition" component={FalsePosition} />
                <Route path="/onepoint" component={Onepoint} />
                <Route path="/newtonraphson" component={Newtonraphson} />
                <Route path="/secant" component={Secant} />
                <Route path="/cramer" component={Cramer} />
                <Route path="/jacobiIterationMethod" component={JacobiIterationMethod} />
                <Route path="/gaussSeidelIteration" component={GaussSeidelIteration} />
                <Route path="/forward_h" component={Forward_h} />
                <Route path="/forward_h2" component={Forward_h2} />
                <Route path="/backward_h" component={Backward_h} />
                <Route path="/backward_h2" component={Backward_h2} />
                <Route path="/central_h2" component={Central_h2} />
                <Route path="/central_h4" component={Central_h4} />
                <Route path="/compositeTrapezoidal" component={CompositeTrapezoidal} />
                <Route path="/simpleTrapezoidal" component={SimpleTrapezoidaln} />
                <Route path="/compositeSimpson" component={CompositeSimpson} />
                <Route path="/simpleSimpson" component={SimpleSimpson} />
                <Route path="/linearRegression" component={LinearRegression} />
                <Route path="/polynomialRegression" component={PolynomialRegression} />
                <Route path="/lagrange" component={Lagrange} />
                
                
              </Content>
            </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
