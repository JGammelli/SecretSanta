<script>
	// import { people } from '../lib/data/projects';
	import { onMount } from 'svelte';

 	export let people = [];

	onMount(async () => {
        const res = await fetch('/api/people');
        people = await res.json();
		console.log(people);
		
    });

	

</script>

<div>
	<div class="container">
		{#each people as person}
            <div class="projectContainer">
				<a href={`/people/${encodeURIComponent(person.name)}`}>
							<div class="text">
								<h3>
									{person.name}
								</h3>
							</div>
							</a>
			</div>
        {:else}
            <div>Bringing the people...</div>
        {/each}
	</div>
    
</div>


<style>
	h3{
		color: #dad8d5;
		font-weight: 700;
	}
	.tag{
		font-size: .9rem;
		font-weight: 700;
		color: #d8d7d5;
	}
	.svgPointer rect, path{
		fill: #021826de;
		stroke: #d8d7d5;
	}
	.container{
		display: flex;
		flex-flow: column;
		margin: 5rem 20vw;
		text-align: center;

		/* Backgroundcolor behind text */
		background-color: #00000050; 
		border-radius: 25px;
		box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.349); 
		backdrop-filter: blur( 6px ); 
		-webkit-backdrop-filter: blur( 4px ); 
	}
	.projectContainer{
		width: 50%;
		margin-bottom: 2vw;
		margin-top: 2vw;
		height: fit-content;
	}
	.project{
		margin: 0 2vw;
		height: 17vw;
	}
	.img{
		max-width: 794px;
		height: 100%;
		border: 2px solid #d8d7d5;

	}
	.svg{
		position: relative;
		max-width: 794px;
		height: 100%;
		object-fit: fill;
	}
	.textContainer{
		position: absolute;
		bottom: 0vw;
		left: 0vw;
		text-align: start;
		background-color: #021826de;
		width: 100%;
	}
	.text{
		padding: 1vw;
		background-color: #000000a9; 
		border-radius: 25px;
		box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.349); 
		backdrop-filter: blur( 6px ); 
		-webkit-backdrop-filter: blur( 4px ); 
	}
	
	.text:hover {
		background-color: #dbdbdb3a; 
		color: #8a69e4;
	}
	.pointer{
		position: absolute;
		right: 0vw;
  		transform: scaleX(-1);
		padding: 1vw;
	}
	.svgPointer:hover{
		scale: 1.3;
	}
	p{
		padding-top: 1rem;
		font-size: 1rem;

	}



	
	@media (max-width: 1024px) {
	
		.text{
			position: absolute;
			bottom: 1vw;
			left: 1vw;
			/* text-align: start; */
		}
		.text p{
			display: none;
		}
		.text h3 a{
			font-size: 1rem;
		}
		.pointer{
			bottom: 0;
			right:  0;
			scale: .5;
		}
			.svgPointer rect, path{
			fill: #021826;
			stroke: #d8d7d5;
		}
		@media (max-width: 780px) {

			.text h3 a{
				font-size: .7rem;
			}
		}
	}
</style>