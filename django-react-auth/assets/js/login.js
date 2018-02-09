var React = require('react')
var auth = require('./auth')



module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    
    getInitialState: function() {
        return {
          login_error: false,
          'error_status':"",
        }
      },

    handleSubmit: function(e) {
        e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value
               $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        }),



            $.ajax({
            type: 'POST',
            url: '/api/obtain-auth/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){

                    if(res)
                    {

                     authenticated: true,
                    console.log(res,"ressss")
                    this.context.router.replace('/app/')

                    }




            }.bind(this),
            error: (xhr, status, err) => {

                    this.setState({error_status: "Invalid Login Credentials"})
                    console.log(xhr,"Errorloging in")
                    authenticated: false

            }
        })


    },





    render: function() {
        return (

                        <div className="container" className="main" >
                            <div className="row">
                                <div className="span12">
                                    <form onSubmit={this.handleSubmit} className="form-horizontal" >
                                        <fieldset>
                                            <div className="well well-lg" >
                                                <div id="legend">
                                                    <legend className="login">Login</legend>
                                                </div>
                                                     <div className="form-group form-group-sm"   >
                                                       <div className="row" className="f_r">

                                                            <label className="control"  for="username" className="col-xs-4"  >Username</label>
                                                            <div className="form-group form-group-sm " className="col-xs-4">
                                                                <input  className="form-control input-sm" type="text" id="username" name="username"placeholder="username" ref="username" />
                                                            </div>
                                                       </div>
                                                     </div>

                                                     <div className="form-group form-group-sm">
                                                          <div className="row" className="f_r">
                                                              <label className="control" for="password" className="col-xs-4"   >Password</label>
                                                                 <div className="form-group form-group-sm" className="col-xs-4">
                                                                    <input className="form-control input-sm" type="password" id="password" name="password"placeholder="password" ref="pass" />
                                                                 </div>
                                                          </div>
                                                     </div>
                                                     <div className="form-group form-group-sm">

                                                        <div className="form-group form-group-sm" className="login" >
                                                            <input type="submit" className="btn btn-success" />
                                                            <h5 className="red">{this.state.error_status}</h5>
                                                        </div>
                                                     </div>
                                                </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>





        )    
    }
})
