
  function revealIt(idd) {
    let elementt =`EditBlog` + idd.toString();
    let element = `blogbutts`+ idd.toString();
    let btel = `revelit`+ idd.toString();
    document.getElementById(elementt).style.display="block";
    document.getElementById(element).style.display="none";
     }

  document.querySelector(".btnedit").addEventListener('click',
   (event) => console.log(event.target));
  
   document.querySelector(".btndel").addEventListener('click',
   (event) => console.log(event.target));

