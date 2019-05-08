# TODO

# remove UI actions from game logic
- selectToken no longer needed
- auxillary action should be cleaned up

# gameplay

- player buildings

  - action 6b
  - action 8b (adjacent tile action)
  - action 9b (upgrade any train station behind engine)

- objective cards
  - delivery actions (gaining objectives)
  - scoring
  

# view

- give risk actions an active indicator
- player
  - improve flow and organization
  - show all of discard contents on hover
  - show hiring actions (on hover?)
  - show available cowboys here (using grey out?)
  - change points display
    - show category totals on hover
  - make active halo around selected tokens
  - make active halo around certificates
- better railroad view
  - put point symbols between cities
  - tracks
  - move current player indicator to here
  - change current phase text to be more descriptive
  - display shipping cost

- add tooltip hover to action components
- give any component that can be clicked a hover indicator
- display city tokens in reverse order (most recent on top)
  - increase gap between tokens

- improve discard any card icon

- end game view

# bugs

- undo of actions doesn't quite work (boardgame.io bug?)
- pair discard doesn't let you choose which 2 cards.
- prevent players from being able to click on other player boards for actions
- pair discard undo allows you to discard two pairs.
- players can undo a discard (prevent this)
