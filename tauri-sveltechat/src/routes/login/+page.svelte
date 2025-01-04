<script lang="ts">
import { onMount } from 'svelte';
import ApiUtil from '../../lib/ApiUtil';
import LibCookie from '../../lib/LibCookie';
import LibConfig from '../../lib/LibConfig';

onMount(() => {
  console.log("#onMount");
  const btnLoginElen = document.getElementById("btn_login") as HTMLElement;
  if(btnLoginElen){
    btnLoginElen.addEventListener("click", (event) => {
      handleSubmit();
    });
  }
});

const handleSubmit = async function(){
  console.log("handleSubmit");
  const usernameElem = document.getElementById("username") as HTMLInputElement;
  const passwordElem = document.getElementById("password") as HTMLInputElement;
  const emailElem = document.getElementById("email") as HTMLInputElement;

  let username = usernameElem ? usernameElem.value : null;
  let password = passwordElem ? passwordElem.value : null;
  let email = emailElem ? emailElem.value : null;
  try {
    const postData = { email, password };
    const res = await ApiUtil.post('/login', postData);
    console.log(res);
    if(res.ret){
      console.log("res.ret=", res.ret);
      console.log(res.data);
      if(res.ret !== 200) {
        alert("Error, Login")
      }else{
        console.log("OK, Login");
        if(res.data.data){
          console.log(res.data.data);
          LibCookie.setCookie(LibConfig.COOKIE_KEY_AUTH, String(res.data.data.userId));
        }
        location.href = "/";
      }
    }
  } catch (error) {
    console.error(error);
    alert("Error");
  }
}
</script>
  
<!-- -->
<div class="App">
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4">Login</h2><p class="text-gray-500 mb-6">name , password input please</p>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">email :</label>
        <input type="text" id="email" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="" required="">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password :</label>
        <input type="password" id="password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="" required="">
      </div>
      <div class="flex items-center justify-between">
        <button id="btn_login"
        class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="button">GO</button>
      </div>

      <div class="flex items-center justify-between mt-4">
        <a href="/signup"> 
          <button class="btn-outline-blue w-full">Signup</button>
        </a>
      </div>
  </div>
  </div>
</div>

<style>
</style>
  