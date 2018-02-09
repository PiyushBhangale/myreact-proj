var React = require('react')
var auth = require('./auth')
var new_notes=[]
var s_n=[]
module.exports = React.createClass({

   getInitialState: function() {



        return {'user':[],
                'notes':[],
                'current_user':[],
                'note_status':"",
                'id':"",
                'all_user':[],
                'note_value':"1",
                'user_value':"",
                'shared_values':[],
                'all_notes':[],


                }
    },



   componentDidMount: function() {
        this.loadUserData()
        this.loadNotes()
        this.loadall_user_data()




   },
            
   contextTypes: {
        router: React.PropTypes.object.isRequired
   },

   loadall_user_data:function()
   {
          $.ajax({
                    method: 'GET',
                    url: '/api/all_users/',
                    datatype: 'json',

                    success: function(res) {

                        this.setState({all_user: res})
                        console.log(this.state.all_user,"allusers")

                    }.bind(this),
                     error: function(xhr, status, err)
                      {
                       console.log(err,"alluser error")
                      }
          }),

        $.ajax
        ({
                method: 'GET',
                url: '/api/shared_data/',
                datatype: 'json',

                success: function(res) {

                    this.setState({shared_values: res})
                      console.log(this.state.shared_values,"shared")

                }.bind(this),
                 error: function(xhr, status, err)
                  {
                   console.log(xhr,"alluser error")
                  }
        }),

        $.ajax({
            method: 'GET',
            url: '/api/all_notes/',
            datatype: 'json',

            success: function(res) {

                this.setState({all_notes: res})
                console.log("allllnotes",this.state.all_notes)

            }.bind(this)
        })
   },
   logoutHandler: function() {

        this.context.router.replace('/app/login/')
        $.ajax({
            method: 'DELETE',
            url: '/api/obtain-auth/',
            datatype: 'json',

            success: function(res) {
                console.log("sucess")
            }.bind(this)
        })

   },

    loadUserData: function() {
        $.ajax({
            method: 'GET',
            url: '/api/user_details/',
            datatype: 'json',

            success: function(res) {

                this.setState({user: res})

            }.bind(this)
        })

    },

    loadNotes: function() {

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        }),

        $.ajax({
            method: 'GET',
            url: '/api/notes/',
            datatype: 'json',

            success: function(res) {

                this.setState({notes: res})

            }.bind(this)
        })

    },


   handleSubmit(e)
   {
        e.preventDefault()

        var note_context = this.refs.note.value
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        }),

        $.ajax({
            type: 'POST',
            url: '/api/post_notes/',
            data: {
                note: note_context,


            },
            success: function(res){


                this.refs.note.value=""
                new_notes.push(res)
                var updated=Object.assign(this.state.notes,new_notes)
                console.log("updated",updated)
                console.log("newnotes",new_notes)

                this.setState({notes: updated})


                console.log("Note Created",this.state.notes)
            }.bind(this),
            error: function(xhr, status, err)
            {
                 console.log(err,xhr,"error_msg")

//                 this.setState({Err_msg:email_err});

            }
        })

   },


    get_notes: function()
   {

                let row=[];

                //var list_1=this.state.notes;

                list_1=this.state.notes
                list_2=this.state.users






               list_1.forEach(
               function (elem, index)
               {

               if(elem.completed==false)
               {
//                       list_1.forEach(
//                       function (elem, index)
//                       {

                                   row.push(

                                            <div className="container-fluid" style={{textAlign:"left"}} >

                                                  <div className="row">
                                                        <div className="col-sm-4" >
                                                            <h4>{elem.note }  </h4>
                                                            <h4>{elem.id }  </h4>
                                                        </div>



                                                            <label><button onClick={() => {



                                                             console.log("completed called")
                                                             console.log("note_id",elem.id)
                                                                 $.ajaxSetup({
                                                            beforeSend: function (xhr, settings) {
                                                                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                                                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                                                                }
                                                            }
                                                        }),

                                                        $.ajax({
                                                            type: 'POST',
                                                            url: '/api/update_notes/',
                                                            data: {
                                                                completed:true,
                                                                id:elem.id,




                                                            },
                                                            success: function(res){
                                                               console.log("success",res.id)
                                                                newarr=this.state.notes
                                                               for(x in newarr)
                                                               {
                                                                    if(res.id==newarr[x].id)
                                                                    {
                                                                    newarr[x].completed=true
                                                                    }

                                                               }

                                                                this.setState({notes: newarr})

                                                               console.log("notessssss",this.state.notes)

                    //                                           this.setState({notes: res})

                                                            }.bind(this),
                                                            error: function(xhr, status, err)
                                                            {
                                                                 console.log(err,xhr,"error_msg")

                                                //                 this.setState({Err_msg:email_err});

                                                            }
                                                        })

                                                            }}  className="col-sm-6" className="btn btn-success" >Set Completed</button></label>

                                                        </div>


                                            </div>





                                        )


               }



               }.bind(this))



                return <div>{row}</div>;

   },

    shared_by_me:function()
    {



                   let row=[]

                   new_list=this.state.shared_values
                   console.log("insharedme",new_list)
                   note_list=this.state.notes

                   new_list.forEach(
                   function (elem, index)
                   {

                            note_list.forEach(
                            function (note, i)
                            {
                            if(note.id==elem.note_shared && note.author==elem.shared_by)

                    row.push(

                                <div>{note.note}</div>



                           )

                         })
                    })

                    return<div>{row}</div>




    },
    shared_by_others:function()
    {

                   let row=[]

                   new_list=this.state.shared_values
                   note_list=this.state.all_notes

                   new_list.forEach(
                   function (elem, index)
                   {

                            note_list.forEach(
                            function (note, i)
                            {
                            if(note.id==elem.note_shared && note.author==elem.shared_to)



                                row.push(

                                            <div>{note.note}</div>



                                       )

                            })
                   })

                    return<div>{row}</div>


    },

   get_share_user_data:function()
   {



    let share_user=[]

    user_list=this.state.all_user



   user_list.forEach(function (elem, index)
                   {

                    share_user.push(

                                <option value={elem.id}>{elem.username}</option>



                           )
            })
       return <select onChange={this.handleuserChange} >{share_user}</select>


   },

  handleuserChange:function(e){
       console.log("inside handle userchange")

        this.setState({user_value:e.target.value});
        console.log(this.state.user_value,"notevalue")
  },






   get_share_note_data:function()
   {


    let share_notes=[]



    note_list=this.state.notes




       note_list.forEach(function (elem, index)
                   {

                    share_notes.push(

                                <option value={elem.id} ref="tobeshared">{elem.id}</option>



                           )
                   })
            return <select  onChange={this.handlenoteChange} >{share_notes}</select>




   },

   handlenoteChange:function(e){
   console.log("inside handle change")
   console.log("change",e.target)
    this.setState({note_value:e.target.value});
     console.log(e.target.value,"notevalue")

  },

   comp_notes: function()
   {

                let row=[];

                //var list_1=this.state.notes;

                list_1=this.state.notes






               list_1.forEach(
               function (elem, index)
               {
               if(elem.completed==true)
               {
               row.push(

                        <div className="container-fluid" style={{textAlign:"left"}} >

                              <div className="row">
                                    <div className="col-sm-4" >
                                        <div>
                                            <h4>{elem.note }  </h4>

                                            <h4>{elem.id }  </h4>
                                        </div>
                                    </div>

                                    <div>
                                            <label><button onClick={() => {




                                         console.log("note_id",elem.id)
                                             $.ajaxSetup({
                                        beforeSend: function (xhr, settings) {
                                            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                                            }
                                        }
                                    }),

                                    $.ajax({
                                        type: 'POST',
                                        url: '/api/update_notes/',
                                        data: {
                                            completed:false,
                                            id:elem.id,




                                        },
                                        success: function(res){
                                           console.log("success",res.id)
                                            newarr=this.state.notes
                                           for(x in newarr)
                                           {
                                                if(res.id==newarr[x].id)
                                                {
                                                newarr[x].completed=false
                                                }

                                           }

                                            this.setState({notes: newarr})

                                           console.log("notessssss",this.state.notes)

//                                           this.setState({notes: res})

                                        }.bind(this),
                                        error: function(xhr, status, err)
                                        {
                                             console.log(err,xhr,"error_msg")

                            //                 this.setState({Err_msg:email_err});

                                        }
                                    })

                                        }}  className="col-sm-6" className="btn btn-success" >Set InCompleted</button></label>



                                    </div>

                              </div>
                        </div>





                    )

               }



               }.bind(this))



                return <div>{row}</div>;

   },







    render: function() {
        return (
         <div class="container" className="login">
            <div className="login">
                <div className="jumbotron" >
                    <h2>Welcome,{this.state.user.first_name} {this.state.user.last_name} </h2>
                    <h4 >You are now logged in, {this.state.user.username}</h4>
                     <button onClick={this.logoutHandler} className="btn btn-danger btn-sm">Log out</button>
                </div>
                    <div>



                                <form  style={{padding:"20px 100px 0px 490px"}}>
                                    <div class="form-group" >
                                            <label for="usr"></label>
                                            <input className="form-control input-lg" className="col-sm-6" type="text" id="note" name="note"placeholder="Note" ref="note" class="form-control-lg" />
                                    </div>
                                    <div class="form-group"  style={{padding:"0px 490px 0px 100px"}}>

                                            <button onClick={this.handleSubmit} className="col-sm-6" className="btn btn-success">Create Note</button>
                                    </div>

                                </form>





                        <div className="one">
                            <div className="wrapper">
                                    <div className="first">
                                        <h1>{this.get_notes()}</h1>

                                    </div>
                                    <div className="second">
                                        <h1>{this.comp_notes()}</h1>
                                    </div>
                            </div>




                                    <div class="form-group" >
                                            {this.get_share_note_data()}
                                             {this.get_share_user_data()}

                                    </div>
                                    <div class="form-group"  style={{padding:"0px 490px 0px 100px"}}>

                                            <button  className="col-sm-6"  onClick={() => {



                                            $.ajaxSetup({
                                                            beforeSend: function (xhr, settings) {
                                                                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                                                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                                                                }
                                                            }
                                                        }),

                                            $.ajax({
                                                type: 'POST',
                                                url: '/api/shared_data/',
                                                data: {
                                                    shared_to: this.state.user_value,
                                                    note_shared:this.state.note_value,


                                                },
                                                success: function(res){

                                                    console.log("success",res)
                                                    s_n.push(res)
                                                    var updated=Object.assign(this.state.shared_values,s_n)
                                                    console.log("shareddd",updated)
                                                    this.setState({shared_values: updated})
                                                    console.log("final_shareddd",this.state.shared_values)


                                                }.bind(this),
                                                error: function(xhr, status, err)
                                                {
                                                     console.log(err,xhr,"error_msg")

                                    //                 this.setState({Err_msg:email_err});

                                                }
                                            })

                                                 console.log(this.state.note_value,"notevalueclick")
                                                 console.log(this.state.user_value,"uservalueclick")
                                            }}
                                            className="btn btn-success">Share Note</button>

                                    </div>

                            <h1>--------------------</h1>
                            <h1>Shared by me</h1>
                            <h1>{this.shared_by_me()}</h1>
                            <h1>--------------------</h1>
                            <h1>Shared by others</h1>
                            <h1>{this.shared_by_others()}</h1>







                    </div>
                </div>
            </div>
         </div>




        )        
    }
})
