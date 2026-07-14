import { ArrowDown, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoPng from '../../swag_logo.png';

export function Home() {
  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Hello, we are ...</p>
          <h1>SWAG!</h1>
          <h2>Student Welfare Awareness Group</h2>
          <p>We're here to listen, support,<br />and create a kinder school together.</p>
          <div className="button-row">
            <Link className="button primary" to="/about">Learn More <ArrowRight size={19} aria-hidden="true" /></Link>
            <Link className="button secondary" to="/form">Get Involved ♡</Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Smiling SWAG sketch character" role="img">
          <Sparkles className="doodle sparkle" aria-hidden="true" />
          <Heart className="doodle heart" aria-hidden="true" />
          <span className="green-squiggle" aria-hidden="true" />
          <div className="student-character">
            <div className="face">
              <span className="eye left" />
              <span className="eye right" />
              <span className="smile" />
            </div>
            <div className="shirt" />
            <img className="hero-hand left-hand" src={logoPng} alt="" aria-hidden="true" />
            <img className="hero-hand right-hand" src={logoPng} alt="" aria-hidden="true" />
          </div>
        </div>
        <a href="#previews" className="down-arrow" aria-label="Scroll to previews">
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      <span id="previews" aria-hidden="true" />
    </main>
  );
}
