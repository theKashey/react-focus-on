👁 React-Focus-On 
=======
[![NPM version](https://img.shields.io/npm/v/react-focus-on.svg)](https://www.npmjs.com/package/react-focus-on)

The final solution for WAI ARIA compatible Modal Dialogs or any full-screen tasks:
- locks __focus__ inside. Using [react-focus-lock](https://github.com/theKashey/react-focus-lock)
- disabled page __scroll__ and user interactions. Using [react-scroll-locky](https://github.com/theKashey/react-scroll-locky)
- hides rest of a page from screen-readers. Using [aria-hidden](https://github.com/theKashey/aria-hidden)

Now you could __focus on__ a single task.

Works on any browser and any platform. Roughly `5kb`, excluding babel-runtime and tslib, shared with other libraries.

> This is basically `inert` 

# API
### FocusOn
`FocusOn` - the focus on component
 - `enabled` - controls behaviour
 - `[autoFocus]` - enables of disabled auto focus management (see [react-focus-lock documentation](https://github.com/theKashey/react-focus-lock))
 - `[onActivation]` - on activation callback
 - `[onDeactivation]` - on deactivation callback
 - `[onClickOutside]` - on click outside of "focus" area. (actually on any event "outside")
 - `[onEscapeKey]` - on Esc key pressed (and not defaultPrevented)
 - `[gapMode]` - the way removed ScrollBar would be _compensated_ - margin(default), or padding. See [scroll-locky documentation](https://github.com/theKashey/react-scroll-locky#gap-modes) to find the one you need.
 - `[noIsolation]` - disables pointer event isolation
 - `[shards]` - a list of Refs to be considered as a part of locks.
 
## Additional API
### Exposed from React-Focus-Lock
 - `AutoFocusInside` - to mark autofocusable element
 - `MoveFocusInside` - to move focus inside or a component mount
 - `InFocusGuard` - to "guard" shard node.
 
See [react-focus-lock](https://github.com/theKashey/react-focus-lock) for details.
 
### Exposed from React-Remove-Scroll
 - `classNames.fullWidth` - "100%" width (will not change on scrollbar removal)
 - `classNames.zeroRight` - "0" right (will not change on scrollbar removal)
  
See [React-Remove-Scroll](https://github.com/theKashey/react-remove-scroll) for details.

> PS: Version 1 used React-scroll-locky which was replaced by remove-scroll.  
  
# Licence
 MIT
  
