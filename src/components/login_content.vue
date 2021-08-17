<script>
export default {
    
}
</script>

<template>
    <div>
        <!-- Here you can design -->
        <div class="main">
    <p class="sign" align="center">Welcome Back!</p>
    <p class="log" align="center"> Log in to Continue</p>
    
    <form class="form1">
      <input class="un " type="text" align="center" placeholder="Email Address">
      <input class="pass" type="password" align="center" placeholder="Password">
      <a class="submit" align="center">Log in</a>
      <p class="forgot" align="center"><a href="#">Forgot Password?</a></p>
    </form>
                
    </div>
    </div>
</template>

<style scoped>
    .main {
       
        width: 400px;
        height: 400px;
        margin: 7em auto;
        border-radius: 1.5em;
       
    }
    
    .sign {
        padding-top: 40px;
        margin-bottom: 5px;
        color: #262626;
        font-family: 'Ubuntu', sans-serif;
        font-weight: bold;
        font-size: 30px;
        
    }
    
    .log{
        margin-top: 10px;
        color: #49475B;
        font-family: 'Ubuntu', sans-serif;
        font-weight: bold;
        font-size: 15px;
    }
    
    
    

    .un {
    width: 76%;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.18);
    margin-bottom: 50px;
    margin-left: 46px;
    text-align: left;
    margin-bottom: 27px;
    font-family: 'Ubuntu', sans-serif;
    }
    
    form.form1 {
        padding-top: 40px;
    }
    
    .pass {
            width: 76%;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.18);
    margin-bottom: 50px;
    margin-left: 46px;
    text-align: left;
    margin-bottom: 27px;
    font-family: 'Ubuntu', sans-serif;
    }
    
   .un:hover, .pass:hover{
  box-shadow: 0 3px 15px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
    .un:focus, .pass:focus {
        border: 2px solid rgba(236,159,0) !important;
        
    }
    
    .submit {
        cursor: pointer;
        border-radius: 5em;
        color: #fff;
        background: linear-gradient(to right, #ec9f00, #ac241f);
        border: 0;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 10px;
        padding-top: 10px;
        font-family: 'Ubuntu', sans-serif;
        margin-left: 35%;
        font-size: 15px;
        box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
    }

    .submit:hover{
      background: linear-gradient(to right, #ffb41f, #cf2c26);
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
     
    }

    .forgot {
        text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
        color: #232020;
        padding-top: 15px;
    }
    
    a {
        text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
        color: #E1BEE7;
        text-decoration: none
    }
</style>