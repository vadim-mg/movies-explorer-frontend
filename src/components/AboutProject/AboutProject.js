import './AboutProject.css'
function AboutProject() {
  return (
    <div className="about-project">
      <article className="about-project__article">
        <h3 className="about-project__caption">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </article>
      <article className="about-project__article">
        <h3 className="about-project__caption">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>
      <div className="about-project__plan">
        <div className="about-project__plan-item about-project__plan-item_bg_green">1 неделя</div>
        <div className="about-project__plan-item about-project__plan-item_bg_gray">4 недели</div>
        <div className="about-project__plan-item about-project__plan-item_text">Back-end</div>
        <div className="about-project__plan-item about-project__plan-item_text">Front-end</div>
      </div>
    </div >
  );
}

export default AboutProject
