// BANKIST APP

// Data
const account1 = {
  owner: 'Vaibhav Thapliyal',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements">
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};
// displayMovements(account1.movements);

// const user= 'Steven Thomas Williams';
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLocaleLowerCase().split(' ').map((use) => use[0]).join('');
  });
}
createUsernames(accounts);

const calcDisplaySummary = function (summary) {
  const income = summary.movements
  .filter((mov) => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);
  // console.log(income);
  labelSumIn.textContent = `${income}€`;
  
  const outcome = Math.abs(summary.movements.
    filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0));
    labelSumOut.textContent = `${outcome}€`;
    
    const interest = summary.movements
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * summary.interestRate / 100)
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${Math.round(interest)}€`;
  }
  // calcDisplaySummary(account1.movements);
  
  const calcPrintBalance = function (bal) {
    // bal.forEach((val)=> val.currentBalance= val.movements.reduce(function(acc,curr,i,arr){ return acc+ curr},0))
    // labelBalance.textContent= accounts.account1.currentBalance;
    bal.balance = bal.movements.reduce(function (acc, curr) { return acc + curr }, 0);
    labelBalance.textContent = `${bal.balance}€`;
    
  };
  // calcPrintBalance(account1);
  
  const updateUI = function (acc) {
    displayMovements(acc.movements);
    calcDisplaySummary(acc);
    calcPrintBalance(acc);
  };
  
  let currentAccount;
  btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    
    currentAccount = accounts.find(mov => mov.userName === inputLoginUsername.value);
    // console.log(currentAccount);
    
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      labelWelcome.textContent = `Welcome Mr.${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;
      inputLoginPin.value = inputLoginUsername.value = '';
      inputLoginPin.blur();
      
      updateUI(currentAccount);
    }
    
  })
  
  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const recieverAcc = accounts.find((acc) => acc.userName === inputTransferTo.value);
    inputTransferAmount.value = inputTransferTo.value = '';
    
    if (amount > 0 &&
      recieverAcc &&
      currentAccount.balance >= amount &&
      currentAccount.userName !== recieverAcc.userName) {

        currentAccount.movements.push(-amount);
        recieverAcc.movements.push(amount);
        updateUI(currentAccount);
        
      }
    });
    
    btnClose.addEventListener('click', function (e) {
      e.preventDefault();
      if (inputCloseUsername.value === currentAccount.userName
        && Number(inputClosePin.value) === currentAccount.pin) {
          const index = accounts.findIndex(
            acc => currentAccount.userName === acc.userName
            );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    
    // console.log('hello');
    
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value) * 0.1;
  const access = currentAccount.movements.some(mov => mov >= loanAmount);
  if (access && loanAmount > 0) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }
  
  // console.log(loanAmount);
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// console.log(accounts);
// const userID= userName.map((use,i)=>
//  use[0]
// );
// console.log(userName);

// LECTURES

// const currencies = new Map([
  //   ['USD', 'United States dollar'],
  //   ['EUR', 'Euro'],
  //   ['GBP', 'Pound sterling'],
  // ]);
  
  // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  
  /////////////////////////////////////////////////
  /*
  // Slice
  let arr= ['a','b','c','d','e','f'];
  const arr1= ['g','h','i','j'];
  console.log(arr.slice(3));
  console.log(arr.slice(-1));
  console.log(arr.slice(3,4));
  
  Splice mutate
  console.log(arr.splice(3));
  console.log(arr);
  
  Reverse mutate
  console.log(arr.reverse());
  
  Concate
  console.log(arr.concat(arr1));
  
  Join
  console.log(arr.join(' # '));
  
  At method
  console.log(arr.at(4));
  console.log(arr.at(-1));
  
  
  // Looping the array forEach
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  
  for (const move of movements){
    if (move>0){
      console.log(`You deposited ${move}`);
    }else{
      console.log(`You withdraw ${Math.abs(move)}`);
    }
  }
  
  movements.forEach(function(move,index){
    if (move>0){
      console.log(`Movement ${index + 1} You deposited ${move}`);
    }else{
      console.log(`Movement ${index + 1} You withdraw ${Math.abs(move)}`);
    }
  })
  
  const currencies = new Map([
    ['INR','Indian Ruppee'],
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  currencies.forEach(function(value,key,map){
    console.log(`${key}: ${value}`);
  })
  */
 
 // Coding challenge 1 ans
 /*
 const checkDogs= function(dogsJulia, dogsKate){
   const dogsJuliaCopy= dogsJulia.slice(1, dogsJulia.length-2);
   const dogsTotalData= [...dogsJuliaCopy, ...dogsKate];
   dogsTotalData.forEach(function(age,i){
     const checkAdult= age>=3?`Dog number ${i+1} is an adult, and is ${age} years old`:
     `Dog number ${i+1} is still a puppy`;
     console.log(checkAdult);
    })
  }
  
  checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])
  checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])
  
  dt1.splice(0,1);
  dt1.splice(-2);
  // const dt1= [4, 1, 15, 8, 3];
  console.log(dt1);
  */
 
 // Data transformations with Map, Filter and Reduce
 
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
 // console.log(movements.map((mov)=> Math.round (mov*1.1)));
 
 /*
 const movementsDescriptions= movements.map((mov)=>{
   const type= mov>0? `You deposited ${mov}`:`You withdraw ${Math.abs(mov)}`;
   return type
  });
  
  console.log(movementsDescriptions);
  */
 
 // Filter method
 const deposit = movements.filter(function (mov) {
   return mov > 0;
  });
// console.log(deposit);

const withdrawal = movements.filter(function (withd) {
  return withd < 0;
});
// console.log(withdrawal);

// Reduce method

const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc += cur
}, 0);
// console.log(balance);

const maxBal = movements.reduce(function (acc, curr) {
  if (acc < curr) acc = curr
  return acc;
  // if (acc>curr) return acc else curr
}, 0)
// console.log(maxBal);

// Coding challenge 2
/*
const calcAverageHumanAge= function(dogsAges){
  const humanAge= dogsAges.map(function(val,indx){
    const Age= val<=2 ? 2*val: 16+ val*4; 
    return Age
  });
  const underAge= humanAge.filter(function(uage, i){
    return uage<=18;
  });
  const aboveAge= humanAge.filter(function(uage, i){
    return uage>=18;
  });
  const avAgeHuman= aboveAge.reduce(function(acc,curr){
    return acc+curr
  },0);
  console.log(humanAge);
  console.log(underAge);
  // console.log(aboveAge);  
  console.log(avAgeHuman/aboveAge.length);
  
  const avgAge= dogsAges
  .map((val)=> val<=2?2*val: 16+ val*4)
  .filter((age)=> age>=18)
  .reduce((acc,curr,i,arr)=>acc+ curr/arr.length,0);
  console.log(avgAge);
}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
*/

/*
const totalDeposit = movements
.filter((mov) => mov > 0)
.map((curr, i, arr) => {
  // console.log(arr);
  return curr * 1.1
})
.reduce((acc, current) => acc + current, 0);
// console.log(totalDeposit);

const fid1 = movements.find((mov) => mov = 1200);
// console.log(fid1);

const account = accounts.find(mov => mov.owner === 'Jonas Schmedtmann');
// console.log(account);
*/

// Some and Every method

// Equality
// console.log(movements);
// console.log(movements.includes(200));

// Condition
const anyDeposit = movements.some(mov => mov > 0);
// console.log(anyDeposit);

// Every if all the elements satisfies the condition
const anyDepost = movements.every(mov => mov > 0);
// console.log(anyDepost);

const arr = [[1, 2, 3], [3, 4, 5, 6], 6, 7, 8, 8];
const arr12 = [[[1, 2], 3], [3, [4, 5], 6], 6, [7, 8], 8];

// console.log(arr.flat());
// console.log(arr12.flat(2));
// console.log(arr12.flatMap());

const overalBalance = accounts
.map(mov => mov.movements)
.flat()
.reduce((acc, curr) => acc + curr, 0);

const overalBalance1 = accounts
.flatMap(mov => mov.movements)
.reduce((acc, curr) => acc + curr, 0);

// console.log(overalBalance);
// console.log(overalBalance1);

// Sort : It mutates the original array.

const owners = ['jonas', 'martha', 'zack', 'peter'];
// console.log(owners.sort());

const ownerVal = [2, 3, 5, 3, 2, 1, 10];
// console.log(ownerVal.sort());
// console.log(ownerVal.filter((mov,i)=> ownerVal.indexOf(mov)=== i));

movements.sort((a, b) => a - b);

// console.log(movements);
// Empty arrays with fill methods
const x = new Array(8);
// console.log(x);

x.fill(1, 4, 5) //This one
// console.log(x);

// console.log(x);

const y = Array.from({ length: 4 }, () => 1);
// console.log(y);

const z = Array.from({ length: 8 }, (_, i) => i + 1);
// console.log(z);

const randomDice = Array.from({ length: 100 }, () => Math.round(Math.random() * 5) + 1);
// console.log(randomDice);

// console.log(Array.from('Jonas'));

// 1.

const bankDepositSum = accounts
.flatMap(mov => mov.movements)
.filter(curr => curr > 0)
.reduce((acc, cur) => acc + cur, 0);

// console.log(bankDepositSum);

// 2. 
// const depositGreater= accounts.flatMap(mov=> mov.movements).filter(curr=> curr>=1000).length;
const depositGreater = accounts
.flatMap(mov => mov.movements)
// .reduce((count,cur)=> cur>=1000? count+=1:count,0);
.reduce((count, cur) => cur >= 1000 ? ++count : count, 0);
// console.log(depositGreater);

//3. 

const sums = accounts
.flatMap(mov => mov.movements)
.reduce((sums, cur) =>{
  // cur > 0 ? sums.deposits += cur : sums.withdrawal += cur
  sums[cur>0?'deposits':'withdrawal']+=cur;
  return sums
}, {
  deposits: 0,
  withdrawal: 0,
});

// console.log(sums);

//4. 
const convertTitleCase= function(title){
  const capitalize= str=> str[0].toUpperCase()+ str.slice(1);
  const exceptions= ['a','an','the','on','are','how','hey'];
  const titleCase= title
  .toLowerCase()
  .split(' ')
  .map(word=> exceptions.includes(word)?word:capitalize(word))
  .join(' ');
  return capitalize(titleCase);
  
};

// console.log(convertTitleCase('THIS IS a tItLE CAse'));
// console.log(convertTitleCase('HEy therE hoW are YOU'));


// Coding challenge 4.

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// 1.
dogs.map(cur=>cur.weight**0.75*28).reduce((recommendedFood,curr,i)=>{
  dogs[i].recommendedFood= curr;

  // dogs.forEach(curr=> curr.recommendedFood= curr.weight**0.75*28)
  // return dogs[i].recommendedFood;
  // acc= curr;
  // return acc;
},0);
console.log(dogs);

//2. 
console.log(dogs[dogs.findIndex(((curr)=> curr.owners.some(cur=> cur==='Sarah')))].curFood > dogs[dogs.findIndex(((curr,i)=> curr.owners.some(cur=> cur==='Sarah')))].recommendedFood? "Sarah's dog is eating too much":"Sarah's dog is eating too little");

// dogs.find(curr=> curr.owners.includes('Sarah'))
// 3.

const ownersEatTooMuch= dogs.filter(eat=>eat.curFood>eat.recommendedFood).flatMap(i=>i.owners);
const ownersEatTooLittle= dogs.filter(eat=> eat.curFood<eat.recommendedFood).flatMap(i=>i.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4. 
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much! and ${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//5. 
console.log(dogs.some(eat=> eat.curFood=== eat.recommendedFood));
// 6.
console.log(dogs.some(eat=> eat.curFood> eat.recommendedFood * 0.9 && eat.curFood< eat.recommendedFood * 1.1));

//7. 
const dogEatingOk= [dogs.filter(eat=> eat.curFood> eat.recommendedFood * 0.9 && eat.curFood< eat.recommendedFood * 1.1)];
console.log(dogEatingOk);
//8.
// const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
const dogCopy= dogs.slice().sort((a,b)=> a.recommendedFood-b.recommendedFood);
console.log(dogCopy);
