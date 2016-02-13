var Hello = React.createClass({
  render: function() {
    return <div>
    <nav className="navbar navbar-default navbar-fixed-top">
      <form action="/login" method="post">
  	    <div className="container">
          <div className="navbar-header">
          </div>
  	     	<div className="col-md-6">
    	     	<h5 className="brand"> Health </h5>
  	     	</div>
  	    	<div className="col-md-3 top">
    				<input type="email" className="form-control" id="InputEmail" placeholder="Email" name="username"></input>
  	    	</div>
  	    	<div className="col-md-3 top">
  	    		<input type="password" className="form-control" id="InputPassword" placeholder="password" name="password"></input>
  	    	</div>
          <input type="submit" value="Submit"></input>
  	    </div>
      </form>
    </nav>
    </div>;
  }
});


ReactDOM.render(<Hello />, document.getElementById('head'));
