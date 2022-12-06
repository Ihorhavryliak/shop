
const arr =[];
const number = 10;
for( let i = 1; i <number; i++ ) {

  arr.push({'productId': i, 'quantity': 1,})

}


export const cart = {
  cart: { products: [{}]} ,
  isAdded: null 
}