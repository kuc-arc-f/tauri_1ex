<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import Crud from '../Crud';
import HttpCommon from '$lib/HttpCommon';
import LibCommon from '$lib/LibCommon';
import ModalComplete from '$lib/components/ModalComplete.svelte';
import ApiUtil from '$lib/ApiUtil';
/** @type {import('./$types').PageData} */
export let data;
let messageModal = "";
console.log(data);

/**
 * start proc
 * @param
 *
 * @return
 */ 
const startProc = async function () {
	try {
			const dt = LibCommon.formatDate(new Date(), 'YYYY-MM-DD');
			const p_date: any = document.querySelector('#p_date');
			p_date.value = dt;
	} catch (e) {
			console.error(e);
	}	
}
onMount(async () => {
	startProc();
});

/**
 *
 * @param
 *
 * @return
 */ 
const addPost = async function () {
	try{
//console.log("PUBLIC_API_URL=", PUBLIC_API_URL);
		let values = Crud.getInputValues();
		values.userId = 1;
console.log(values);
const res = await ApiUtil.post('/plan/create', values );
		console.log(res)
		//return res.data;
		window.location.href = '/plan';
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
//
const okFunction = function () {
    window.location.href = '/plan';
}
</script>

<!-- MarkUp -->
<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
		<a href={`/plan`} class="btn-outline-blue">Back
		</a>
		<hr class="my-2" />		
		<h1 class="text-3xl font-bold">Create</h1>
		<hr class="my-2" />		
		<div class="col-md-6 form-group">
			<label class="col-sm-3 control-label">日付</label>
			<div class="col-sm-6">
				<input type="date"  class="input_text" 
				value="" id="p_date" name="p_date"                   
					required="" />
			</div>                
		</div>
		<hr class="mt-2 mb-2" />
		<div class="col-md-6 form-group">
			<label for="content">内容</label>
			<textarea id="content" name="content" required 
			class="input_textarea"
			rows="10" placeholder="markdown input, please"></textarea>
		</div>
		<hr class="mt-2 mb-2" />
		<button on:click={addPost} class="btn btn-primary my-2"
		>Add</button>
		
	</div>
</div>	

<ModalComplete bind:message={messageModal} okFunction={okFunction} />

