var Hello = React.createClass({  
  render: function() {
    return <div>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email">
    </input>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="password">
    </input>
    </div>;

  }
});

React.render(<Hello name='World' />, document.getElementById('head')); 