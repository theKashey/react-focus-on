👁 React-Focus-On 
=======
[![NPM version](https://img.shields.io/npm/v/react-focus-on.svg)](https://www.npmjs.com/package/react-focus-on)

The final solution for WAI ARIA compatible modal dialogs or full-screen tasks.
- locks __focus__ inside. Using [react-focus-lock](https://github.com/theKashey/react-focus-lock)
- disabled page __scroll__ and user interactions. Using [react-scroll-locky](https://github.com/theKashey/react-scroll-locky)
- hides rest of a page from screen-readers. Using [aria-hidden](https://github.com/theKashey/aria-hidden)

Now you could __focus on__ a single task.

> This is basically `inert` 

# API
### FocusOn
`FocusOn` - the focus on component
 - `enabled`(true) - controls behaviour
 - `[autoFocus]` - enables of disabled auto focus management (see [react-focus-lock documentation])
 - `[onActivation]` - on activation callback
 - `[onDeactivation]` - on deactivation callback
 - `[onClickOutside]` - on click outside of "focus" area. (actually on any event "outside")
 - `[onEscapeKey]` - on Esc key pressed (and not defaultPrevented)
 - `[gapMode]` - the way removed ScrollBar would be _compensated_ - margin(default), or padding. See [scroll-locky documentation](https://github.com/theKashey/react-scroll-locky#gap-modes) to find the one you need.
 
## Additional API
### Exposed from React-Focus-Lock
 - `AutoFocusInside` - to mark autofocusable element
 - `MoveFocusInside` - to move focus inside or a component mount
 
### Exposed from React-Scroll-Locky
 - `FocusPane` - to create a container with proper dimensions (it's more about right coordinate) set.  
     
  
# Licence
 MIT
  
