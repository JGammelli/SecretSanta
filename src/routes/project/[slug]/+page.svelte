<script>
    import { each } from 'svelte/internal';
  import { projects } from '../../../lib/data/projects';
  export let data;

  // @ts-ignore
  function setSecretSanta(name){
    let setSanta = {secretSantaTo: name};


    fetch(`/project/${data.title}`, {
            method:"PATCH",
            headers: {
                "Content-type": "application/json"
            },
            
            body: JSON.stringify(setSanta)
        })
        .then(res => res.json())
        .then(data => console.log("Success", data))
        .catch(err => console.log("error", err));

      fetch(`/project/${name}`, {
          method:"PATCH",
          headers: {
              "Content-type": "application/json"
          },
          
          body: JSON.stringify({isPicked: true})
      })
      .then(res => res.json())
      .then(data => console.log("Success", data))
      .catch(err => console.log("error", err));

  }




  const unassigned = projects.filter(p => !p.secretSantaTo);
  if(unassigned.length === 1){
    const lonelySanta = unassigned[0];
    const unpicked = projects.filter(p => !p.isPicked);
    console.log(unpicked, lonelySanta); 

    if(unpicked.length === 1){
      const target = unpicked[0]
      lonelySanta.secretSantaTo = target.title;
      target.isPicked = true;

      console.log(`${lonelySanta.title} is now Secret Santa to ${target.title}`);
      fetch(`/project/${lonelySanta.title}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secretSantaTo: target.title,
          isPicked: true
        })
        })
          .then(res => res.json())
          .then(data => console.log("Updated:", data))
          .catch(err => console.error(err));
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
 
  <h1>{data.title}</h1>  

  <div class="projectContainer">

    <div class="projectItem">
      {#if data.secretSantaTo === ""}
      <p>Vem är du secret santa till?</p>
      {#each projects as project}
        {#if data.title !== project.title}
              <div class="projectContainer">
                <button class="text" on:click={() => setSecretSanta(project.title)}>
                  <h3>
                    {project.title}
                  </h3>
                </button>
        </div>
        {/if}
        {:else}
            <div>Bringing the projects...</div>
        {/each}
      {:else}
      <p>Du är Secret Santa till </p>
      <h2>{data.secretSantaTo}</h2>

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