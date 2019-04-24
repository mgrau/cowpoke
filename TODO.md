# TODO

# remove UI actions from game logic

# gameplay

- player buildings

  - implement special delivery
  - implement b set actions

- delivery actions (gaining objectives)
- include station masters

  - check for minimum number of workers (stationmaster)

- objective cards

# view

- player
  - show all of discard contents on hover
  - show hiring actions
- better railroad view
  - include stations
  - put point symbols between cities
  - fix train overlap at zero
  - tracks
- add tooltip hover to action components
  - highlight available actions?
  - give any component that can be clicked a hover indicator
  -
- cow market

  - make actions hoverable, and show which has been selected.

- kansas city

  - make an active halo around foresight tiles
  - make an active halo around certificates
  - display value of herd where certificates were
  - make active halo around tokens
  - make active halo around cities
  - fix display of tokens in cities

- end game view

# bugs

- visual overflow of tokens in cities
- undo of actions doesn't quite work
- pair discard visual overflow
- pair discard undo allows you to discard two pairs.
- pair discard doesn't let you choose which 2 cards.
- add button to upgrade train stations
- prevent players from being able to click on other player boards for actions
- players can undo a discard (prevent this)

- currently passing G to every component. This causes every component to redraw each move.
