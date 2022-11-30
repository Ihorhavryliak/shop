'use strick'
import img from '../assets/logo.jpg'

export const dataProducts = [];
const count = 200 ;
for (let i = 1; i <= count; i++) {
  dataProducts.push( 
    {
    category: 'shoes ' + i,
    description: "shoes shoes img img img shoes shoes img shoes shoes img shoes shoes img shoes shoes img shoes shoes img",
    id: i,
    image: img,
    price: 55 * i,
    rating: {
        rate: 5 * i /  count,
        count: 6 * i,
    },
    title: "Laptop",
  },
    
  )
}

