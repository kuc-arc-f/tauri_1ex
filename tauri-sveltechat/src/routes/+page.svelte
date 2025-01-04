<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
import CrudIndex from "../client/chats/CrudIndex";
import Chat from "../client/chats/Chat";
//import LibLayout from "../client/lib/LibLayout";
//import Head from "../components/Head.svelte";

/** @type {import('./$types').PageData} */
export let data: any, items = [];
console.log(data);

onMount(() => {
  console.log("#onMount");
  items = data.items;
});

/**
 *
 * @param
 *
 * @return
 */ 
 console.log("#chats");
const startProc= async function() {
	//const res = await CrudIndex.getList();
  //console.log("#startProc");
  //console.log(res.data);
	//items = res.data;
}
//startProc();
/**
 * clickClear
 * @param
 *
 * @return
 */
const clickClear = async function() {
    try{
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        // @ts-ignore
        if(searchKey) {
            searchKey.value = "";
        }
		items = await CrudIndex.getList();
    } catch (e) {
        console.error(e);
        throw new Error('Error , clickClear');
    }    
}
/**
*
* @param
*
* @return
*/
async function clickSearch(){
    try {
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        const skey = searchKey?.value;
console.log("search:", skey);
        //@ts-ignore
        items = await Chat.search(skey);
console.log(items);
    } catch (error) {
        console.error(error);
    }    
}
</script>
<!-- class="container bg-white" -->
<div class="bg-gray-100">
  <div class="container mx-auto p-4  pb-24"> 
    <!-- Title -->
    <div class="bg-white rounded-md shadow-md p-4">
      <div class="col-sm-6">
        <h1 class="text-3xl font-bold">Chat</h1>
      </div>
      <div class="col-sm-6 text-end pt-1">
          <a href={`/chatcreate`} class="btn btn-primary">Create
          </a>		
      </div>
      <div class="col-md-12 pt-1">
        <button class="btn btn-sm btn-outline-primary"  on:click={() => clickClear()}
          >Clear</button>
          <span class="search_key_wrap">
              <input type="text" size="36" class="mx-2 my-2 input_text" name="searchKey"
               id="searchKey" placeholder="Search Key">
          </span>
          <button class="btn btn-sm btn-outline-primary" on:click={() => clickSearch()}>Search</button>
      </div>

    </div>
<!--
    -->
    <hr class="my-1" />
    {#each items as item}
    <div class="bg-white rounded-md shadow-md p-4 mt-4">
      <div class="pb-2">
        <!--
        <a href={`/chats/${item.id}`} >
          <h3 class="text-2xl">{item.name}</h3>
        </a>		
        <button on:click={() => { location.href=`/chats/${item.id}`; }}>
          <h3 class="text-2xl">{item.name}</h3>
        </button>		
        -->
        <h3 class="text-2xl">{item.name}</h3>
      </div>
      <p>ID : {item.id}
        <!--
        <button 
        on:click={() => { location.href=`/chats/${item.id}`; }}
        class="btn btn-sm btn-outline-primary ms-2"
        >Show
        </button>		
        -->
        <a href={`/chats?id=${item.id}`} 
        class="btn btn-sm btn-outline-primary ms-2"
        >Show
        </a>		
      </p>		
    </div>
    {/each}	
  </div>
</div>
<!-- 
-->