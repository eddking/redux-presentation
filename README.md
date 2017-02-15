
Redux:
========

- managing state is basically everything a program does
- why redux? you should be critical if i pop up and suggest a new technology
- flux architecture
- more of a pattern than a framework. the library itself is maybe only 50 lines of code once you take out the invariants which stop you from doing silly things
- main ideas:
   - single source of truth
   - flow of data is uni-directional
   - immutability. the store is read only
   - composability. everything is just functions

- actions:
  - only requirement is that they have a type
  - represent something thats happened or what you're tring to do with the store
  - dispatched by views / as the result of external input

- reducer:
  - function takes state, and action, returns new state
  - infact this is exatly the same shape as Array.reduce
  - switch on the action type
  - combine reducers

- middleware
  - just a higher order-function that wraps the dispatch function

- selectors
  - pull out parts of the state tree. they are like 'getters'. they 
  - how are they possibly efficient

- testing
  - is easy because things are just functions

- Rethinks the boundaries of encapsulation. no longer group state with the functions that act upon it
- Classes used to get muddied with multiple behaviours simply because they own the required state

- So you may wonder why this is a good idea, it might appear that redux is a fairly convouted way of setting a variable
- we can understand why redux leaves us with better architectured code by looking at it through the lens
of some object orientated programming concepts.

to be clear, its not the redux itself that leaves us with better code. its the rigour of pulling these parts of our program appart
redux helps you enforce that separation and gives you the vocabulary to reason about it

- simplicity vs rxjs
rxjs endorses a push model of programming, whereby the values are pushed through streams and combined to produce an end value
functions are a pull system, and this mental model is baked into our programming languages
rxjs is not incompatible with redux, redux is mostly a pull model, pull is (in my opinion) conceptually much easier, because we already have a good intution about how
functions work. (show weird diagram with rxjs)

- This pattern has links to CQRS & event-sourcing, which is a back-end architecture which largely follows the same pattern


