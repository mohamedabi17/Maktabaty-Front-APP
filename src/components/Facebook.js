// import React, { useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { facebookAuthenticate } from '../rtk/slices/actions/auth.js';
// // import { useSearchParams } from 'react-router-dom'
// import { URLSearchParams } from 'react-router-dom'

// const Facebook = ({ facebookAuthenticate }) => {
//     let location = useLocation();
//     // const [searchParams, setSearchParams] = useSearchParams();

//     useEffect(() => {
//         const values = new URLSearchParams(location.search)
//         const state = values.state ? values.state : null;
//         const code = values.code ? values.code : null;

//         console.log('State: ' + state);
//         console.log('Code: ' + code);

//         if (state && code) {
//             facebookAuthenticate(state, code);
//         }
//     }, [location]);

//     return (
//         <div className='container'>
//             <div class='jumbotron mt-5'>
//                 <h1 class='display-4'>Welcome to Auth System!</h1>
//                 <p class='lead'>This is an incredible authentication system with production level features!</p>
//                 <hr class='my-4' />
//                 <p>Click the Log In button</p>
//                 <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
//             </div>
//         </div>
//     );
// };

// export default connect(null, { facebookAuthenticate })(Facebook);