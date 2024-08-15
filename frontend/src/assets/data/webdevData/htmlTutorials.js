const htmlTutorials = [
  {
    title: "HTML Basics",
    description: "Learn the structure and basic syntax of HTML.",
    content: `
      <h2>HTML Basics</h2>
      <p>HTML (HyperText Markup Language) is the standard language for creating web pages.</p>
      <h3>Basic Structure</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;!DOCTYPE html&gt;
  &lt;html&gt;
    &lt;head&gt;
      &lt;title&gt;Page Title&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;h1&gt;My First Heading&lt;/h1&gt;
      &lt;p&gt;My first paragraph.&lt;/p&gt;
    &lt;/body&gt;
  &lt;/html&gt;</code></pre>`,
    preview: `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
      </body>
    </html>`,
  },
  {
    title: "HTML Headings",
    description: "Learn how to use headings in HTML.",
    content: `
      <h2>HTML Headings</h2>
      <p>Headings are used to define the titles and subtitles of a document.</p>
      <h3>Use Case</h3>
      <p>Use headings to create a structured and accessible document hierarchy.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;h1&gt;Main Heading&lt;/h1&gt;
  &lt;h2&gt;Subheading&lt;/h2&gt;
  &lt;h3&gt;Sub-subheading&lt;/h3&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <h1>Main Heading</h1>
        <h2>Subheading</h2>
        <h3>Sub-subheading</h3>
      </body>
    </html>`,
  },
  {
    title: "HTML Paragraphs",
    description: "Learn how to create paragraphs in HTML.",
    content: `
      <h2>HTML Paragraphs</h2>
      <p>Paragraphs are used to group blocks of text into a logical structure.</p>
      <h3>Use Case</h3>
      <p>Use paragraphs to separate different sections of text.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;p&gt;This is a paragraph of text.&lt;/p&gt;
  &lt;p&gt;This is another paragraph of text.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph of text.</p>
      </body>
    </html>`,
  },
  {
    title: "HTML Links",
    description: "Learn how to create hyperlinks in HTML.",
    content: `
      <h2>HTML Links</h2>
      <p>Links are used to navigate between web pages and external resources.</p>
      <h3>Use Case</h3>
      <p>Use links to connect different pages or external resources like documents or websites.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;a href=&quot;https://www.example.com&quot;&gt;Visit Example.com&lt;/a&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <a href="https://www.example.com">Visit Example.com</a>
      </body>
    </html>`,
  },
  {
    title: "HTML Images",
    description: "Learn how to embed images in HTML.",
    content: `
      <h2>HTML Images</h2>
      <p>Images can be embedded in a web page using the &lt;img&gt; tag.</p>
      <h3>Use Case</h3>
      <p>Use images to visually enhance your content or convey information graphically.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;img src=&quot;image.jpg&quot; alt=&quot;Description of Image&quot; /&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
      </body>
    </html>`,
  },
  {
    title: "HTML Lists",
    description: "Learn how to create ordered and unordered lists.",
    content: `
      <h2>HTML Lists</h2>
      <p>Lists are used to group related items together.</p>
      <h3>Use Case</h3>
      <p>Use lists for creating bullet points, steps, or any other grouped information.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;
&lt;ol&gt;
  &lt;li&gt;First step&lt;/li&gt;
  &lt;li&gt;Second step&lt;/li&gt;
&lt;/ol&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <ol>
          <li>First step</li>
          <li>Second step</li>
        </ol>
      </body>
    </html>`,
  },
  {
    title: "HTML Tables",
    description: "Learn how to create tables in HTML.",
    content: `
      <h2>HTML Tables</h2>
      <p>Tables are used to display data in a tabular format.</p>
      <h3>Use Case</h3>
      <p>Use tables for displaying structured data like schedules, pricing, or comparison charts.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Age&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Alice&lt;/td&gt;
    &lt;td&gt;24&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Bob&lt;/td&gt;
    &lt;td&gt;30&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <table border="1">
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Alice</td>
            <td>24</td>
          </tr>
          <tr>
            <td>Bob</td>
            <td>30</td>
          </tr>
        </table>
      </body>
    </html>`,
  },
  {
    title: "HTML Forms",
    description: "Learn how to create forms for user input.",
    content: `
      <h2>HTML Forms</h2>
      <p>Forms are used to collect user input and submit it to a server.</p>
      <h3>Use Case</h3>
      <p>Use forms for collecting user data, like login information, contact details, or survey responses.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;form&gt;
  &lt;label for=&quot;name&quot;&gt;Name:&lt;/label&gt;
  &lt;input type=&quot;text&quot; id=&quot;name&quot; name=&quot;name&quot;&gt;&lt;br&gt;
  &lt;label for=&quot;email&quot;&gt;Email:&lt;/label&gt;
  &lt;input type=&quot;email&quot; id=&quot;email&quot; name=&quot;email&quot;&gt;&lt;br&gt;
  &lt;input type=&quot;submit&quot; value=&quot;Submit&quot;&gt;
&lt;/form&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name"><br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email"><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>`,
  },
  {
    title: "HTML Buttons",
    description: "Learn how to create buttons in HTML.",
    content: `
      <h2>HTML Buttons</h2>
      <p>Buttons are interactive elements that can trigger actions or submit forms.</p>
      <h3>Use Case</h3>
      <p>Use buttons for user interactions, such as submitting forms or triggering JavaScript functions.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;button&gt;Click Me!&lt;/button&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <button>Click Me!</button>
      </body>
    </html>`,
  },
  {
    title: "HTML Div and Span",
    description: "Learn how to use div and span elements for grouping content.",
    content: `
      <h2>HTML Div and Span</h2>
      <p>The &lt;div&gt; element is used to group block-level content, while &lt;span&gt; is used for inline content.</p>
      <h3>Use Case</h3>
      <p>Use &lt;div&gt; for large sections and &lt;span&gt; for small portions within text or other inline elements.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;div&gt;
  &lt;p&gt;This is a paragraph inside a div.&lt;/p&gt;
  &lt;p&gt;Another paragraph inside the same div.&lt;/p&gt;
&lt;/div&gt;
&lt;p&gt;This is a &lt;span&gt;span&lt;/span&gt; inside a paragraph.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <div>
          <p>This is a paragraph inside a div.</p>
          <p>Another paragraph inside the same div.</p>
        </div>
        <p>This is a <span>span</span> inside a paragraph.</p>
      </body>
    </html>`,
  },
  {
    title: "HTML Inline vs Block Elements",
    description: "Understand the difference between inline and block elements in HTML.",
    content: `
      <h2>HTML Inline vs Block Elements</h2>
      <p>Block-level elements start on a new line and take up the full width available, while inline elements only take up as much space as necessary.</p>
      <h3>Use Case</h3>
      <p>Use block elements for major layout components and inline elements for minor styling or text modifications.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;div&gt;This is a block-level element.&lt;/div&gt;
&lt;span&gt;This is an inline element.&lt;/span&gt; inside a paragraph.</code></pre>`,
    preview: `
    <html>
      <body>
        <div>This is a block-level element.</div>
        <p>This is an <span>inline element</span> inside a paragraph.</p>
      </body>
    </html>`,
  },
  {
    title: "HTML Iframes",
    description: "Learn how to embed other documents or webpages within your HTML page using iframes.",
    content: `
      <h2>HTML Iframes</h2>
      <p>The &lt;iframe&gt; element allows you to embed another document within your current HTML page.</p>
      <h3>Use Case</h3>
      <p>Use iframes to embed external content, such as videos, maps, or other webpages, within your page.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;iframe src=&quot;https://www.example.com&quot; width=&quot;600&quot; height=&quot;400&quot;&gt;&lt;/iframe&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <iframe src="https://www.example.com" width="600" height="400"></iframe>
      </body>
    </html>`,
  },
  {
    title: "HTML Semantic Elements",
    description: "Learn about semantic HTML elements and their importance.",
    content: `
      <h2>HTML Semantic Elements</h2>
      <p>Semantic elements clearly describe their meaning in a human- and machine-readable way.</p>
      <h3>Use Case</h3>
      <p>Use semantic elements to improve the accessibility and SEO of your web pages.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;header&gt;Header content&lt;/header&gt;
&lt;nav&gt;Navigation links&lt;/nav&gt;
&lt;main&gt;Main content area&lt;/main&gt;
&lt;footer&gt;Footer content&lt;/footer&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <header>Header content</header>
        <nav>Navigation links</nav>
        <main>Main content area</main>
        <footer>Footer content</footer>
      </body>
    </html>`,
  },
  {
    title: "HTML Audio and Video",
    description: "Learn how to embed audio and video files in your HTML pages.",
    content: `
      <h2>HTML Audio and Video</h2>
      <p>HTML provides elements for embedding audio and video files directly into web pages.</p>
      <h3>Use Case</h3>
      <p>Use audio and video elements to include multimedia content on your web pages.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;audio controls&gt;
  &lt;source src=&quot;audio.mp3&quot; type=&quot;audio/mpeg&quot;&gt;
  Your browser does not support the audio element.
&lt;/audio&gt;

&lt;video width=&quot;320&quot; height=&quot;240&quot; controls&gt;
  &lt;source src=&quot;movie.mp4&quot; type=&quot;video/mp4&quot;&gt;
  Your browser does not support the video tag.
&lt;/video&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <audio controls>
          <source src="audio.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <br><br>
        <video width="320" height="240" controls>
          <source src="movie.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </body>
    </html>`,
  },
  {
    title: "HTML Meta Tags",
    description: "Learn about meta tags and their role in HTML.",
    content: `
      <h2>HTML Meta Tags</h2>
      <p>Meta tags provide metadata about the HTML document, such as the author, description, and keywords.</p>
      <h3>Use Case</h3>
      <p>Use meta tags to improve SEO, define the document's character set, and provide information to browsers and search engines.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;meta charset=&quot;UTF-8&quot;&gt;
&lt;meta name=&quot;description&quot; content=&quot;Learn the basics of HTML.&quot;&gt;
&lt;meta name=&quot;keywords&quot; content=&quot;HTML, web development, coding&quot;&gt;
&lt;meta name=&quot;author&quot; content=&quot;John Doe&quot;&gt;</code></pre>`,
    preview: `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="description" content="Learn the basics of HTML.">
        <meta name="keywords" content="HTML, web development, coding">
        <meta name="author" content="John Doe">
        <title>Meta Tags Example</title>
      </head>
      <body>
        <h1>Check the page source to see the meta tags.</h1>
      </body>
    </html>`,
  },
  {
    title: "HTML Character Entities",
    description: "Learn how to use HTML character entities to display reserved characters.",
    content: `
      <h2>HTML Character Entities</h2>
      <p>Character entities allow you to display reserved characters in HTML, such as <, >, &amp;, and more.</p>
      <h3>Use Case</h3>
      <p>Use character entities when you need to display special characters in your HTML content.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;p&gt;The following are reserved characters in HTML: &amp;lt;, &amp;gt;, &amp;amp;.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <p>The following are reserved characters in HTML: &lt;, &gt;, &amp;.</p>
      </body>
    </html>`,
  },
  {
    title: "HTML Forms - Input Types",
    description: "Learn about different input types available in HTML forms.",
    content: `
      <h2>HTML Forms - Input Types</h2>
      <p>HTML provides various input types for collecting different kinds of user data.</p>
      <h3>Use Case</h3>
      <p>Use different input types for collecting specific types of data, such as text, numbers, emails, dates, etc.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;form&gt;
  &lt;label for=&quot;text&quot;&gt;Text:&lt;/label&gt;
  &lt;input type=&quot;text&quot; id=&quot;text&quot; name=&quot;text&quot;&gt;&lt;br&gt;

  &lt;label for=&quot;number&quot;&gt;Number:&lt;/label&gt;
  &lt;input type=&quot;number&quot; id=&quot;number&quot; name=&quot;number&quot;&gt;&lt;br&gt;

  &lt;label for=&quot;email&quot;&gt;Email:&lt;/label&gt;
  &lt;input type=&quot;email&quot; id=&quot;email&quot; name=&quot;email&quot;&gt;&lt;br&gt;

  &lt;label for=&quot;date&quot;&gt;Date:&lt;/label&gt;
  &lt;input type=&quot;date&quot; id=&quot;date&quot; name=&quot;date&quot;&gt;&lt;br&gt;

  &lt;input type=&quot;submit&quot; value=&quot;Submit&quot;&gt;
&lt;/form&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <form>
          <label for="text">Text:</label>
          <input type="text" id="text" name="text"><br>

          <label for="number">Number:</label>
          <input type="number" id="number" name="number"><br>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email"><br>

          <label for="date">Date:</label>
          <input type="date" id="date" name="date"><br>

          <input type="submit" value="Submit">
        </form>
      </body>
    </html>`,
  },
  {
    title: "HTML Form Validation",
    description: "Learn how to use HTML form validation attributes.",
    content: `
      <h2>HTML Form Validation</h2>
      <p>HTML provides built-in validation attributes that allow you to control user input without the need for JavaScript.</p>
      <h3>Use Case</h3>
      <p>Use validation attributes to ensure that the user provides the correct type of data in forms.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;form&gt;
  &lt;label for=&quot;email&quot;&gt;Email:&lt;/label&gt;
  &lt;input type=&quot;email&quot; id=&quot;email&quot; name=&quot;email&quot; required&gt;&lt;br&gt;

  &lt;label for=&quot;age&quot;&gt;Age:&lt;/label&gt;
  &lt;input type=&quot;number&quot; id=&quot;age&quot; name=&quot;age&quot; min=&quot;18&quot; max=&quot;100&quot; required&gt;&lt;br&gt;

  &lt;input type=&quot;submit&quot; value=&quot;Submit&quot;&gt;
&lt;/form&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <form>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br>

          <label for="age">Age:</label>
          <input type="number" id="age" name="age" min="18" max="100" required><br>

          <input type="submit" value="Submit">
        </form>
      </body>
    </html>`,
  },
  {
    title: "HTML Inline Frames (iframes)",
    description: "Learn how to use iframes to embed external content in your HTML pages.",
    content: `
      <h2>HTML Inline Frames (iframes)</h2>
      <p>An iframe is used to embed another document within the current HTML document.</p>
      <h3>Use Case</h3>
      <p>Use iframes to embed external content like videos, maps, or other web pages within your site.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;iframe src=&quot;https://www.example.com&quot; width=&quot;600&quot; height=&quot;400&quot;&gt;&lt;/iframe&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <iframe src="https://www.example.com" width="600" height="400"></iframe>
      </body>
    </html>`,
  },
  {
    title: "HTML Blockquotes",
    description: "Learn how to use the blockquote element to display quoted text.",
    content: `
      <h2>HTML Blockquotes</h2>
      <p>The blockquote element is used to indicate that the enclosed text is a quotation from another source.</p>
      <h3>Use Case</h3>
      <p>Use blockquotes to display long quotes or citations in your HTML content.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;blockquote&gt;
  This is a blockquote element, typically used to display long quotations.
&lt;/blockquote&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <blockquote>
          This is a blockquote element, typically used to display long quotations.
        </blockquote>
      </body>
    </html>`,
  },
  {
    title: "HTML Comments",
    description: "Learn how to use HTML comments to annotate your code.",
    content: `
      <h2>HTML Comments</h2>
      <p>Comments are used to add notes or explanations to your HTML code, which are not displayed in the browser.</p>
      <h3>Use Case</h3>
      <p>Use comments to document your code, explain sections, or temporarily disable code without deleting it.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;!-- This is a comment in HTML --&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;!-- The following line is a comment and won't be displayed in the browser --&gt;
&lt;!-- &lt;p&gt;This paragraph is commented out.&lt;/p&gt; --&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <p>This is a paragraph.</p>
        <!-- This line is a comment and won't be displayed in the browser -->
        <!-- <p>This paragraph is commented out.</p> -->
      </body>
    </html>`,
  },
  {
    title: "HTML Entity References",
    description: "Learn about HTML entity references to display special characters.",
    content: `
      <h2>HTML Entity References</h2>
      <p>Entity references are used to display reserved characters like <, >, &, and non-keyboard characters like ©, €, etc.</p>
      <h3>Use Case</h3>
      <p>Use entity references when you need to display special characters that have a specific meaning in HTML.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;p&gt;This is a paragraph with special characters: &amp;lt;, &amp;gt;, &amp;amp;.&lt;/p&gt;
&lt;p&gt;And here are some more: &amp;copy;, &amp;euro;.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <p>This is a paragraph with special characters: &lt;, &gt;, &amp;.</p>
        <p>And here are some more: ©, €.</p>
      </body>
    </html>`,
  },
  {
    title: "HTML Anchor Links",
    description: "Learn how to use anchor links to navigate within a webpage.",
    content: `
      <h2>HTML Anchor Links</h2>
      <p>Anchor links allow you to create hyperlinks that navigate to a specific part of a webpage.</p>
      <h3>Use Case</h3>
      <p>Use anchor links to help users quickly navigate to different sections of a long webpage.</p>
      <h3>Example</h3>
      <pre style="background-color: #e3e3e3; padding: 10px; border-radius: 5px;"><code>&lt;a href=&quot;#section1&quot;&gt;Go to Section 1&lt;/a&gt;
&lt;h2 id=&quot;section1&quot;&gt;Section 1&lt;/h2&gt;
&lt;p&gt;This is section 1.&lt;/p&gt;</code></pre>`,
    preview: `
    <html>
      <body>
        <a href="#section1">Go to Section 1</a>
        <h2 id="section1">Section 1</h2>
        <p>This is section 1.</p>
      </body>
    </html>`,
  },
];

export default htmlTutorials;
