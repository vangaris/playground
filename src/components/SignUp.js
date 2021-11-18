import React, {useState} from 'react'
import {Grid, Paper, Button, Typography, Link} from '@mui/material'
import {TextField} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import axios from 'axios'


const SignUp = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [, setState] = useState()

  const [errors, setErrors] = useState({short: '', mismatch: ''})
  const baseURL = 'http://localhost:3000/users'

  const paperStyle = {
    padding: 20,
    height: '100vh',
    width: 400,
    margin: '20px auto',
  }

  const avatarStyle = {
    fontSize: 70,
  }

  const btnstyle = {margin: '8px 0'}

  const handleonChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setData({
      ...data,
      [e.target.name]: value,
    })
  }

  const validateFields = () => {
    let error = false
    if (data.password && data.password.length < 5) {
      error = true
      console.log('password was too short')

      //notice updater function here
      setErrors(state => ({
        ...state,
        short: 'Password must contain at least 5 characters',
      }))
      console.log('short set')
    } else if (data.confirmPassword && data.confirmPassword !== data.password) {
      error = true
      setErrors(state => ({...state, mismatch: "Passwords don't match"}))
    } else {
      setErrors(state => ({short: '', mismatch: ''}))
      console.log(data)
        axios
          .post(baseURL, data)
          .then(response => setState({dataId: response.data.id}))
          .catch(er => {
           setState({errorMessage: er.message})
           console.log('There was an error!', er)
         })
    }
    return error
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log(data)
    if (validateFields()) {
      return
    }
  }

  return (
    <div>
      <Grid id="registration-form" lign="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center ">
            <AccountBoxIcon style={avatarStyle} />
            <h2>Sign up</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter Firstname"
                  fullWidth
                  required
                  value={data.firstName}
                  onChange={handleonChange}
                />
              </Grid>
              <Grid>
                <TextField
                  style={{marginTop: '3vh'}}
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Lastname"
                  fullWidth
                  required
                  value={data.lastName}
                  onChange={handleonChange}
                />
              </Grid>
              <Grid>
                <TextField
                  style={{marginTop: '3vh'}}
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter Email Address"
                  fullWidth
                  required
                  value={data.email}
                  onChange={handleonChange}
                />
              </Grid>
              <Grid>
                <TextField
                  style={{marginTop: '3vh'}}
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter Password"
                  fullWidth
                  required
                  value={data.password}
                  onChange={handleonChange}
                  type="password"
                />
              </Grid>
              <Grid>
                <TextField
                  style={{marginTop: '3vh'}}
                  id="confirm-password"
                  name="confirmPassword"
                  label="Confirm Password"
                  onChange={handleonChange}
                  value={data.confirmPassword}
                  error={Boolean(errors?.mismatch)}
                  helperText={errors?.mismatch}
                  required
                  fullWidth
                  type="password"
                />
              </Grid>
              <Grid>
                <Typography style={{marginTop: '2vh'}}>
                  {' '}
                  Already have an account ?<Link href="#">Sign in</Link>
                </Typography>
              </Grid>
              <Grid>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default SignUp
