React Body ClassName
====================

Provides a declarative way to specify `document.body.className` in a single-page app.  
This component can be used on server side as well.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect).

====================

## Installation

```
npm install --save react-body-classname
```

Dependencies: React >= 0.13.0

## Features

* Does not emit DOM, not even a `<noscript>`;
* Like a normal React compoment, can use its parent's `props` and `state`;
* Can be defined in many places throughout the application;
* Supports arbitrary levels of nesting, combining each className;
* Works just as well with isomorphic apps.

## Example

```jsx
class SomeComponent {
  render() {
    // This will add 'home' to the body
    return (
      <BodyClassName className='home'>
        <h1>Home, sweet home.</h1>
      </BodyClassName>
    );
  }
}

class App {
  render() {
    // This will add 'app' to the body
    return (
      <BodyClassName className='app'>
        <SomeComponent/>
      </BodyClassName>
    );
    // Becuase we nested the component, our body will now have 'app home'
    // as the class name
  }
}
```

Use CSS modules with webpack or similar?

```jsx
import styles from './some.css';

class Thing {
  render() {
    return (
      <BodyClassName className={styles.body}>
        <h1>CSS modules rock!</h1>
      </BodyClassName>
    );
  }
}
```

## Server Usage

If you use it on server, call `BodyClassName.rewind()` **after rendering components to string** to retrieve the combined class name. You can then embed this className into HTML page template.

Because this component keeps track of mounted instances, **you have to make sure to call `rewind` on server**, or you'll get a memory leak.
