<script setup>

</script>

<template>
  <div class="full_screen">
    <!-- <button id="button" class="button_a" variant="primary"><p id="button_p1">hover</p></button> -->
     <div class="a"></div>
  </div>
</template>

<style scoped>
.a {
  width: 100px;
  height: 100px;
  background-color: white;
  border: 8px solid rgb(48, 253, 202);
 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  /* color: rgb(58, 113, 233); */
}
.a {
  animation: spin 2s linear 1;
  animation-iteration-count: infinite

}

@keyframes spin {
  0%{
    transform: rotate(0deg);
    
    
  }
   25%{
    transform: rotate(180deg);
    
    
  }
  50%{
    transform: rotateY(180deg);
    border-radius: 0%;
    

  }
  /*75%{
    transform: rotateX(180deg),rotateY(0deg);
    border-radius: 0%;
     
  } */
  /*100%{
    transform: rotateX(180deg);
    
    
  }*/
}                 

/* @keyframes spin {
  0%{

  }
  50%{
    transform: 0deg;
    scale:2

  }
  100%{
    transform: rotate(360deg);
    border-radius: 50%;
    scale: 2;
  }
}*/
.full_screen {
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
} 
/*.button_a {
  transition: transform 0.3s, background-color 0.3s, color 0.3s;

  background-color: rgb(233, 127, 127);
  border: 8px solid rgb(255, 16, 48);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  width: 200px;
  height: 100px;
  color: rgb(240, 19, 19);
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

}
.button_a:hover {
  transform: translateY(-10px);
  background-color: rgb(255, 16, 48);
  color: white;

} */

</style>
