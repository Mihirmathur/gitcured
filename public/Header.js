var Hello = React.createClass({  
  render: function() {
    return <div>
    <nav className="navbar navbar-default navbar-fixed-top">
	    <div className="container">
	        <div className="navbar-header">
	        </div>
	     	<div className="col-md-6">
	     	<h5 className="brand"> Health </h5>
	     	</div>
	    	<div className="col-md-3 top">
				<input type="email" className="form-control" id="InputEmail" placeholder="Email">
	    		</input>
	    	</div>
	    	<div className="col-md-3 top">
	    	
	    		<input type="email" className="form-control" id="InputPassword" placeholder="password">
	    		</input>
	    	
	    		
	    	</div>
	    </div>
    </nav>
    </div>;
  }
});

React.render(<Hello name='World' />, document.getElementById('head')); 