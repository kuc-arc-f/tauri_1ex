<svelte:head>
	<title>Crud</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { EditId, itemId } from './stores';
import CrudIndex from "./CrudIndex";
import Plan from "./Plan";
import moment from 'moment'
//import LibAuth from '$lib/LibAuth';
//import HttpCommon from '$lib/HttpCommon';
import IndexRow from './IndexRow.svelte';
import ModalShow from "./ModalShow.svelte";
import ModalEdit from "./ModalEdit.svelte";
import Export from './Export';

/** @type {import('./$types').PageData} */
export let data: any;
let items = [], itemsTodos = [];
let weeks = null, month = null, month_str = "";

console.log(data);
/**
*
* @param
*
* @return
*/
const get_items = async function(target_month) {
    try{
        console.log("#get_items");
        weeks = Plan.get_week_items(target_month);
        month_str = target_month.format('YYYY-MM');
        itemsTodos = await CrudIndex.getList(target_month);
console.log(itemsTodos.data);
        itemsTodos = await Plan.convertDateType(itemsTodos.data);

        const weeksData = Plan.convert_week_array( weeks, itemsTodos ,moment() ) 
        weeks = weeksData;
//console.log(weeks);
    } catch (e) {
        console.error(e);
    }   
} 
/**
 * start proc
 * @param
 *
 * @return
 */ 
 const startProc = async function () {
	try {
        itemId.update(n => 0);
        console.log("#startProc");
        month = moment();
        await get_items(month)				
	} catch (e) {
      console.error(e);
    }	
}
console.log("#start: /test");
//startProc();

onMount(async () => {
  try {
    startProc();
  } catch (e) {
    console.log(e);
  }
});
//
const changeBefore = async function () {
    try{
        console.log("#startProc");
        const sub = month.add(-1, 'month').startOf('month')
//console.log( sub )        
        await get_items(sub)
    } catch (e) {
        console.error(e);
    } 
}
//
const changeAfter = async function () {
    try{
        console.log("#changeAfter");
        const sub = month.add(1, 'month').startOf('month')
//console.log( sub )        
        await get_items(sub)
    } catch (e) {
        console.error(e);
    } 
}
//
const exportExcel = async function () {
    try{
        month_str = month.format('YYYY-MM');
console.log("month_str=", month_str);
console.log(itemsTodos);
        await Export.exportXlsx(itemsTodos);
    } catch (e) {
        console.error(e);
    }    
}
//
const parentEditFunction = function (id: number) {
console.log("parentEditFunction=", id);
    EditId.update(n => 0);
    EditId.update(n => id);
}
//
const parentShowFunction = function (id: number) {
console.log("parentShowFunction=", id);
  itemId.update(n => 0);
  itemId.update(n => id);
}
</script>

<!-- MarkUp -->
<a href="/"> [home] </a>
<div class="container mx-auto px-4 py-8">
  <div class = "row mt-2">
      <div class="col-md-6">
        <h1 class="text-3xl font-bold">Plan: {month_str}</h1>
      </div>
      <div class="col-md-6 text-end">
          <button on:click={changeBefore} class="btn btn-outline-primary">
          <i class="fas fa-arrow-circle-left"></i> Before
          </button>
          <button on:click={changeAfter} class="btn btn-outline-primary ml-2">
              Next <i class="fas fa-arrow-circle-right"></i>
          </button>            
      </div>
  </div>
	<hr class="my-1" />
  <div class="row mt-2">
    <div class="col-md-6">
        <a href={`/plan/create`} class="btn btn-primary">Create
        </a>
    </div>
    <div class="col-md-6 text-end">
        <button class="btn btn-outline-primary" on:click={exportExcel}>Export</button>
    </div>
  </div>
  <!-- -->
  <div class="table_box_wrap mb-4">
      <table class="mt-2 w-full table-auto border">
        <thead class="border">
          <tr>
            <th class="th_sun text-danger text-red-400">Sun</th>
            <th class="text-center">Mon</th>
            <th class="text-center">Tue</th>
            <th class="text-center">Wed</th>
            <th class="text-center">Thu</th>
            <th class="text-center">Fri</th>
            <th class="th_sat text-blue-400 text-center">Sat</th>
          </tr>      
        </thead>
        <tbody>
          {#each weeks as object, i}
          <tr>
            <IndexRow object={object.weekItem} 
            parentShowFunction={parentShowFunction}
            parentEditFunction={parentEditFunction} />
          </tr>
          {/each}            
        </tbody>
      </table>    
  </div>
  <!-- modal -->
  <ModalEdit />
</div>

<!-- 
  <ModalShow />
-->