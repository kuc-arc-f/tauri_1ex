<script lang="ts">
export let object, parentShowFunction, parentEditFunction;
console.log(object);
//
const showModal = function (id: number) {
console.log("showModal= ", id)
    parentShowFunction(id);
}
//
const editModal = function (id: number) {
console.log("editModal= ", id)
    parentEditFunction(id);
}

</script>

<!-- MarkUp -->
{#each object as dayObject}
  {#if dayObject.db_none===1}
  <td class="border align-top px-2">{dayObject.day_disp}
       <br />
      <br />
      <br />
  </td>    
  {:else}
  <td class="border w-[14%] align-top px-2 pb-4">
    {dayObject.day_disp}<br />
    {#if dayObject.content}
    <a href="#" on:click={() => showModal(dayObject.id)}>
      {dayObject.content}
    </a>
    {:else}
      <div class="pb-8"></div>
    {/if}
    {#if dayObject.id}
    <div class="">
      <a href="#"  
        ><button
        on:click={() => editModal(dayObject.id)}
        class="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-0.5 px-2 border border-blue-500 hover:border-transparent rounded-sm"
        >Edit</button>
      </a>            
    </div>
    {/if}        
    <!--
    <br />
    <br />
    -->
  </td>
  {/if}
{/each}

<!-- CSS -->

<!--
-->
