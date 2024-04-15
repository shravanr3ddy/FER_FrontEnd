import React from "react";

const About = () => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>What We Do</h1>
              {/* About Text */}
              <p className="about_content">
                Welcome to MeloMood, where technology meets music to craft
                your personal soundtrack. Our mission is to revolutionize the
                way you experience music by aligning it with your emotions. With
                MeloMood, your expressions become the key to discovering music
                that truly speaks to you.
              </p>

              <p className="about_content">
                At MeloMood, we harness the power of Facial Expression
                Recognition (FER) to understand and predict your mood from a
                photo or live webcam feed. Our platform goes beyond the usual
                music discovery methods by offering a unique, emotionally
                intelligent service that responds to the subtle nuances of your
                facial expressions.
              </p>

              <p className="about_content">
                Our state-of-the-art Emotion-Synced Music Feature takes your
                uploaded image or live capture and processes it to detect your
                current emotional state. Utilizing this emotional insight, we
                then curate and recommend a playlist that resonates with how you
                feel at that moment, providing a musical experience that's as
                dynamic and varied as your emotions.
              </p>

              <p className="about_content">
                We appreciate the profound relationship between music and mood.
                That's why we've designed MeloMood to be a personal DJ for
                your feelings, ensuring that the right tunes accompany every
                moment of your life. Save your emotion-matched playlists and
                revisit them whenever you need a sonic companion that truly
                understands you.
              </p>

              <p className="about_content">
                At MeloMood, we're passionate about delivering a harmonious
                blend of tech and tunes to elevate your daily life. Join us on
                this innovative journey where your emotions cue the perfect
                playlist, creating a harmonious experience that's tailored just
                for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section id="staff" className="py-5 text-center bg-dark text-white">
        <div className="container">
          <h1>Our Team</h1>
          <hr />
          <div className="row">
            {/* Team Member 1 */}
            <div className="col-md-2 mr-3">
              <img
                src="img/chandhu.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Chandhu</h4>
            </div>
            {/* Team Member 2 */}
            <div className="col-md-2 mr-5">
              <img
                src="img/samhitha.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Samhitha</h4>
            </div>
            {/* Team Member 3 */}
            <div className="col-md-2 mr-4 ml-2">
              <img
                src="img/elham_sadeghi.png"
                alt=""
                style={{ height: 170, minWidth: 170 }}
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Elham Sadeghi</h4>
            </div>
            {/* Team Member 4 */}
            <div className="col-md-2 mr-3">
              <img
                src="img/tarun.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Tarun</h4>
            </div>
            {/* Team Member 5 */}
            <div className="col-md-2">
              <img
                src="img/jebin.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Pavani</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
