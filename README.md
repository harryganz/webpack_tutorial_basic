## Webpack Tutorial

### Configure Webpack for React

1. Install Webpack
  ```
  npm install webpack --save
  ```
2. Install babel-core, babel-loader, babel-preset-react, babel-preset-es2015
  ```
  npm install babel-core babel-loader babel-preset-react babel-preset-es2015 --save
  ```
3. Create a file named webpack.config.js in the root of the project. This is where
webpack will look for the configuration.
4. In webpack.config.js add the following:
  ```
  const path = require('path');
  const appSrc = path.join(__dirname, 'src');

  let config = {
    entry: './src/index.js',
    output: {
      path: './build',
      filename: 'js/bundle.js'
    },
    // How should webpack resolve paths in import statements
    resolve: {
      root: path.join(__dirname, 'node_modules'), // If not relative, fallback to node_modules
      // If not relative and matches components, images, fonts use these paths
      alias: {
        components: path.join(appSrc, 'components'),
        images: path.join(appSrc, 'assets', 'images'),
        fonts: path.join(appSrc, 'assets', 'fonts')
      }
    },
    module: {
      loaders: [
        // Transform javascript files using babel loader
        {
          test: /\.(js|jsx)$/,
          include: appSrc,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react'] // babel understands es6 and JSX syntax
          }
        }
    ]
  };

  module.exports = config;
  ```
5. Add a build script to package.json:
  ```
  "scripts": {
    "build": "webpack"
  }
  ```
6. Run the build script
  ```
  npm run build
  ```

### Setting up a dev server

1. Create an index.html file in the root of the project:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Webpack Tutorial - Basic</title>
    <script src="/js/bundle.js" charset="utf-8"></script>
  </head>
  <body>
    <div id="root">
      <!-- Yield to React -->
    </div>
  </body>
  </html>
  ```
2. Install webpack-dev-server
  ```
  npm install webpack-dev-server --save
  ```
3. Add a script to your package.json file
  ```
  "scripts": {
    "start": "webpack-dev-server --port=3000 --inline --hot"
  }
  ```
4. Run the script:
  ```
  npm start
  ```
5. Visit the site at http://localhost:3000/

### Loading Styles

1. Install the style and css loaders
  ```
  npm install style-loader css-loader
  ```
2. Modify webpack.config.js to use the style and css loader
  ```
  const path = require('path');
  const appSrc = path.join(__dirname, 'src');

  let config = {
    entry: './src/index.js',
    output: {
      path: './build',
      filename: 'js/bundle.js'
    },
    // How should webpack resolve paths in import statements
    resolve: {
      root: path.join(__dirname, 'node_modules'), // If not relative, fallback to node_modules
      // If not relative and matches components, images, fonts use these paths
      alias: {
        components: path.join(appSrc, 'components'),
        images: path.join(appSrc, 'assets', 'images'),
        fonts: path.join(appSrc, 'assets', 'fonts')
      }
    },
    module: {
      loaders: [
        // Transform javascript files using babel loader
        {
          test: /\.(js|jsx)$/,
          include: appSrc,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react'] // babel understands es6 and JSX syntax
          }
        },
        // Load css in javascript
        {
          test: /\.css$/,
          include: appSrc,
          loader: 'style!css' // or loaders: ['style', 'css']
        }
    ]
  };

  module.exports = config;
  ```
3. Uncomment the import statements for css files in src/components/App.js,
src/components/TodoForm.js and src/components/TodoItem.js. Don't uncomment the
lines importing images yet.

  App.js:
  ```
  import React, {Component} from 'react';
  import TodoList from './TodoList';
  import TodoForm from './TodoForm';
  import 'components/App.css';
  // import smiley from 'images/smiley.png';
  ```
  TodoForm.js:
  ```
  import React, {Component} from 'react';
  import 'components/TodoForm.css';
  ```
  TodoItem.js:
  ```
  import React, {Component} from 'react';
  import 'components/TodoForm.css';
  ```
4. Assuming you are still running the dev server, you should be able to see
the new styles at http://localhost:3000/

### Adding Assets

1. Install file-loader
  ```
  npm install file-loader
  ```
2. Modify webpack.config.js
    ```
    const path = require('path');
    const appSrc = path.join(__dirname, 'src');

    let config = {
      entry: './src/index.js',
      output: {
        path: './build',
        filename: 'js/bundle.js'
      },
      // How should webpack resolve paths in import statements
      resolve: {
        root: path.join(__dirname, 'node_modules'), // If not relative, fallback to node_modules
        // If not relative and matches components, images, fonts use these paths
        alias: {
          components: path.join(appSrc, 'components'),
          images: path.join(appSrc, 'assets', 'images'),
          fonts: path.join(appSrc, 'assets', 'fonts')
        }
      },
      module: {
        loaders: [
          // Transform javascript files using babel loader
          {
            test: /\.(js|jsx)$/,
            include: appSrc,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react'] // babel understands es6 and JSX syntax
            }
          },
          // Load css in javascript
          {
            test: /\.css$/,
            include: appSrc,
            loader: 'style!css'
          },
          // Output font files to build folder
          {
            test: /\.(otf|ttf|woff|woff2|eot|svg)/,
            include: appSrc,
            loader: 'file',
            query: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          },
          // Output images to the build folder
          {
            test: /\.(jpg|ico|png|gif)$/,
            include: appSrc,
            exclude: /favicon.ico$/,
            loader: 'file',
            query: {
              name: 'images/[name].[hash:8].[ext]'
            }
          },
          // Output favicon to the root of the build folder
          {
            test: /favicon.ico$/,
            include: appSrc,
            loader: 'file',
            query: {
              name: 'favicon.ico'
            }
          }
        ]
      }
    };

    module.exports = config;
    ```
3. Uncomment the import statements in src/index.js
  ```
  import React from 'react';
  import {render} from 'react-dom';
  import App from 'components/App';
  import './index.css';
  import 'images/favicon.ico'

  window.onload = function () {
    let root = document.getElementById('root');
    render(<App />, root);
  };
  ```
4. Uncomment the import statement and the image tag in src/components/App.js
  ```
  import React, {Component} from 'react';
  import TodoList from './TodoList';
  import TodoForm from './TodoForm';
  import 'components/App.css';
  import smiley from 'images/smiley.png';

  class App extends Component {
    constructor (props) {
      super(props);

      this.state = {
        todos: []
      };
      this._idSeq = 0;

      // Bind Methods
      this.addTodo = this.addTodo.bind(this);
      this.toggleComplete = this.toggleComplete.bind(this);
      this.removeTodo = this.removeTodo.bind(this);
    }

    addTodo (description) {
      let id = ++this._idSeq;
      this.setState({
        todos: [...this.state.todos, {id: id, description: description, isComplete: false}]
      });
    }

    toggleComplete (id) {
      let newTodos = this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            id: id,
            description: todo.description,
            isComplete: !todo.isComplete
          };
        } else {
          return todo;
        }
      });

      this.setState({todos: newTodos});
    }

    removeTodo (id) {
      let newTodos = this.state.todos.filter(todo => todo.id !== id);
      this.setState({todos: newTodos});
    }

    render () {
      return (
        <div className='app'>
          <div className='page-header'>
            <h1>
              <img src={smiley} alt='smiley' width="32px" height="32px" />
              Todo List Demo
            </h1>
          </div>
          <TodoForm addTodo={this.addTodo} />
          <TodoList
            todos={this.state.todos}
            toggleComplete={this.toggleComplete}
            removeTodo={this.removeTodo}
          />
        </div>
      );
    }
  }

  module.exports = App;
  ```
5. Make sure the dev server is running and you should be able to see the images
and fonts you added at http://localhost:3000/
