<template><br>
<h1 class="firsttitle">Om FUZE</h1> 
<p class="infotext">Version 2.2.0 <br>Denna sidan använder Sveriges Radios öppna API</p>
<div class="linered"></div> <br>
<div></div>

    <div id="container">
        <div class="programming"> <h2 class="title">Programmering</h2>
        <div class="lineyellow"></div> <br>
            <h3><img src="..\assets\Fuze-Merra-round.png" alt=""> Mehrdad Badeie</h3> 
            <h3><img src="..\assets\Fuze_Tommi_Round.png" alt=""> Tommi Ahonen</h3> 
            <h3><img src="..\assets\Fuze-Thomas-round.png" alt=""> Thomas Haraldsson</h3> 
        </div>
        <div class="design"><h2 class="title">Design</h2>
        <div class="lineblue"></div> <br>
            <h3><img src="..\assets\Fuze_Elli_Round.png" alt=""> Elinur Hakbilen</h3> 
            <h3><img src="..\assets\Fuze_Filip_Round.png" alt=""> Filip Alexandrow</h3> 
            <h3><img src="..\assets\Fuze_Jonas_Round.png" alt=""> Jonas Johansson</h3> 
            <h3><img src="..\assets\Fuze_Rita_Round.png" alt=""> Rita Anthony</h3> 
        </div>
    </div>
</template>

<style scoped>

.infotext {
    margin-left: 5em;
}

/* This contains flexbox with 2 boxes (Programmering & Design and all of elements associated with it) */
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

    text-align: left;
    color: white;
}

.design {
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

/* Red, yellow and blue gradient lines */
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
