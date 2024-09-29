const cssTutorials = [
  {
    title: "CSS Basics",
    description: "Learn the basics of CSS and how to style HTML elements.",
    content: `
      <h2>CSS Basics</h2>
      <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  body {
    background-color: lightblue;
  }

  h1 {
    color: navy;
    margin-left: 20px;
  }
&lt;/style&gt;

&lt;h1&gt;This is a heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          body {
            background-color: lightblue;
          }
          h1 {
            color: navy;
            margin-left: 20px;
          }
        </style>
      </head>
      <body>
        <h1>This is a heading</h1>
        <p>This is a paragraph.</p>
      </body>
    </html>`,
  },
  {
    title: "CSS Selectors",
    description: "Learn how to select HTML elements to style them with CSS.",
    content: `
      <h2>CSS Selectors</h2>
      <p>Selectors are used to select the HTML elements you want to style.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  p {
    color: red;
  }

  .intro {
    font-size: 120%;
  }
&lt;/style&gt;

&lt;p class=&quot;intro&quot;&gt;This is an introductory paragraph.&lt;/p&gt;
&lt;p&gt;This is a regular paragraph.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          p {
            color: red;
          }
          .intro {
            font-size: 120%;
          }
        </style>
      </head>
      <body>
        <p class="intro">This is an introductory paragraph.</p>
        <p>This is a regular paragraph.</p>
      </body>
    </html>`,
  },
  {
    title: "CSS Box Model",
    description: "Learn about the box model and how it affects layout.",
    content: `
      <h2>CSS Box Model</h2>
      <p>The CSS box model describes the rectangular boxes generated for elements in the document tree and the space around them.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  div {
    width: 300px;
    padding: 25px;
    border: 25px solid navy;
    margin: 25px;
  }
&lt;/style&gt;

&lt;div&gt;This is a box.&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          div {
            width: 300px;
            padding: 25px;
            border: 25px solid navy;
            margin: 25px;
          }
        </style>
      </head>
      <body>
        <div>This is a box.</div>
      </body>
    </html>`,
  },
  {
    title: "CSS Flexbox",
    description: "Learn how to use Flexbox for flexible layouts.",
    content: `
      <h2>CSS Flexbox</h2>
      <p>Flexbox is a layout model that allows for the creation of flexible and responsive layouts.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  .container {
    display: flex;
  }

  .box {
    background-color: coral;
    width: 100px;
    height: 100px;
    margin: 10px;
  }
&lt;/style&gt;

&lt;div class=&quot;container&quot;&gt;
  &lt;div class=&quot;box&quot;&gt;1&lt;/div&gt;
  &lt;div class=&quot;box&quot;&gt;2&lt;/div&gt;
  &lt;div class=&quot;box&quot;&gt;3&lt;/div&gt;
&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          .container {
            display: flex;
          }
          .box {
            background-color: coral;
            width: 100px;
            height: 100px;
            margin: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="box">1</div>
          <div class="box">2</div>
          <div class="box">3</div>
        </div>
      </body>
    </html>`,
  },
  {
    title: "CSS Grid",
    description: "Learn how to use CSS Grid for complex layouts.",
    content: `
      <h2>CSS Grid</h2>
      <p>CSS Grid Layout is a two-dimensional layout system for the web.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
  }

  .grid-item {
    background-color: lightgreen;
    padding: 20px;
    text-align: center;
  }
&lt;/style&gt;

&lt;div class=&quot;grid-container&quot;&gt;
  &lt;div class=&quot;grid-item&quot;&gt;1&lt;/div&gt;
  &lt;div class=&quot;grid-item&quot;&gt;2&lt;/div&gt;
  &lt;div class=&quot;grid-item&quot;&gt;3&lt;/div&gt;
  &lt;div class=&quot;grid-item&quot;&gt;4&lt;/div&gt;
  &lt;div class=&quot;grid-item&quot;&gt;5&lt;/div&gt;
  &lt;div class=&quot;grid-item&quot;&gt;6&lt;/div&gt;
&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          .grid-container {
            display: grid;
            grid-template-columns: auto auto auto;
            gap: 10px;
          }
          .grid-item {
            background-color: lightgreen;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="grid-container">
          <div class="grid-item">1</div>
          <div class="grid-item">2</div>
          <div class="grid-item">3</div>
          <div class="grid-item">4</div>
          <div class="grid-item">5</div>
          <div class="grid-item">6</div>
        </div>
      </body>
    </html>`,
  },
  {
    title: "CSS Positioning",
    description: "Learn how to position elements using CSS.",
    content: `
      <h2>CSS Positioning</h2>
      <p>Positioning allows you to control the placement of elements on the page.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  .container {
    position: relative;
  }

  .box {
    position: absolute;
    top: 50px;
    left: 100px;
    background-color: yellow;
    padding: 20px;
  }
&lt;/style&gt;

&lt;div class=&quot;container&quot;&gt;
  &lt;div class=&quot;box&quot;&gt;This box is positioned.&lt;/div&gt;
&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          .container {
            position: relative;
          }
          .box {
            position: absolute;
            top: 50px;
            left: 100px;
            background-color: yellow;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="box">This box is positioned.</div>
        </div>
      </body>
    </html>`,
  },
  {
    title: "CSS Pseudo-classes",
    description: "Learn how to use CSS pseudo-classes for advanced styling.",
    content: `
      <h2>CSS Pseudo-classes</h2>
      <p>Pseudo-classes are used to define special states of elements.</p>
     <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  a:hover {
    color: orange;
  }

  a:visited {
    color: purple;
  }
&lt;/style&gt;

&lt;a href=&quot;#&quot;&gt;This is a link&lt;/a&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          a:hover {
            color: orange;
          }
          a:visited {
            color: purple;
          }
        </style>
      </head>
      <body>
        <a href="#">This is a link</a>
      </body>
    </html>`,
  },
  {
    title: "CSS Transitions",
    description: "Learn how to create smooth transitions between CSS states.",
    content: `
      <h2>CSS Transitions</h2>
      <p>Transitions allow you to change property values smoothly over a given duration.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  div {
    width: 100px;
    height: 100px;
    background-color: red;
    transition: width 2s;
  }

  div:hover {
    width: 200px;
  }
&lt;/style&gt;

&lt;div&gt;&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          div {
            width: 100px;
            height: 100px;
            background-color: red;
            transition: width 2s;
          }
          div:hover {
            width: 200px;
          }
        </style>
      </head>
      <body>
        <div></div>
      </body>
    </html>`,
  },
  {
    title: "CSS Animations",
    description: "Learn how to create animations with CSS.",
    content: `
      <h2>CSS Animations</h2>
      <p>CSS animations allow you to animate the transition of an element from one style to another.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  @keyframes example {
    from {background-color: red;}
    to {background-color: yellow;}
  }

  div {
    width: 100px;
    height: 100px;
    background-color: red;
    animation-name: example;
    animation-duration: 4s;
  }
&lt;/style&gt;

&lt;div&gt;&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          @keyframes example {
            from {background-color: red;}
            to {background-color: yellow;}
          }
          div {
            width: 100px;
            height: 100px;
            background-color: red;
            animation-name: example;
            animation-duration: 4s;
          }
        </style>
      </head>
      <body>
        <div></div>
      </body>
    </html>`,
  },
  {
    title: "CSS Variables",
    description: "Learn how to use CSS variables to manage your styles.",
    content: `
      <h2>CSS Variables</h2>
      <p>CSS variables (custom properties) allow you to store values that can be reused throughout your stylesheet.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  :root {
    --main-color: blue;
    --main-padding: 10px;
  }

  div {
    color: var(--main-color);
    padding: var(--main-padding);
  }
&lt;/style&gt;

&lt;div&gt;This text is styled using CSS variables.&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          :root {
            --main-color: blue;
            --main-padding: 10px;
          }
          div {
            color: var(--main-color);
            padding: var(--main-padding);
          }
        </style>
      </head>
      <body>
        <div>This text is styled using CSS variables.</div>
      </body>
    </html>`,
  },
  {
    title: "CSS Media Queries",
    description: "Learn how to create responsive designs with media queries.",
    content: `
      <h2>CSS Media Queries</h2>
      <p>Media queries allow you to apply CSS styles based on the characteristics of the device, such as its width.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  body {
    background-color: lightblue;
  }

  @media (max-width: 600px) {
    body {
      background-color: lightgreen;
    }
  }
&lt;/style&gt;

&lt;p&gt;Resize the browser window to see the background color change.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          body {
            background-color: lightblue;
          }
          @media (max-width: 600px) {
            body {
              background-color: lightgreen;
            }
          }
        </style>
      </head>
      <body>
        <p>Resize the browser window to see the background color change.</p>
      </body>
    </html>`,
  },
  {
    title: "CSS Grid Areas",
    description: "Learn how to create complex layouts using CSS Grid areas.",
    content: `
      <h2>CSS Grid Areas</h2>
      <p>CSS Grid areas allow you to define sections of your layout that can be named and placed in a grid.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  .grid-container {
    display: grid;
    grid-template-areas:
      'header header header'
      'nav content content'
      'nav footer footer';
    gap: 10px;
  }

  .header { grid-area: header; background-color: lightcoral; }
  .nav { grid-area: nav; background-color: lightblue; }
  .content { grid-area: content; background-color: lightgreen; }
  .footer { grid-area: footer; background-color: lightyellow; }
&lt;/style&gt;

&lt;div class=&quot;grid-container&quot;&gt;
  &lt;div class=&quot;header&quot;&gt;Header&lt;/div&gt;
  &lt;div class=&quot;nav&quot;&gt;Navigation&lt;/div&gt;
  &lt;div class=&quot;content&quot;&gt;Main Content&lt;/div&gt;
  &lt;div class=&quot;footer&quot;&gt;Footer&lt;/div&gt;
&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          .grid-container {
            display: grid;
            grid-template-areas:
              'header header header'
              'nav content content'
              'nav footer footer';
            gap: 10px;
          }
          .header { grid-area: header; background-color: lightcoral; }
          .nav { grid-area: nav; background-color: lightblue; }
          .content { grid-area: content; background-color: lightgreen; }
          .footer { grid-area: footer; background-color: lightyellow; }
        </style>
      </head>
      <body>
        <div class="grid-container">
          <div class="header">Header</div>
          <div class="nav">Navigation</div>
          <div class="content">Main Content</div>
          <div class="footer">Footer</div>
        </div>
      </body>
    </html>`,
  },
  {
    title: "CSS Z-Index",
    description: "Learn how to control stacking order with CSS z-index.",
    content: `
      <h2>CSS Z-Index</h2>
      <p>The z-index property specifies the stack order of elements.</p>
     <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  div {
    position: absolute;
    padding: 20px;
    color: white;
  }

  .box1 {
    background-color: red;
    z-index: 1;
    top: 50px;
    left: 50px;
  }

  .box2 {
    background-color: blue;
    z-index: 2;
    top: 70px;
    left: 70px;
  }
&lt;/style&gt;

&lt;div class=&quot;box1&quot;&gt;Box 1&lt;/div&gt;
&lt;div class=&quot;box2&quot;&gt;Box 2&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          div {
            position: absolute;
            padding: 20px;
            color: white;
          }
          .box1 {
            background-color: red;
            z-index: 1;
            top: 50px;
            left: 50px;
          }
          .box2 {
            background-color: blue;
            z-index: 2;
            top: 70px;
            left: 70px;
          }
        </style>
      </head>
      <body>
        <div class="box1">Box 1</div>
        <div class="box2">Box 2</div>
      </body>
    </html>`,
  },
  {
    title: "CSS Backgrounds",
    description: "Learn how to control the background of elements.",
    content: `
      <h2>CSS Backgrounds</h2>
      <p>The background properties are used to define the background effects for elements.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  body {
    background-color: lightgray;
  }

  .background-example {
    background-image: url('example.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 200px;
  }
&lt;/style&gt;

&lt;div class=&quot;background-example&quot;&gt;This div has a background image.&lt;/div&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          body {
            background-color: lightgray;
          }
          .background-example {
            background-image: url('example.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            height: 200px;
          }
        </style>
      </head>
      <body>
        <div class="background-example">This div has a background image.</div>
      </body>
    </html>`,
  },
  {
    title: "CSS Borders",
    description: "Learn how to style borders with CSS.",
    content: `
      <h2>CSS Borders</h2>
      <p>The border properties allow you to specify the style, width, and color of an element's border.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  p {
    border: 2px solid black;
    padding: 10px;
  }

  .dashed-border {
    border-style: dashed;
  }
&lt;/style&gt;

&lt;p&gt;This is a paragraph with a solid border.&lt;/p&gt;
&lt;p class=&quot;dashed-border&quot;&gt;This is a paragraph with a dashed border.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          p {
            border: 2px solid black;
            padding: 10px;
          }
          .dashed-border {
            border-style: dashed;
          }
        </style>
      </head>
      <body>
        <p>This is a paragraph with a solid border.</p>
        <p class="dashed-border">This is a paragraph with a dashed border.</p>
      </body>
    </html>`,
  },
  {
    title: "CSS Margins",
    description: "Learn how to control the margins of elements.",
    content: `
      <h2>CSS Margins</h2>
      <p>The margin properties are used to create space around elements, outside of any defined borders.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  p {
    margin: 20px;
    padding: 10px;
    background-color: lightcoral;
  }

  .no-margin {
    margin: 0;
  }
&lt;/style&gt;

&lt;p&gt;This paragraph has a 20px margin.&lt;/p&gt;
&lt;p class=&quot;no-margin&quot;&gt;This paragraph has no margin.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          p {
            margin: 20px;
            padding: 10px;
            background-color: lightcoral;
          }
          .no-margin {
            margin: 0;
          }
        </style>
      </head>
      <body>
        <p>This paragraph has a 20px margin.</p>
        <p class="no-margin">This paragraph has no margin.</p>
      </body>
    </html>`,
  },
  {
    title: "CSS Padding",
    description: "Learn how to control the padding of elements.",
    content: `
      <h2>CSS Padding</h2>
      <p>The padding properties are used to create space inside of elements, within any defined borders.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  p {
    padding: 20px;
    background-color: lightblue;
  }

  .no-padding {
    padding: 0;
  }
&lt;/style&gt;

&lt;p&gt;This paragraph has 20px padding.&lt;/p&gt;
&lt;p class=&quot;no-padding&quot;&gt;This paragraph has no padding.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          p {
            padding: 20px;
            background-color: lightblue;
          }
          .no-padding {
            padding: 0;
          }
        </style>
      </head>
      <body>
        <p>This paragraph has 20px padding.</p>
        <p class="no-padding">This paragraph has no padding.</p>
      </body>
    </html>`,
  },
  {
    title: "CSS Text Styling",
    description: "Learn how to style text with CSS.",
    content: `
      <h2>CSS Text Styling</h2>
      <p>CSS offers various properties to style text, such as font, color, and alignment.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  h1 {
    font-family: Arial, sans-serif;
    color: darkblue;
    text-align: center;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
  }
&lt;/style&gt;

&lt;h1&gt;This is a heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph with styled text.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          h1 {
            font-family: Arial, sans-serif;
            color: darkblue;
            text-align: center;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <h1>This is a heading</h1>
        <p>This is a paragraph with styled text.</p>
      </body>
    </html>`,
  },
  {
    title: "CSS Lists",
    description: "Learn how to style lists with CSS.",
    content: `
      <h2>CSS Lists</h2>
      <p>You can style list items and the list marker with CSS.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  ul {
    list-style-type: square;
  }

  li {
    color: darkgreen;
    margin: 5px 0;
  }
&lt;/style&gt;

&lt;ul&gt;
  &lt;li&gt;List item 1&lt;/li&gt;
  &lt;li&gt;List item 2&lt;/li&gt;
  &lt;li&gt;List item 3&lt;/li&gt;
&lt;/ul&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          ul {
            list-style-type: square;
          }
          li {
            color: darkgreen;
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </body>
    </html>`,
  },
  {
    title: "CSS Table Styling",
    description: "Learn how to style tables with CSS.",
    content: `
      <h2>CSS Table Styling</h2>
      <p>CSS allows you to add styles to tables, such as borders, spacing, and alignment.</p>
      <br>
      <b>Example</b>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;style&gt;
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: lightgray;
  }
&lt;/style&gt;

&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Header 1&lt;/th&gt;
    &lt;th&gt;Header 2&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Row 1, Cell 1&lt;/td&gt;
    &lt;td&gt;Row 1, Cell 2&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Row 2, Cell 1&lt;/td&gt;
    &lt;td&gt;Row 2, Cell 2&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: lightgray;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
          </tr>
        </table>
      </body>
    </html>`,
  },
];

export default cssTutorials;