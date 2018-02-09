var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router')
var App = require('./app')
var Login = require('./login')
var Register = require('./register')
var auth = require('./auth')
var New_home= require('./new_home')


function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/app/login/',
            state: {nextPathname: '/app/'}
        })
    }
}

ReactDOM.render(
    <Router.Router history={Router.browserHistory}>
        <Router.Route path='/app/login/' component={Login} />
        <Router.Route path='/app/register/' component={Register} />
        <Router.Route path='/app/' component={App} />
        <Router.Route path='/app/home/' component={New_home} />
    </Router.Router>,
    document.getElementById('app')    
)
