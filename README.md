# Ludo Online

[Ludo](https://pt.wikipedia.org/wiki/Ludo) is a popular game originated from the indian game [Pachisi](https://pt.wikipedia.org/wiki/Pachisi).

I made this project to expand my portfolio and to practice `React` in combination with a `real time connection` to the backend and `css animations`.

This repo is linked to `Vercel`, available for playing, and I will keep updating and solving bugs whenever I have the time to.

[**_Click here to access Ludo Online Game_**](https://ludo-online-react.vercel.app/)

## Preview

#### Create a game and start playing

[Sussu's Ludo.webm](https://user-images.githubusercontent.com/62756962/225396716-7c4f2547-11e5-4cd1-be28-5639361e4bba.webm)

#### Smashing an opponent's pawn

[Sussu's Ludo - Smash Pawn.webm](https://user-images.githubusercontent.com/62756962/225397240-de9efe5c-fdf4-421a-b2e7-bfcaf1b82dd4.webm)

#### Pawns cannot be smashed in the safe area

[Sussu's Ludo - Safe Area.webm](https://user-images.githubusercontent.com/62756962/225397307-c13474a5-8486-4987-8dc9-6b2e340b04da.webm)

#### When there are no actions available, the turn just passes to the next player

[Sussu's Ludo - No Actions.webm](https://user-images.githubusercontent.com/62756962/225397526-25fd2434-2589-43c9-b308-1b944003e059.webm)

#### Once the hidden door of your color is reached, you can enter the ending road

[Sussu's Ludo - Final Area.webm](https://user-images.githubusercontent.com/62756962/225397883-c437515c-029e-4fe0-b869-224b47ea26fe.webm)

#### To enter the final square (or triangle) you will need an exact result

[Sussu's Ludo - Podium Area.webm](https://user-images.githubusercontent.com/62756962/225398247-0e1bbba6-14be-4d49-9529-bc1b77300c09.webm)

#### The game end

[Sussu's Ludo - Finish Screen.webm](https://user-images.githubusercontent.com/62756962/225398819-6afbe65a-fdd7-410d-ab93-04a4e5617141.webm)

## Goal

**The player who places all their pawns on the final square (triangle) wins the game.**

## Rules
- It is a turn based game
- The first player to roll the dice is the first player to enter the room, the second player to enter will play next and so on
- You can move the pawns in the common road (white squares) with any roll result
- To move a pawn from the initial zone you need to roll 1 or 6
- If you roll 6, you gain an extra turn. Up to three times
- If your pawn stops in the same square as the enemy pawn, it will be smashed and get back to the initial zone
- The squares with a Great Shield or a Stone Door are safe, no pawn can be smashed there
- If two pawns of the same color get together in the same square, they join forces and grow, the enemies can be in the same square but can not smash them
- If for some reason, like the rule above, two pawns of different colors stay in the same square and a third one of another color gets in, there ain't no smashing too
- Basically you can only smash a pawn if it is alone in a common white square
- Once a pawn reaches the hidden door of it's color, it can enter the Final Road (the middle squares)
- To get to the final square (triangle) you need an exact result, if a pawn is in the last square before the triangle, you need to roll 1. If there are 4 squares of distance, you can enter the final triangle with a 4, but you can move closer with a 3, 2 or 1
- Once the winner is decided, the game continues to decide the second and third place
- The winner gets to see fireworks in the ending screen 🎇

## Worth to Mention

When I was digging into Ludo's rules I found many disagreements between players, writen rules and another online games. So in the end, I just used the rules I found the most fun.

***Developer Note:***
```
The rule that allows you to put 12 pawns in the same square was really a challenge accepted for me (I am not that good in CSS).
The solution I came up was to increase the pawn size when two or more of the same color get together, therefore, instead of 12 minor pawns I could just delegate this logic to the backend and put a maximum of 4 greater pawns in the same square. Their sizes can increase and decrease based on how many pawns are grouped together.
```

## Technology Stack

* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Socket.IO](https://socket.io/docs/v4/client-initialization/)
* [Stitches](https://stitches.dev/)
* [React Toastify](https://github.com/fkhadra/react-toastify)
* [React Input Mask](https://github.com/sanniassin/react-input-mask)
* [React Dice Roll](https://github.com/avaneeshtripathi/react-dice-roll)
* [React Icons](https://react-icons.github.io/react-icons/icons?name=gi) / [Game Icons](https://game-icons.net/)
* [Vercel](https://vercel.com/)


## Known Issues

- On **smartphones** and **tablets** pawns can be a bit out of place
- On **smartphones** and **tablets** the animations are not as clean
- On **smartphones** and **tablets** the `z-index` is not being fully respected by the browser, causing the head of the pawns to disappear from time to time and the body to appear in front of anything

