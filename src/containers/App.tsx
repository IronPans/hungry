import * as React from 'react';
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {connect} from 'react-redux';
import {AnimatedSwitch} from 'bee-mobile';
import {spring} from "react-motion";
import {Button} from 'bee-mobile';
import '../App.scss';
import LoginContainer from './page/Login';
import Routes from '../router/Routes';
import {initUserData} from '../model/user/action';
import RegisterContainer from './page/Register';

interface AppProps {
    loginData?: any;
    initUserData?: Function;
}

export class App extends React.PureComponent<AppProps, any> {
    pageTransitions = {
        enterStyles: {
            opacity: 0
        },
        leaveStyles: {
            opacity: spring(0, {
                stiffness: 128,
                damping: 16,
            })
        },
        activeStyles: {
            opacity: spring(1, {
                stiffness: 128,
                damping: 16,
            })
        }
    };

    componentDidMount() {
        (this.props.initUserData as Function)();
    }

    render() {
        const {children, loginData} = this.props;
        return (
            <Router>
                <div className="height-100">
                    <div className="App height-100">
                        <AnimatedSwitch {...this.pageTransitions} styles={(style: any) => ({
                            opacity: style.opacity
                        })} className="bm-PageContent">

                            <Route exact path="/" component={Routes.AsyncHome}/>
                            <Route exact path="/login"  render={() => (loginData.isLogin ? <Redirect to="/app/home"/> : <LoginContainer/>)}/>
                            <Route exact path="/register"  render={() => (loginData.isLogin ? <Redirect to="/app/home"/> : <RegisterContainer/>)}/>
                            <Route path="/app" component={Routes.AsyncHome}/>
                            <Route path="/shop" component={Routes.AsyncShop}/>
                            <Route path="/list" component={Routes.AsyncList}/>
                        </AnimatedSwitch>
                    </div>
                    {children}
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      loginData: state.loginData
  }
};

const mapDispatchToProps = ({
    initUserData
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;