import React,{useState, useEffect} from 'react';
import Snake from "./Snake";
import Food from "./Food";

const  getRandomCoordinates = () =>{
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
}
function App() {
  const [snakeDots, setSnakeDot] = useState([[0,0],[2,0]]);
  const [food, setFood] = useState(getRandomCoordinates());
  const [direction,setDirection] = useState('RIGHT');
  const [speed,setSpeed] = useState(200);


    useEffect(() => {
        const intervalId = setInterval(() => {
                              let dots = [...snakeDots];
                              let head = dots[dots.length-1];
                              switch (direction){
                                  case 'RIGHT':
                                      head=[head[0] + 2, head[1]];
                                      break;
                                  case 'LEFT':
                                      head=[head[0] - 2, head[1]];
                                      break;
                                  case 'DOWN':
                                      head=[head[0], head[1] + 2];
                                      break;
                                  case 'UP':
                                      head=[head[0], head[1] - 2];
                                      break;
                              }
                              dots.push(head);
                              dots.shift();
                              setSnakeDot(dots);
                          }, speed);

             return () => clearInterval(intervalId);
        });

    useEffect(() => {
        const onKeyDown = (ev) => {
            ev = ev || document.event;
            switch (ev.keyCode){
                case 38:  setDirection('UP');
                    break;
                case 40:  setDirection( 'DOWN');
                    break;
                case 37:  setDirection( 'LEFT');
                    break;
                case 39:  setDirection( 'RIGHT');
                    break;
            }
        }

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    });

     useEffect( () => {
            let head = snakeDots[snakeDots.length-1];
            if(head[0]>=100 || head[1]>=100 || head[0] < 0 || head[1] < 0){
                gameOver();
            }
      });

    useEffect( () => {
         let snake = [...snakeDots];
         let head = snake[snake.length-1];
         snake.pop();
         snake.forEach(dot => {
             if (head[0] == dot[0] && head [1] == dot[1]) {
                 gameOver();
             }
         });
     });

    useEffect( () => {
        let head = snakeDots[snakeDots.length-1];
        // let food = food;
        if(head[0] == food[0] && head[1] == food[1]){
            setFood(getRandomCoordinates());
            largestSnake();
            increaseSpeed();
        }
    });

    const largestSnake = () => {
        let newSnake = [...snakeDots];
        newSnake.unshift([])
        setSnakeDot(newSnake);
    }

    const increaseSpeed = () => {
        if(speed > 10){
            setSpeed(speed-10);
        }
    }

     const gameOver = () =>{
         alert(`Game Over! Snake length is ${snakeDots.length}`);
         setSnakeDot([[0,0],[2,0]]);
         setFood(getRandomCoordinates());
         setDirection('RIGHT');
         setSpeed(200);
     }


  return (
    <div className="gameArea">
        <Snake snakeDots={snakeDots}/>
        <Food dot={food}/>
    </div>
  );
}

export default App;
