var Searchbar = React.createClass({  
  render: function() {
    return <div className="input-group col-md-4">
        <div className="input-group-btn">
        	<button className="btn btn-default" type="submit">
        		<i className="glyphicon glyphicon-search"></i>
        	</button>
        </div>
        <input type="text" className="form-control" placeholder="Diabetes, cardio-vascular diseases..." name="q" ></input>
        
    </div>;
  }
});

ReactDOM.render(<Searchbar />, document.getElementById('sear')); 