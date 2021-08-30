
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

  async function DeleteIt(pkid) {
    try {
      const response = await fetch(`/api/blogposts/${pkid}`, { method: 'DELETE' });
      if (response.ok) {
        document.location.reload();
      }
    }
    catch (err) { console.log('Not deleted, not found') }
  }

  async function updateBlog(idd) {
    try {
      const title = document.querySelector(`#blogtitle${idd}`).value.trim();
      const content = document.querySelector(`#blogcontent${idd}`).value.trim();
      console.log(content)
      if (content) {
        const response = await fetch(`/api/blogposts/${idd}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.reload();
        }
      }
    }
    catch (err) {
      console.log('Failed to edit comment.')
    }
  };