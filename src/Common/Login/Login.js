
import React from 'react'
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Header from "../../components/Header/Header";
import './login.css';
import profile from '../../image/profile.jpg'
import email from '../../image/email.jpg'
import password from '../../image/password.jpg'
import Button from '@mui/material/Button';

import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';


const Login = () => {

  const [values, setValues] = useState({
    name: '',
    password: ''
  })



  const navigate = useNavigate();
  //  const [acount, setAcount] = useState([]);

  // useEffect(() => {
  //   const fetchAllAcount = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8800/login");
  //       setAcount(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllAcount();
  // }, []);



  axios.defaults.withCredentials = true;
  const handleClick = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8800/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          // select to which the loger should goto
          if (res.data.role === "admin")
            navigate('/Admin')
          else if (res.data.role === "teacher")
            navigate('/Teacher')
          else if (res.data.role === "student")
            navigate('/Student_Home')
          else if (res.data.role === "RecordOfficer")
            navigate('/RecordOfficer')
          else if (res.data.role === "MERSU")
            navigate('/MERSU')
          else if (res.data.role === "director")
            navigate('/Director')

          else
            alert("You have not role");


        }
        else {
          alert(res.data.Massage);
        }
      })


      .catch(err => console.log(err));
  };


  return (
    <section>
      <>
        <div className='main-contener'>
          <div className='sub-main'>
            <div>
              <div className='images-view'>
                <div className='images-container'>
                  <img src={profile} alt='profile' className='profile' />
                </div>
              </div>
              <div>
                <h2>Login page</h2>
                <div className='first-input'>
                  <TextField
                    sx={{ m: 1, width: '30ch' }}
                    id="outlined-textarea"
                    label="User Name"
                    size ='medium'
                    placeholder="User Name"
                    className='name11'
                    name='name'
                    multiline
                    onChange={e => setValues({ ...values, name: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img src={email} alt='profile' className='profile' style={{ width: '35px', height: '35px' }} />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </div>
                
                <div className='second-input'>
                  <TextField
                    sx={{ m: 1, width: '30ch' }}
                    name='password'
                    variant="outlined"
                    margin="normal"
                    size ='medium'
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    onChange={e => setValues({ ...values, password: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img src={password} alt='profile' className='profile' style={{ width: '35px', height: '35px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>


                {/* <div className='second-input'>
                  <img src={password} alt='password' className='password' />
                  <TextField
                    sx={{ m: 1, width: '30ch' }}
                    name='password'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    onChange={e => {
                      const password = e.target.value;
                      if (password.length >= 8) {
                        setValues({ ...values, password: password });
                      }
                    }}
                  />
                </div> */}

                <div>
                  <Button onClick={handleClick} sx={{ m: 1, width: '30ch' }} variant="contained" size="large" color="primary" >
                    login
                  </Button>
                </div>
                <div>
                  <p>
                    {/*<a href='#' >Forgot Password</a> or <a href='/SignUp' >Sign up</a>*/}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </>
    </section>
  )
}

export default Login







// import { useState } from 'react';

// function PasswordField() {
//   const [values, setValues] = useState({
//     password: '',
//   });
//   const [validPassword, setValidPassword] = useState(true);

//   const handleChange = (e) => {
//     const password = e.target.value;
//     if (password.length >= 8) {
//       setValues({ ...values, password: password });
//       setValidPassword(true);
//     } else {
//       setValidPassword(false);
//     }
//   };

//   return (
//     <div className='second-input'>
//       <img src={password} alt='password' className='password' />
//       <TextField
//         sx={{ m: 1, width: '30ch' }}
//         name='password'
//         variant='outlined'
//         margin='normal'
//         required
//         fullWidth
//         label='Password'
//         type='password'
//         id='password'
//         error={!validPassword}
//         helperText={!validPassword && 'Password must be at least 8 characters'}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }