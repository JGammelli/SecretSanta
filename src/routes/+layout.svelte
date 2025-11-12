<script>
    import { page } from '$app/stores'
</script>

<div class="container">
    <div class="header">
        <h1>Secret Santa</h1>
    </div>
    <div class="navigator"> 
        <svg width="1402" height="80" viewBox="0 0 1402 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M672.535 53L702.162 79L731.788 53" stroke="#8E8E8E"/>
            <path class="pointer" d="M687.639 53L702.743 66L717.846 53" stroke="#ff9d42"/>
            <path d="M828.22 53H731.788" stroke="white"/>
            <path d="M672.535 53H576.104" stroke="white"/>
            <path d="M828.22 53L1080.34 53" stroke="#8E8E8E"/>
            <path d="M322.988 53L576.104 53" stroke="#8E8E8E"/>
            <path d="M1387.06 1L1359.17 27" stroke="#8E8E8E"/>
            <path d="M1401 14L1373.12 40" stroke="#8E8E8E"/>
            <path d="M1359.17 27L1107.06 27" stroke="#8E8E8E"/>
            <path d="M1359.17 27L1107.06 27" stroke="#8E8E8E"/>
            <path d="M1107.06 27L1079.17 53" stroke="#8E8E8E"/>
            <path d="M14.9419 1L42.8257 27" stroke="#8E8E8E"/>
            <path d="M1.00003 14L28.8839 40" stroke="#8E8E8E"/>
            <path d="M42.8257 27L294.942 27" stroke="#8E8E8E"/>
            <path d="M294.942 27L322.826 53" stroke="#8E8E8E"/>
        </svg>
        <p class="smalTxt">Jag Är:</p>
    </div>
</div>
<slot/>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Roboto&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    
  /* Pointer svg */
    path{
        /* Line "banner" */
        stroke: #e4b769;
    }
    .pointer{
        /* Pointer on the */
        stroke: #e4b769;
    }
    a:hover{
        /* Hover color of menu */
        color: #ECC977;
    }
    .container {
		text-align: center;
	}
    .navPointer{
        height: 7rem;
    }
    .header{
        margin-top: 5rem;
    }
    h1{
        /* Name header */
        font-size: 3rem;
        color: #e4b769;
	}
    li{
        width: 252px;
        font-size: 1.5rem;
    }
    ul{
        width: 756px;
        height: 8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .smalTxt{
        font-size: 1.5rem;
        font-weight: 900;
        margin-top: 2rem;
        padding: 2rem;
        letter-spacing: .4rem;
        color: #e4b769; 
        background-color: #000000a9; 
		box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.349); 
		backdrop-filter: blur( 6px ); 
		-webkit-backdrop-filter: blur( 4px ); 
    }
    :global(a){
		text-decoration: none;
		color: #ECE8E1;
	}
	:global(body){
		color: #e4b769;
        background: url('/img/background.png') no-repeat;
        background-size: cover;
        background-attachment: fixed;
        text-shadow: 1.25px 1.25px 1.75px rgb(0, 0, 0);
	}
	:global(*){
		margin: 0 auto;
		padding: 0;
		font-weight: 300;
        letter-spacing: 1px;
		font-family: 'Quicksand', sans-serif;
    }
	:global(li){
		list-style-type: none;
	}
    :global(p, a){
		font-size: 1.2rem;
	}
    @media (max-width: 1024px) {

		.container{
			width: 100vw;
		}
        ul{
            width: 100vw;
            height: 5rem;
        }
        svg{
            width: 100vw !important;
        }
	}
    @media (max-width: 780px) {

        :global(a, p){
            font-size: .7rem;
        }
    }
</style>

