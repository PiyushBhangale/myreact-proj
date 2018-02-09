var React = require('react')
var auth = require('./auth')

module.exports = React.createClass({
   getInitialState: function() {
        return {'user':[],
                'notes':[],
                }
    },




   render: function() {
        return (
            <div>
                <div>
                    <h1>You are now logged in,</h1>
                    <h1>Welcome, </h1>
                    <button >Log out</button>
                </div>
                <div>
                    <div class="container">
                            <h2>Create notes</h2>
                            <p>Create your notes here</p>
                            <form onSubmit={this.handleSubmit} method='POST'>
                                <div class="form-group">
                                        <label for="usr">Note:</label>
                                        <input type="text" id="note" name="note"placeholder="Note" ref="note" class="form-control-lg" />
                                        <input type="submit" className="btn btn-success" />
                                </div>
                            </form>
                    </div>
                    <div>
                        <h1>notess</h1>

                    </div>
                </div>
            </div>





        )
    }
})
