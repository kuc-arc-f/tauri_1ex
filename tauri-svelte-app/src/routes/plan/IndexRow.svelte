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
  <td class="border align-top">{dayObject.day_disp}
       <br />
      <br />
      <br />
  </td>    
  {:else}
  <td class="border w-[14%] align-top pb-4">
    {dayObject.day_disp}<br />
    {#if dayObject.content}
    <a href="#" on:click={() => showModal(dayObject.id)}>{dayObject.content}
    </a>
    {:else}
      <div class="pb-8"></div>
    {/if}
    {#if dayObject.id}
    <div class="">
      <a href="#" on:click={() => editModal(dayObject.id)} class="btn btn-outline-primary btn-sm td_edit"
        >Edit
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
