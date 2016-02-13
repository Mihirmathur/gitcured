var Section = React.createClass({
  render: function(){
    return(
      <div className = "wrksect">
      <img className = "wrkimg" src={'img/'+this.props.lnk}></img>
      <div className="wrktext">
      <span className = "wrktitle"><a target = "_blank" className="textlink" href={this.props.href}>{this.props.title}</a></span>
      <br/>
      <span className="wrksubhead">{this.props.subhead}</span>
      <br/>
      <p className = "wrkcont">{this.props.children}</p>
      </div>
      </div>);
    }
  });

  ReactDOM.render(
  <div>
  <Section lnk="db.png" title = "Web Development Intern, Daily Bruin" subhead="Oct 2015 - Dec 2015" href="http://dailybruin.com/">
  Daily Bruin is UCLAs student-run daily newspaper. As an intern, I worked on the <a target = "_blank" className="textlink" href="http://dailybruin.com/gameday-ucla-vs-usc/">Football Hub </a>page of the e-newspaper which will be used for all UCLA football games (UCLA vs USC, 2015 onwards). I used HTML/CSS, PHP, Wordpress for this project. I also uploaded articles on the site and the mobile app using Camayak.
  </Section>
  <br/>
  <div>, document.getElementById('app'));