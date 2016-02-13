var Question = React.createClass({
	render: function(){
		return <li>
				<div className="votes"><a className="uparrow">&uarr;</a><div>1010</div></div>
					<div className="element">
						<a>{this.props.question}</a>
						<div>
							<a>asked by {this.props.user}</a>
							<a>discuss</a>
							<a>save</a>
							<a>share</a>
							<ul className="tags">
								<li><a>#{this.props.tag1}</a></li>
								<li><a>#{this.props.tag2}</a></li>
								<li><a>#{this.props.tag3}</a></li>
							</ul>
					</div>
				</div>
		</li>;
	}
});

ReactDOM.render(<ul id='questions'>
	<Question user="Mihir" tag1="asd" tag2="nmv" tag3="lin" question="Why is this a question?"/> 
	<Question user="hello" tag1="asdas" tag2="lkq" tag3="mnn" question="Why is this not a question?"/>
	</ul>, document.getElementById('question')); 

