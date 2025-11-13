<script>
    // import { each } from 'svelte/internal';
  // import { projects } from '../../../lib/data/projects';
  import { onMount } from 'svelte';
  export let data;
  
  let personData = data.project;
  let people = [];

  
  onMount(async () => {
      const res = await fetch('/api/people');
      people = await res.json();
      setReaminingSanta(people);
  });

    console.log("Name is:" + personData.name);

  async function setSecretSanta(name) {
    
    try {

    await fetch(`/api/people/${encodeURIComponent(personData.name)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secretSantaTo: name })
    });

    await fetch(`/api/people/${encodeURIComponent(name)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPicked: true })
    });

  
    console.log(" Secret Santa assignment updated successfully!");
    } catch (err) {
      console.error(" Error assigning Secret Santa:", err);
    }
    location.href = location.href;
    
  }


  async function setReaminingSanta(people) {
    
    const unassigned = people.filter(p => p.secretsantato === null || undefined || (typeof p.secretsantato === 'string' && p.secretsantato.trim() === ''));
    console.log("Unassigened: " + unassigned.length);
    
    if(unassigned.length === 1){

      const lonelySanta = unassigned[0];
      const unpicked = people.filter(p => !p.ispicked);
      console.log(unpicked, lonelySanta); 

      if(unpicked.length === 1){
        const target = unpicked[0]
        lonelySanta.secretsantato = target.name;
        target.ispicked = true;

        console.log(`${lonelySanta.name} is now Secret Santa to ${target.name}`);
        try {
          await fetch(`/api/people/${encodeURIComponent(personData.name)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secretSantaTo: target.name })
          });

          await fetch(`/api/people/${encodeURIComponent(target.name)}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isPicked: true })
          });
        
          console.log(" Secret Santa assignment updated successfully!");
          console.log(lonelySanta.name + " is santa to " + lonelySanta.secretsantato );
          console.log(target.name + " is " + target.ispicked );
          
          } catch (err) {
            console.error(" Error assigning Secret Santa:", err);
          }
        }
      }
    }
  

</script>


<div class="jumpContainer">
  <a href="/">
    <svg class="backArrow" width="16" height="6" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6406 2.99992L1.35932 2.99992M1.35932 2.99992L3.62686 0.786368M1.35932 2.99992L3.62686 5.21347" stroke="#878787" stroke-linecap="round"/>
    </svg>
  </a>
</div>

<div class="container">
 
  <h1>{personData.name}</h1>  

  <div class="projectContainer">

    <div class="projectItem">
      {#if personData.secretsantato === null || undefined || (typeof personData.secretsantato === 'string' && personData.secretsantato.trim() === '')}
      <p>Vem är du secret santa till?</p>
      {#each people as person}
        {#if person.name !== personData.name}
              <div class="projectContainer">
                <button class="text" on:click={() => setSecretSanta(person.name)}>
                  <h3>
                    {person.name}
                  </h3>
                </button>
        </div>
        {/if}
        {:else}
            <div>Bringing the projects...</div>
        {/each}
      {:else}
      <p>Du är Secret Santa till </p>
      <h2>{personData.secretsantato}</h2>

      {/if}
    </div>
    
  </div>
  
</div>



<style>

  h2{
    color: white;

  }

  h1{
    color: #ECC977;
  }
  .jump{
    color: #ECC977;
    text-decoration: underline;
    align-self: flex-end;
  }
  
  rect{
    fill: #ECE8E1;
  }
  path{
    stroke: #ECE8E1;
  }
  p{
    line-height: 2;
  }
  .pointer{
    scale: 1.2;
  }
  button {
    all: unset;
    cursor: pointer;
    margin: 2rem;
  }
  button:hover {
    color: #ECC977;
  }
  .content{
    margin-top: 2rem;
    margin-bottom: 2rem;

  }

  .roles{
    display: flex;
    margin-bottom: 1rem;
  }
  .container{
		margin: 5rem 25rem;
		text-align: center;
	}
  .jumpContainer{
    text-align: start;
    /* display: grid;
    grid-template-columns: 25% 25%; 
    gap: 50%; */
    display: flex;
    width: 100vw;
  }
	.projectContainer{
    display: flex;
    flex-direction: column;
    margin: 2rem;
	}
  .projectItem{
    margin: 2vw;
		/* margin-top: 8rem; */
  }
  img{
    width: 100%;
    max-width: 750px;
    border: 1px solid #ECC977;
  }
  .backContainer{
    max-width: 1402px;
    
  }
  a{
    text-align: start;

  }
  .backArrow{
    scale: 1.8;
  }
  .projectContainer {
		text-align: center;

    /* Backgroundcolor behind text */
    background-color: #00000050; 
    border-radius: 25px;
    box-shadow: 0 8px 32px 0 rgba(190, 122, 128, 0.185); 
    backdrop-filter: blur( 6px ); 
    -webkit-backdrop-filter: blur( 4px ); 
	}

  

  .backArrow:hover{
    scale: 2.5;
  }
  .link:hover{
    color: #ECC977;
  } 
  .link{
    color: #ECC977;
  }
  @media (max-width: 1024px) {
    .projectContainer{
      flex-direction: column;
      width: 100%;
    }
    .container{
      width: 100vw;
      margin: 0rem 0rem;

    }
    img{
      max-width: 100vw;
      margin-top: 2rem;
    }
    .backContainer{
      max-width: 100vw;
    }
    .roles{
      margin-bottom: 0rem;
    }
    .projectItem{
      width: 70%;
      margin: 0vw;
      margin-top: 0rem;
      align-self: center;
    }
    .backArrow{
      scale: 1.8;
    }
    .backContainer{
      max-width: 100%;
      text-align: center;
      margin-bottom: 3rem;
    }
    h1{
      margin-bottom: 2rem;
    }
  }
</style>