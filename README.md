<h1>URL Shortener Project</h1>


This project is a URL shortener application built with Node.js and Express.js. It allows users to shorten URLs, view analytics for each shortened URL (such as total clicks over time), and delete URLs. User authentication is implemented to ensure that only logged-in users can manage their URLs and view analytics and also integrate email otp password reset functionality.


<h2>Features</h2>
    <ul>
        <li>Shorten long URLs</li>
        <li>User authentication</li>
        <li>View URL analytics (total clicks with timestamps)</li>
        <li>Delete URLs</li>
        <li>Static file serving</li>
        <li>EJS templating engine</li>
        <li>Error handling for 404 pages</li>
        <li>Forgot Password using Email OTP</li>
    </ul>

   <h2>Prerequisites</h2>
    <ul>
        <li>Node.js (v12.x or higher)</li>
        <li>npm (v6.x or higher)</li>
        <li>MongoDB instance</li>
    </ul>

<h2>Installation</h2>
    <ol>
        <li>Clone the repository
            <pre><code>git clone https://github.com//Sujal-2712/url-shortener.git
cd url-shortener</code></pre>
        </li>
        <li>Install dependencies
            <pre><code>npm install</code></pre>
        </li>
        <li>Set up environment variables
            <p>Create a <code>.env</code> file in the root directory and add the following variables:</p>
            <pre><code>PORT=8000
DATABASE_URL=your_mongodb_connection_string</code></pre>
            <p>Replace <code>your_mongodb_connection_string</code> with your actual MongoDB connection string.</p>
        </li>
    </ol>



 <h2>Running the Application</h2>
    <p>Start the server with:</p>
    <pre><code>npm start</code></pre>
    <p>The server will be running on <code>http://localhost:8000</code>.</p>

   
 <h3>app.js</h3>
    <p>The main file that sets up the Express server, middleware, database connection, and routes.</p>


  <h3>connection/conn.js</h3>
    <p>Handles the connection to MongoDB.</p>

 <h3>public</h3>
    <p>Contains static files like CSS, JavaScript, and images.</p>
    <h3>router</h3>
    <p>Contains the route handlers for static files, URL management, and user authentication.</p>
    <h3>views</h3>
    <p>Contains the EJS template files for rendering the web pages, including a view for displaying analytics (<code>analytics.ejs</code>).</p>
    <h2>Middleware</h2>
    <ul>
        <li><code>express.json()</code> - Parses incoming JSON requests.</li>
        <li><code>express.urlencoded({ extended: false })</code> - Parses incoming URL-encoded data.</li>
        <li><code>cookie-parser</code> - Parses cookies attached to the client request object.</li>
    </ul>
    <h2>Routes</h2>
    <ul>
        <li><code>/url</code> - Handled by <code>urlRouter</code> for URL-related operations, including creating, viewing, and deleting shortened URLs.</li>
        <li><code>/user</code> - Handled by <code>userRoute</code> for user authentication and profile management.</li>
        <li><code>/</code> - Handled by <code>staticRoute</code> for serving static files and the homepage.</li>
        <li><code>/*</code> - Renders the <code>404.ejs</code> page for undefined routes.</li>
    </ul>
    <h2>URL Analytics</h2>
    <p>Users can view the total number of clicks for each shortened URL along with timestamps to track usage over time. This feature is accessible after logging in.</p>
    <h2>Error Handling</h2>
    <ul>
        <li><strong>404 Error:</strong> Any undefined route will render the <code>404.ejs</code> template.</li>
    </ul>
    <h2>Live Demo :</h2>
    <p>https://url-shortner-g9rx.onrender.com/</p>
    <h2>Contact</h2>
    <p>For any questions or feedback, please open an issue or reach out to <code>sujalkareliya27@gmail.com</code>.</p>


