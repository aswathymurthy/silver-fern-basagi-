import React from 'react';

function SilverFernAbout() {
  return (
    <section id="about" className="sf-about-section">

      {/* Top Hero Grid matching exact Figma screenshot */}
      <div className="sf-about-hero-grid">
        <div className="sf-about-hero-left">
          <div className="sf-services-pill">
            <span className="sf-services-pill-dot"></span>
            About Us
          </div>
          <h2 className="sf-about-main-title">
            <span>Growing Together</span> For A Better<br />Tomorrow
          </h2>
          <p className="sf-about-hero-desc">
            Silver Fern Farmers Producer Company Limited Is A Farmer-Owned And Farmer-Driven Organization Established To Strengthen Agriculture Through Cooperation, Innovation, And Sustainable Development. We Work To Improve The Economic Well-Being Of Farmers By Supporting Production, Procurement, Processing, Marketing, And Value Addition Of Agricultural Produce.
          </p>
          <p className="sf-about-hero-desc">
            Our Organization Serves As A Platform Where Farmers Come Together To Access Better Resources, Improve Productivity, And Create Stronger Market Opportunities.
          </p>
        </div>
        <div className="sf-about-hero-right">
          <img src="/assets/about2.jpg" alt="Farmers working in field" className="sf-about-hero-img" />
        </div>
      </div>

      {/* Middle Row: Rice stalk illustration on left, Vision & Mission on right */}
      <div className="sf-about-middle-row">
        <div className="sf-about-illustration">
          <img src="/assets/about1.png" alt="Rice stalk graphic" className="sf-rice-stalk-img" />
        </div>
        <div className="sf-about-cards">
          <div className="sf-about-card-row">
            <h3 className="sf-card-label">Vision</h3>
            <div className="sf-card-box">
              <p>
                Our Vision Is To Create A Prosperous And Sustainable Agricultural Ecosystem Where Farmers Thrive Through Innovation, Collaboration, And Collective Growth. We Aim To Empower Farming Communities By Improving Productivity, Enhancing Market Opportunities, And Promoting Responsible Agricultural Practices That Ensure Long-Term Prosperity For Present And Future Generations.
              </p>
            </div>
          </div>
          <div className="sf-about-card-row">
            <h3 className="sf-card-label">Mission</h3>
            <div className="sf-card-box">
              <p>
                Our Mission Is To Create A Prosperous And Sustainable Agricultural Ecosystem Where Farmers Thrive Through Innovation, Collaboration, And Collective Growth. We Aim To Empower Farming Communities By Improving Productivity, Enhancing Market Opportunities, And Promoting Responsible Agricultural Practices That Ensure Long-Term Prosperity For Present And Future Generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Callout Statement */}
      <div className="sf-about-bottom-row">
        <h3 className="sf-about-footer-text">
          Together, We Cultivate Growth, Strengthen Communities, And Create A Sustainable Future For Agriculture.
        </h3>
      </div>

      {/* Extended Detailed Text */}
      <div className="sf-about-extended-text">
        <p>
          Silver Fern Farmers Producer Company Limited Is A Farmer Owned And Farmer Driven Organization Established With The Vision Of Strengthening Agricultural Communities Through Collective Action, Innovation, And Sustainable Development. We Believe That Farmers Are The Backbone Of Our Economy And By Working Together, They Can Achieve Greater Success, Stronger Market Presence, And Improved Livelihoods.
        </p>
        <p>
          Our Organization Also Serves To Create Opportunities For Farmers By Bringing Them Together On A Common Platform Where They Can Benefit From Shared Resources, Knowledge, And Market Access. Through Collective Action, We Help Farmers Overcome Challenges Such As Fluctuating Market Prices, Limited Access To Resources, And Fragmented Supply Chains. By Fostering Cooperation And Mutual Support, We Aim To Build A Resilient Agricultural Ecosystem That Benefits Both Farmers And Consumers.
        </p>
        <p>
          At Silver Fern Farmers Producer Company Limited, We Support Our Members Across The Entire Agricultural Value Chain, From Agricultural Production And Procurement To Processing, Packaging, Value Addition, Marketing, And Distribution. We Strive To Ensure That Farmers Receive Better Returns For Their Produce, Our Focus Is On Fostering Sustainable Farming Practices That Enhance Productivity, Improve Product Quality, And Enhance Profitability While Being Environmentally Responsible Farming Practices.
        </p>
        <p>
          We Are Committed To Providing Farmers With Access To Quality Agricultural Inputs, Modern Farming Techniques, Technical Guidance, Training Programs, And Market Linkages. By Encouraging Innovation And Continuous Learning, We Help Farmers Adapt To Changing Agricultural Trends And Adopt Practices That Maximize Efficiency And Long-Term Sustainability. Our Efforts Are Directed Toward Empowering Farmers With The Knowledge And Resources Needed To Make Informed Decisions And Achieve Lasting Growth.
        </p>
        <p>
          Beyond Agriculture, We Are Dedicated To Strengthening Rural Communities By Promoting Economic Development, Social Well-Being, And Community Participation. We Believe That The Success Of Farmers Contributes Directly To The Prosperity Of Rural Areas, Creating Opportunities For Future Generations And Fostering Inclusive Growth Through Transparency, Accountability, And A Strong Commitment To Farmer Welfare, We Continue To Build An Organization That Reflects The Aspirations And Needs Of Its Members.
        </p>
        <p>
          At Silver Fern Farmers Producer Company Limited, Our Mission Goes Beyond Farming. We Are Building A Community Of Empowered Producers Working Together To Create Value, Drive Innovation, And Achieve Shared Success. With A Focus On Sustainability, Cooperation, And Growth, We Remain Dedicated To Cultivating A Brighter Future For Agriculture And The Communities That Depend On It.
        </p>
      </div>

      {/* Full Width Image Banner */}
      <div className="sf-about-full-image">
        <img src="/assets/about3.jpg" alt="Farmers harvesting" />
      </div>

      {/* Core Values Section */}
      <div className="sf-about-core-values-header">
        <h2>Our Core Values</h2>
      </div>

      <div className="sf-core-values-grid">
        <div className="sf-core-value-card">
          <div className="sf-core-icon">🤝</div>
          <h3>Collaboration</h3>
          <p>We believe in the power of working together to achieve greater success and build a stronger agricultural community.</p>
        </div>
        <div className="sf-core-value-card">
          <div className="sf-core-icon">🌱</div>
          <h3>Sustainability</h3>
          <p>We are committed to environmentally responsible practices that ensure long-term prosperity for future generations.</p>
        </div>
        <div className="sf-core-value-card">
          <div className="sf-core-icon">💡</div>
          <h3>Innovation</h3>
          <p>We embrace modern farming techniques and technologies to maximize efficiency and improve productivity.</p>
        </div>
        <div className="sf-core-value-card">
          <div className="sf-core-icon">🏆</div>
          <h3>Quality</h3>
          <p>We strive to ensure that farmers receive better returns by enhancing product quality across the entire value chain.</p>
        </div>
        <div className="sf-core-value-card">
          <div className="sf-core-icon">🧑‍🌾</div>
          <h3>Farmer-Centric</h3>
          <p>As a farmer-owned organization, the welfare and success of our members is at the heart of everything we do.</p>
        </div>
        <div className="sf-core-value-card">
          <div className="sf-core-icon">🌍</div>
          <h3>Community</h3>
          <p>We are dedicated to strengthening rural communities by promoting economic development and social well-being.</p>
        </div>
      </div>

    </section>
  );
}

export default SilverFernAbout;
