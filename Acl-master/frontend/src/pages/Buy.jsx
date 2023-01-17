// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom'
// // import { toast } from 'react-toastify'


// // export default function Buy() {
// //     const [cardNumber, setCardNumber] = useState('');
// //     const [expiryDate, setExpiryDate] = useState('');
// //     const [cvv, setCvv] = useState('');
// //     const[items,setItems]=useState('')


// //     const [formData, setFormData] = useState({
// //         Username: '',
// //         Email: '',
// //         Password: ''
// //       })
// //       const { Username, Email, Password } = formData


// //     const navigate = useNavigate()

// //     const handleSubmit = (event) => {
// //         event.preventDefault();
// //         //navigate('/AdminHome')  
// //        // navigate('/Guest')  

// //        
// //        if(username){
// //         toast.success("success")

// //        }else{
// //         toast.error("Go to home page and load this page again to buy")
// //        }

// //         const data = { username: username,courseTitle:title };
// //        // localStorage.setItem('data',data)
    
// //         fetch('http://localhost:8000/api/courses/buyCourse', {
// //             method: 'POST', // or 'PUT'
// //             headers: {
// //                 'Content-Type': 'application/json;charset=UTF-8'
// //             },
// //             body: JSON.stringify(data),
            
// //         }).then(response=>response.json())
// //         .then(json=>setItems(json))
// //         console.log(items[0])
// //         localStorage.removeItem('courseTitle')
// //         localStorage.removeItem('buyerUsername')
       
// //     }

// //     return (
// //         <form onSubmit={handleSubmit} className='form-group'>
// //             <div >
// //                 <label htmlFor="cardNumber">Card Number:</label>
// //                 <input 
// //                     type="text" 
// //                     id="cardNumber" 
// //                     name="cardNumber" 
// //                     value={cardNumber} 
// //                     onChange={event => setCardNumber(event.target.value)} 
// //                 />
// //             </div>

// //             <div >
// //                 <label htmlFor="expiryDate">Expiry Date:</label>
// //                 <input 
// //                     type="text" 
// //                     id="expiryDate" 
// //                     name="expiryDate" 
// //                     value={expiryDate} 
// //                     onChange={event => setExpiryDate(event.target.value)} 
// //                 />
// //             </div>

// //             <div >
// //                 <label htmlFor="cvv">CVV:</label>
// //                 <input 
// //                     type="text" 
// //                     id="cvv" 
// //                     name="cvv" 
// //                     value={cvv} 
// //                     onChange={event => setCvv(event.target.value)} 
// //                 />
// //             </div>

// //             <button type="submit" className='btn btn-block'>Checkout</button>
// //         </form>
// //     );
// // }

// import React, { useState } from 'react';
// import axios from 'axios';

// const Buy = ({ courseTitle }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sessionUrl, setSessionUrl] = useState(null);

//   const handleBuyCourse = async () => {
//     const title=localStorage.getItem('courseTitle')
//     const username=localStorage.getItem('buyerUsername')
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post('/api/courses/buyCourse', {
//         courseTitle:,
//         username: 'example_username', // replace with actual username
        
//       });
//       localStorage.removeItem('courseTitle')
//         localStorage.removeItem('buyerUsername')
//       if (data.result === 'error') {
//         setError(data.message);
//       } else {
//         setSessionUrl(data);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {sessionUrl && (
//         <a href={sessionUrl}>
//           <button>Buy Course</button>
//         </a>
//       )}
//       {!isLoading && !error && !sessionUrl && (
//         <button onClick={handleBuyCourse}>Buy Course</button>
//       )}
//     </>
//   );
// };

// export default Buy;

import React, { useState } from 'react';
import axios from 'axios';

const Buy = () => {
    const [url, setUrl] = useState('');

    const handleSubmit = async e => {
        
     const title=localStorage.getItem('courseTitle')
     const username1=localStorage.getItem('buyerUsername')
        e.preventDefault();
        try {
            const res = await axios.post('/api/courses/buyCourse', { courseTitle:title, username:username1 });
            setUrl(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            
            <button type="submit">Buy Course</button>
            {url && <a href={url}>Payment link</a>}
        </form>
    );
};
 export default Buy;
