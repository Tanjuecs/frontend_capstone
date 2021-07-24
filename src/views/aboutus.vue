<template>

    <div>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <!-- Container wrapper -->
  <div class="container">
    <!-- Navbar brand -->
    <a class="navbar-brand me-2" href="#">
      <img
        src=""
        
        alt=""
        loading="lazy"
        style="margin-top: -1px; width: 5%; height:auto;"
      />
    </a>

    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarButtonsExample"
      aria-controls="navbarButtonsExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarButtonsExample">
      <!-- Left links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        </li>
      </ul>
      <!-- Left links -->

      <div class="d-flex align-items-center">
        <el-button type="text" round size="medium" class="bhome" @click="onhome()">Home</el-button>
        <el-button type="text" round size="medium" class="blog" @click="onlogin()">Login</el-button>
        <el-button type="text" round size="medium" class="babout" @click="onaboutus()">About us</el-button>
      </div>
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>   
    <div class="about-section">
    <h1>About Us</h1>
    <p style="font-size:10px;">Burger Mania is the BEST BURGER SPECIALTY RESTAURANT in Laguna awarded by the GOLDEN GLOBE ANNUAL AWARDS FOR BUISNESS EXCELLENCE 2017</p>
    <p>Purpose: To become the best burger restaurant known for its scrumptious burger and its inimitable advocacy to raise mental health awareness to people.</p>
    </div>
    <br>
    <h2 style="text-align:center">Our Team</h2><br>
    <div class="row">
    <div class="column">
        <div class="card">
        <img src="logobm.jpg" alt="CEO" style="width:100%">
        <div class="container">
            <h2>Ma. Nela Aleli Valiente Garcia</h2>
            <p class="title">CEO & Founder</p>
            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            <p>burgermania@gmail.com</p>
            <p><button class="button">Contact</button></p>
        </div>
        </div>
    </div>

    <div class="column">
        <div class="card">
        <img src="logogo.gif" alt="Supervisor" style="width:100%">
        <div class="container">
            <h2>Dustine Joyce De Villa</h2>
            <p class="title">Supervisor</p>
            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            <p>burgermania@gmail.com</p>
            <p><button class="button">Contact</button></p>
        </div>
        </div>
    </div>
    
    <div class="column">
        <div class="card">
        <img src="logogo.gif" alt="JManager" style="width:100%">
        <div class="container">
            <h2>John Doe</h2>
            <p class="title">Manager</p>
            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            <p>burgermania@gmail.com</p>
            <p><button class="button">Contact</button></p>
        </div>
        </div>
    </div>
    </div>
        </div>
</template>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>
<style scoped>
.bhome{
	background-color:transparent;
	border-radius:15px;
	display:inline-block;
	cursor:pointer;
	color: #4e9bf9;
	font-family:Arial;
	font-size:15px;
  font-weight: bold;
	padding:10px 20px;
	text-decoration:none;
}
.bhome:hover {
  color:#C4DEFD;
	background-color: #34312D ;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);

}
.bhome:active {
	position:relative;
	top:1px;
}
.blog{
	background-color:transparent;
	border-radius:15px;
	display:inline-block;
	cursor:pointer;
	color: #4e9bf9;
	font-family:Arial;
	font-size:15px;
  font-weight: bold;
	padding:10px 20px;
	text-decoration:none;
}
.blog:hover {
  color:#C4DEFD;
	background-color: #34312D ;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);

}
.blog:active {
	position:relative;
	top:1px;
}
.babout{
	background-color:transparent;
	border-radius:15px;
	display:inline-block;
	cursor:pointer;
	color: #4e9bf9;
	font-family:Arial;
	font-size:15px;
  font-weight: bold;
	padding:10px 20px;
	text-decoration:none;
}
.babout:hover {
  color:#C4DEFD;
	background-color: #34312D ;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);

}
.babout:active {
	position:relative;
	top:1px;
}
</style>