const gameContainer = document.getElementById('game-container');
const robot = document.getElementById('robot');
const rocksContainer = document.getElementById('rocks');
const scoreboard = document.getElementById('scoreboard');

let robotX = 0;   // robot ki position x axis me
let robotSpeed = 5;   //robot ki speed kya rhegi
let score = 0; // jo hamara score hai
let gameInterval;  //kitni der me rocks generate hongee

function startGame() {
    score = 0;
    updateScoreboard();
    rocksContainer.replaceChildren(); // container se sare children remove kar dega ye..
    gameInterval = setInterval(createRock, 1500);
}
function createRock() {
    const rock = document.createElement('div');  
    rock.classList.add('rock');                 // rocks ko style isse ho jaigaa
    rock.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px'; // kahi pe bhi rocks generate ho jainge  apni space chodh ke
    rock.style.top = '-30px';                    
    rocksContainer.appendChild(rock);  



    const fallSpeed = Math.random() * 1 + 0.5; 
    const intervalId = setInterval(() => {
        rock.style.top = parseInt(rock.style.top) + fallSpeed + 'px';



       
        
                // Check hoga ki wo sabse neeche hai ki nhi
                if (rock.offsetTop >= gameContainer.clientHeight) {
                    clearInterval(intervalId); // band ho jainge girna
                    rocksContainer.removeChild(rock); // Remove from game
                    gameOver(); // gamne over check ho jaigaa
                }
            }, 20); // 20 mili ka gap
        }
        function updateScoreboard() {
            scoreboard.textContent = 'Score: ' + score; // score ka updation
        }

        
        function isColliding(element1, element2) {
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();
            return !(rect1.bottom < rect2.top || rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.left > rect2.right);
        }
        
        function gameOver() {
            clearInterval(gameInterval);  // stop kar dega us interval ko jo rocks generate kar raha hai
            alert('Game Over! Your score is: ' + score + '\nPress OK to restart.');
            startGame();   // it resets eveyrthing
        }
        
        function moveRobot(direction) {
            if (direction === 'left' && robotX > 0) {   // it is done so that jo hamara robot container ke bahar na chala jai
                robotX -= robotSpeed;
            } else if (direction === 'right' && robotX < gameContainer.clientWidth - robot.offsetWidth) {
                robotX += robotSpeed;
            }
            robot.style.left = robotX + 'px';
        }
        
        // Function to shoot bullets
        function shootBullet() {
            const bullet = document.createElement('div'); // jo div create hua yahi hmara bullet hai
            bullet.classList.add('bullet'); // jisse style kar ske
            bullet.style.left = (robotX + robot.offsetWidth / 2 - 2.5) + 'px';  //position of bullet
            bullet.style.bottom = '100px'; 
            gameContainer.appendChild(bullet); //jisse dikh skee
        
            const bulletInterval = setInterval(() => {
                bullet.style.bottom = parseInt(bullet.style.bottom) + 5 + 'px'; 
        
                if (parseInt(bullet.style.bottom) >= gameContainer.clientHeight) {
                    clearInterval(bulletInterval);
                    gameContainer.removeChild(bullet);
                }
        
                // rock ke sath collision check karega
                const rocks = document.querySelectorAll('.rock');
                rocks.forEach(rock => {
                    if (isColliding(bullet, rock)) {
                        clearInterval(bulletInterval);
                        gameContainer.removeChild(bullet);
                        rocksContainer.removeChild(rock);
                        score++;
                        updateScoreboard();
                    }
                });
            }, 20);
        }
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                moveRobot('left');
            } else if (event.key === 'ArrowRight') {
                moveRobot('right');
            } else if (event.key === ' ') { // Space bar to shoot
                shootBullet();
            }
        });
        
         //pehli bar game start hogaa
        startGame();
           

