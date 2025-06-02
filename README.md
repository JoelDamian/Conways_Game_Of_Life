# Conways_Game_Of_Life
Conway's Game of Life with React and Typescript

# Interface
![Game of Life Screenshot](https://github.com/JoelDamian/Conways_Game_Of_Life/blob/feature/Config-Doc/public/game-of-life.png?raw=true)

# Run Project local
- Open cmd
- Go to project route ..\Conways_Game_Of_Life
- run pnpm run dev
- Open http://localhost:5173/

# Run Tests
- Open cmd
- Go to project route ..\Conways_Game_Of_Life
- run pnpm vitest

# Run Project with docker
- Open cmd
- Go to project route ..\Conways_Game_Of_Life
- run docker build -t conway-life .
- run docker run -p 3000:80 conway-life
- Open http://localhost:3000