import "./Techs.css"
function Techs() {
  return (
    <div className="techs">
      <h3 className="techs__caption">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__blocks">
        <div className="techs__block">HTML</div>
        <div className="techs__block">CSS</div>
        <div className="techs__block">JS</div>
        <div className="techs__block">React</div>
        <div className="techs__block">Git</div>
        <div className="techs__block">Express.js</div>
        <div className="techs__block">mongoDB</div>
      </div>
    </div >
  );
}

export default Techs
