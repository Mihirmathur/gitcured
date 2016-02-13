var Hello = React.createClass({  
  render: function() {
    return <div>
    <input>
    </input>
    <input>
    </input>
    </div>;

  }
});

React.render(<Hello name='World' />, document.getElementById('head')); 