<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
//import LibConfig from '$lib/LibConfig';
//import LibAuth from '$lib/LibAuth';
import Crud from '../Crud';
import { goto } from '$app/navigation';
//import { PUBLIC_API_URL } from '$env/static/public'
import HttpCommon from '$lib/HttpCommon';
import ApiUtil from '$lib/ApiUtil';
/** @type {import('./$types').PageData} */
export let data;
console.log(data);

/**
 * start proc
 * @param
 *
 * @return
 */ 
 const startProc = async function () {
	try {
	} catch (e) {
      console.error(e);
    }	
}
if(typeof(window) !== "undefined"){
	startProc();
}
/**
 * addPost
 * @param
 *
 * @return
 */ 
const addPost = async function () {
	try{
		const values = Crud.getInputValues();
    //console.log(values);
		const res = await ApiUtil.post('/project/create', values);
		console.log(res.data)
		goto(`/task_project`);
	} catch (e) {
		console.error(e);
		alert("error, add");
	}
}
</script>

<!-- MarkUp -->
<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
		<a href={`/task_project`} class="btn">Back
	  </a>
		<hr class="my-2" />
		<h1 class="text-3xl font-bold">Create</h1>
		<hr class="my-2" />
		<div class="col-md-6 form-group">
			<label for="name">Name</label>
			<input type="text" id="name" name="name" 
			class="input_text" required>
		</div>
		<hr class="mt-2 mb-2" />
		<button on:click={addPost} class="btn btn-primary my-2">Add</button>
		
	</div>
</div>

<!--
-->
