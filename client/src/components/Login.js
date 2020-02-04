import React from 'react';
import TextField from "@material-ui/core/TextField";


function Login(){
    return (
        <div>
            <form className='login'>
                <TextField id='username' label='Username'/>
                <TextField id='password' label='Password'/>                
            </form>
        </div>
    )
}

export default Login;