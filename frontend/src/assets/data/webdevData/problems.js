export const problems = [
  {
    title: "NavBar Fun",
    description: `
      Create a navigation bar that has a smooth transition
      effect on hover.
    `,
    htmlContent: `
      <nav class="navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    `,
    cssContent: `
      .navbar {
        background-color: #333;
        padding: 10px;
      }
      
      .navbar ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-around;
      }
      
      .navbar ul li {
        margin: 0 10px;
      }
      
      .navbar ul li a {
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        display: block;
        transition: background-color 0.3s ease;
      }
      
      .navbar ul li a:hover {
        background-color: #555;
        border-radius: 5px;
      }
      
      @media (max-width: 768px) {
        .navbar ul {
          flex-direction: column;
          align-items: center;
        }
        
        .navbar ul li {
          margin: 5px 0;
        }
      }
    `,
  },
  {
    title: "Form Play",
    description: `
      Create a registration form with name, email, password and confirm password. Add a button at the end of the form
      and apply some shadows around the form as well.
    `,
    htmlContent: `
      <form class="registration-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control">
          <small class="error-message">Name is required.</small>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control">
          <small class="error-message">Please enter a valid email address.</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control">
          <small class="error-message">Password must be at least 8 characters long.</small>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" class="form-control">
          <small class="error-message">Passwords do not match.</small>
        </div>
        <button type="submit" class="submit-button" disabled>Register</button>
      </form>
    `,
    cssContent: `
      .registration-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .form-group {
        margin-bottom: 15px;
      }
      
      .form-control {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      .error-message {
        color: red;
        font-size: 12px;
        display: none;
      }
      
      .form-control.invalid {
        border-color: red;
      }
      
      .form-control.valid {
        border-color: green;
      }
      
      .submit-button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: not-allowed;
        transition: background-color 0.3s ease;
      }
      
      .submit-button.enabled {
        cursor: pointer;
        background-color: #0056b3;
      }
      
      .submit-button:disabled:hover {
        background-color: #007BFF;
      }
      
      .submit-button.enabled:hover {
        background-color: #003d82;
      }
    `
  },
  {
    title: "Sneaky Tooltip",
    description: `
      Create a simple tooltip that appears when the user hovers over a word or phrase.
      The tooltip should have a small arrow pointing to the word and should disappear
      smoothly when the mouse is moved away.
    `,
    htmlContent: `
     <center>
      <p>
        Hover over this word 
        <span class="tooltip">tooltip
          <span class="tooltip-text">This is a simple tooltip!</span>
        </span>
        to see the tooltip.
      </p>
     </center>
    `,
    cssContent: `
      .tooltip {
        display:flex;
        justify-content:center;
        position: relative;
        cursor: pointer;
        color: #007BFF;
        text-decoration: underline;
      }
      
      .tooltip .tooltip-text {
        visibility: hidden;
        width: 140px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -70px;
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .tooltip .tooltip-text::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
      }
      
      .tooltip:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    `,
  },
  {
    title: "Button Bonanza",
    description: `
      Design a set of stylish buttons with different shapes, colors, and hover effects.
      Include round, square, and pill-shaped buttons, each with a unique color scheme.
      Also change the button's appearance on hover.
    `,
    htmlContent: `
      <div class="button-set">
        <button class="round-btn"> Round </button>
        <button class="square-btn">Square</button>
        <button class="pill-btn">Pill</button>
      </div>
    `,
    cssContent: `
      .button-set {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 20px;
      }
      
      .button-set button {
        
        font-size: 16px;
        color: white;
        border: none;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .round-btn {
        background-color: #FF6347;
        border-radius: 50%;
        width:80px;
        height:80px;
        padding: 20px 20px;
      }
      
      .square-btn {
        background-color: #4682B4;
        border-radius: 0;
        padding: 20px 20px;
      }
      
      .pill-btn {
        background-color: #32CD32;
        border-radius: 30px;
        width:50px;
        height:80px;
        font-size:5px;
      }
      
      .button-set button:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    `,
  },
  {
    title: "Sticky Navbar Magic",
    description: `
      Create a sticky navigation bar with a smooth dropdown menu. The navbar should stay fixed 
      at the top of the page. Hovering over the 'Services' link 
      should reveal a dropdown with smooth animations.
    `,
    htmlContent: `
      <nav class="navbar">
        <ul class="nav-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li class="dropdown">
            <a href="#">Services</a>
            <ul class="dropdown-menu">
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Development</a></li>
              <li><a href="#">SEO</a></li>
            </ul>
          </li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    `,
    cssContent: `
      .navbar {
        background-color: #333;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      
      .nav-menu {
        display: flex;
        justify-content: center;
        list-style-type: none;
        padding: 10px;
        margin: 0;
      }
      
      .nav-menu > li {
        margin: 0 20px;
      }
      
      .nav-menu a {
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        display: block;
        transition: background-color 0.3s ease;
      }
      
      .nav-menu a:hover {
        background-color: #555;
      }
      
      .dropdown {
        position: relative;
      }
      
      .dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #444;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        list-style-type: none;
        padding: 10px 0;
        margin: 0;
        z-index: 999;
      }
      
      .dropdown-menu li {
        margin: 0;
      }
      
      .dropdown-menu a {
        padding: 10px 20px;
        white-space: nowrap;
      }
      
      .dropdown:hover .dropdown-menu {
        display: block;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @media (max-width: 768px) {
        .nav-menu {
          flex-direction: column;
          align-items: flex-start;
        }
        .nav-menu > li {
          margin: 10px 0;
        }
      }
    `,
    
  },
  {
    title: "Grid Guru Layout",
    description: `
      Build a simple webpage layout using CSS Grid. The layout should have a header,
      a content area divided into two columns, and a footer. 
    `,
    htmlContent: `
      <div class="grid-container">
        <header class="header">Header</header>
        <div class="content">
          <div class="left-column">Left Column</div>
          <div class="right-column">Right Column</div>
        </div>
        <footer class="footer">Footer</footer>
      </div>
    `,
    cssContent: `
      .grid-container {
        display: grid;
        grid-template-areas:
          "header"
          "content"
          "footer";
        grid-gap: 20px;
        padding: 20px;
      }
      
      .header {
        grid-area: header;
        background-color: #4682B4;
        padding: 20px;
        color: white;
        text-align: center;
      }
      
      .content {
        grid-area: content;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 20px;
      }
      
      .left-column, .right-column {
        background-color: #FFF;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .footer {
        grid-area: footer;
        background-color: #333;
        padding: 20px;
        color: white;
        text-align: center;
      }
      
      @media (max-width: 768px) {
        .content {
          grid-template-columns: 1fr;
        }
      }
    `,
  },
  {
    title: "The Dancing Square",
    description: `
      Create a fun animation using CSS keyframes. Animate a square that changes color,
      rotates, and moves across the screen. Make sure the animation is smooth and runs
      infinitely in a loop.
    `,
    htmlContent: `
      <div class="animated-square"></div>
    `,
    cssContent: `
      .animated-square {
        width: 100px;
        height: 100px;
        background-color: #FF4500;
        position: relative;
        animation: moveAndRotate 5s infinite linear;
      }
      
      @keyframes moveAndRotate {
        0% {
          left: 0;
          transform: rotate(0deg);
          background-color: #FF4500;
        }
        50% {
          left: 200px;
          transform: rotate(180deg);
          background-color: #32CD32;
        }
        100% {
          left: 0;
          transform: rotate(360deg);
          background-color: #FF4500;
        }
      }
    `,
  },
  {
    title: "Magic Gradient Canvas",
    description: `
      Design a web page with a beautiful gradient background that changes color when
      the user hovers over it. The gradient should transition smoothly between two or
      more colors, and the page content should be centered.
    `,
    htmlContent: `
      <div class="content">
        <h1>Welcome to My Website</h1>
        <p>Enjoy the beautiful gradient background!</p>
      </div>
    `,
    cssContent: `
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(45deg, #FF6347, #4682B4);
        transition: background 0.3s ease;
      }
      
      .content {
        text-align: center;
        color: white;
      }
      
      body:hover {
        background: linear-gradient(45deg, #32CD32, #FFD700);
      }
    `,
  },
  {
    title: "Pixel Perfect Gallery",
    description: `
      Build a simple image gallery with a grid layout. The gallery should display four
      images per row on large screens, two per row on tablets, and one per row on mobile
      devices. Add a hover effect to enlarge the images slightly.
    `,
    htmlContent: `
      <div class="gallery">
        <!-- You can change the image src as per your wish -->
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Gallery Image">
      </div>
    `,
    cssContent: `
      .gallery {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        padding: 20px;
      }
      
      .gallery img {
        width: 100%;
        transition: transform 0.3s ease;
      }
      
      .gallery img:hover {
        transform: scale(1.1);
      }
      
      @media (max-width: 768px) {
        .gallery {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 480px) {
        .gallery {
          grid-template-columns: 1fr;
        }
      }
    `,
  },
  
 
  

 
 
    {
      title: "Fancy Flexbox Cards",
      description: `
        Design a stunning, responsive card layout where each card should showcase an image, title, 
        description, and a button with smooth hover effects.
      `,
      htmlContent: `
        <div class="card-container">
         <!-- You can change the image src as per your wish -->
          <div class="card">
            <img src="https://www.w3schools.com/w3images/lights.jpg" alt="Card Image">
            <h2>Card Title 1</h2>
            <p>This is a description of the first card.</p>
            <button>Learn More</button>
          </div>
          <div class="card">
            <img src="https://www.w3schools.com/w3images/nature.jpg" alt="Card Image">
            <h2>Card Title 2</h2>
            <p>This is a description of the second card.</p>
            <button>Learn More</button>
          </div>
          <div class="card">
            <img src="https://www.w3schools.com/w3images/mountains.jpg" alt="Card Image">
            <h2>Card Title 3</h2>
            <p>This is a description of the third card.</p>
            <button>Learn More</button>
          </div>
        </div>
      `,
      cssContent: `
        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
        }
        
        .card {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: calc(33.333% - 40px);
        }
        
        .card img {
          width: 100%;
          height: auto;
        }
        
        .card h2 {
          padding: 15px;
          font-size: 24px;
          margin: 0;
        }
        
        .card p {
          padding: 0 15px 15px;
          font-size: 16px;
          color: #555;
        }
        
        .card button {
          margin: 15px;
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #007BFF;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        .card button:hover {
          background-color: #0056b3;
        }
        
        @media (max-width: 768px) {
          .card {
            width: calc(50% - 40px);
          }
        }
        
        @media (max-width: 480px) {
          .card {
            width: calc(100% - 40px);
          }
        }
      `,
    },

  ];
  