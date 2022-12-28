<div align="center">
  <img alt="logo" src="https://raw.githubusercontent.com/siamr902/algorithms-app/master/public/algo-logo.png" width="100"/>
</div>

<h1 align="center">
  Algorithms Collection
</h1>

<h2>About</h2>  

A mini-collection of animated algorithms to help visualize programming concepts like `backtracking`, recursive `dynamic programming`, `queues`, and more. The primary intention of this project was to practice adapting certain pieces of logic into their respective code variants. Examples include a sudoku backtracking visualization with solving functionality, a visualization of Leetcode's Minimum Path Sum, a visualization of the classic N-Queens problem, etc. I may consider adding more projects to the collection in the future, but for now I find them to be somewhat repetitive: figuring out how to animate the first algorithm made the others less fulfilling. Nonetheless, designing the UI was enjoyable, and the project strengthened my understanding of `Typescript`.

<h2>Obstacles</h2>  

I faced a multitude of issues throughout building the separate visualizers. One recurring issue across several of the apps was finding the breakpoints at which to animate certain steps of the algorithm. This would include setting the `sleep` function and duration, as well as applying any style changes. Another issue I faced, particularly those that involved a 2d grid of some sort (such as the sudoku app and the minimum cost path), was implementing a way to access each separate cell container. The *non-ideal* way would have been to assign `ids` to each cell and find a way to access them using `getElementById`, but this isn't vanilla js; we must do things the way react intends. The solution was incredulously rudimentary: create an array of `useRef` hooks to store each cell (input), and forward the ref to any components that may need access to modify certain properties.