var React = require('react')
var auth = require('./auth')

module.exports = React.createClass({
         contextTypes: {
        router: React.PropTypes.object.isRequired
    },


      getInitialState() {
    return {
            'Err_msg':"",
            };
        }

,


   handleSubmit(e)
   {
        e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value
        var email=this.refs.email.value
        var f_name=this.refs.f_name.value
        var l_name=this.refs.l_name.value


        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        }),

        $.ajax({
            type: 'POST',
            url: '/api/create_user/',
            data: {
                username: username,
                password: pass,
                email:email,
                first_name: f_name,
                last_name: l_name

            },
            success: function(res){
                console.log(res,"success")
                this.context.router.replace('/app/login/')
            }.bind(this),

            error: function(xhr, status, err)
            {

                 console.log(errs_text,"The errors are here")
                 if(xhr.responseJSON.username){
                 var errs_text=JSON.stringify(xhr.responseJSON.username)
                 console.log(this.setState({Err_msg: errs_text}))
                 }
                 else if(xhr.responseJSON.password){
                 var errs_text=JSON.stringify(xhr.responseJSON.password)
                 console.log(this.setState({Err_msg: errs_text}))
                 }
                 else if(xhr.responseJSON.email){
                 var errs_text=JSON.stringify(xhr.responseJSON.email)
                 console.log(this.setState({Err_msg: errs_text}))
                 }




            }.bind(this)
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
                                                    <legend style={{textAlign:"center"}}>Register</legend>
                                                </div>
                                                     <div className="form-group form-group-sm">
                                                       <div className="row" className="f_r">

                                                            <label className="control"  for="username" className="col-xs-4"  >Username</label>
                                                            <div className="form-group form-group-sm " className="col-xs-4">
                                                                <input  className="form-control input-sm" type="text" id="username" name="username"placeholder="username" ref="username" />
                                                            </div>
                                                       </div>
                                                     </div>
                                                     <div className="form-group form-group-sm">
                                                          <div className="row" className="f_r">
                                                              <label className="control" for="password" className="col-xs-4"  >Password</label>
                                                                 <div className="form-group form-group-sm" className="col-xs-4">
                                                                    <input className="form-control input-sm" type="password" id="password" name="password"placeholder="password" ref="pass" />
                                                                 </div>
                                                          </div>
                                                     </div>
                                                     <div className="form-group form-group-sm">
                                                       <div className="row" className="f_r">

                                                            <label className="control"  for="email" className="col-xs-4"  >Email Id   </label>
                                                            <div className="form-group form-group-sm " className="col-xs-4">
                                                                <input  className="form-control input-sm" type="text" id="email" name="email"placeholder="email" ref="email" />
                                                            </div>
                                                       </div>
                                                     </div>
                                                     <div className="form-group form-group-sm">
                                                       <div className="row" className="f_r">

                                                            <label className="control"  for="f_name" className="col-xs-4"  >First Name</label>
                                                            <div className="form-group form-group-sm " className="col-xs-4">
                                                                <input  className="form-control input-sm" type="text" id="f_name" name="f_name"placeholder="first name" ref="f_name" />
                                                            </div>
                                                       </div>
                                                     </div>
                                                     <div className="form-group form-group-sm">
                                                       <div className="row" className="f_r">

                                                            <label className="control"  for="l_name" className="col-xs-4"  >Last Name</label>
                                                            <div className="form-group form-group-sm " className="col-xs-4">
                                                                <input  className="form-control input-sm" type="text" id="l_name" name="l_name"placeholder="last name" ref="l_name" />
                                                            </div>
                                                       </div>
                                                     </div>
                                                     <div className="form-group form-group-sm">

                                                        <div className="form-group form-group-sm" className="login"  >
                                                            <input type="submit" className="btn btn-success" />
                                                            <div>
                                                                  <h4>{this.state.Err_msg}</h4>
                                                            </div>
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
