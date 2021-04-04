<template>
<h1 class="firsttitle">Om FUZE</h1>
<p class="infotext">Version 2.2.0 <br>Denna sidan använder Sveriges Radios öpnna API</p>
<div class="linered"></div>
<div></div>

    <div id="container">
        
        <div class="programming"> <h2 class="title">Programmering</h2>
        <div class="lineyellow"></div>
            <h3><img src="..\assets\icon-avatar-default.png" alt=""> Mehrdad Badeie</h3> 
            <h3><img src="..\assets\icon-avatar-default.png" alt=""> Tommi Ahonen</h3> 
            <h3><img src="..\assets\icon-avatar-default.png" alt=""> Thomas Haraldsson</h3> 
        </div>

        <div class="design"><h2 class="title">Design</h2>
        <div class="lineblue"></div>
            <h3><img src="..\assets\icon-avatar-default.png" alt=""> Elinur Hakbilen</h3> 
            <h3><img src="..\assets\icon-avatar-default.png" alt=""> Filip Alexandrow</h3> 
            <h3><img src="..\assets\icon-avatar-default.png" alt=""> Jonas Johansson</h3> 
            <h3><img src="..\assets\icon-avatar-default.png" alt=""> Rita Anthony</h3> 
        </div>
    </div>

</template>

<script>

</script>


<style scoped>

.infotext {
    margin-left: 5em;
}


#container {
    margin-left: 5em;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: stretch;
    grid-gap: 15%;
    flex-grow: 5;
}


h3 {
    font-weight: 500;
    text-align: left;
    color: white;
}

.programming {
    border-radius: 40px;
    text-align: left;
    color: white;
}

.design {
    border-radius: 40px;
    text-align: left;
    color: white;
}

.title {
    text-align: left;
    font-weight: bold;
    color: white;
}

.firsttitle {
    margin-left: 1.6em;
    text-align: left;
    font-weight: bolder;
    color: white;
}

img {
    width: 50px;
    height: 50px;
}

p {
    margin-top: 20px;
    text-align: left;
    color: white;
}

.linered, .lineyellow, .lineblue {
    display:block;
    border:none;
    color:white;
    height:5px;
    background:black;
}

.linered {
    margin-left: 5em;
    background: -webkit-gradient(radial, 0% 50%, 0, 0% 50%, 350, from(rgb(250, 60, 76)), to(#25283C));
}

.lineyellow {
    background: -webkit-gradient(radial, 0% 50%, 0, 0% 50%, 200, from(rgb(255, 195, 0)), to(#25283C));
}

.lineblue {
    background: -webkit-gradient(radial, 0% 50%, 0, 0% 50%, 200, from(rgb(68, 190, 199)), to(#25283C));
}


</style>
