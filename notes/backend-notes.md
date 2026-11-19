Why does dotenv need to load before anything that reads process.env?

What does exporting the app from one file and starting it in another give you? (Hint: testing, and later the DB connection.)


## What middleware is

Middleware is a function that runs on every request before it reaches your route. You register it with app.use(...). Each one does its job, then passes the request along to the next.

Step 1: Add express.json()
What it does: reads the JSON body of incoming requests and puts it on req.body. Without it, req.body is undefined, so your React form data would never reach your routes.
How: it’s already part of Express, so there’s nothing to install. Call app.use() and pass it the result of express.json().

Step 2: Add cors
What it does: browsers block a page on one origin (React at localhost:5173) from calling an API on another (localhost:3008) unless the API allows it. The cors package adds the headers that allow it.
How: you already installed the package. Import it with require("cors") at the top, then call app.use() with cors().
Later: you’ll pass an option so only your frontend URL is allowed. For now, the default is fine for learning.

Step 3: Mind the order

Put both app.use(...) lines after const app = express() and before your routes. Express runs things top to bottom, so a route defined first would never see req.body or the CORS headers.


File	     Does
app.js	     requires express, cors, and the router; creates the app; adds middleware; 
              mounts routes; exports the app
server.js	 loads dotenv, imports the app, calls listen


https://claude.ai/artifact/Ng8PRzYMmCWFt3X8gpKU6z#821a7c70-2cdf.mf6hacf59nh.0

https://claude.ai/share/a025cf32-8370-43eb-8111-b59e3d7a4ccd