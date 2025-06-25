document.getElementById('noteForm').addEventListener('submit', async function (e) {
  e.preventDefault(); //to reload the text area after submitting the note
  const note = document.getElementById('noteText').value;

  const res = await fetch('/submit-note', {
    method: 'POST', //to send the data to the server. post->used to create or send new data
    headers: {  //HTTP header to tell the server that the type data format is JSON.
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ note })//Converts the note (a JavaScript object) to a JSON string before sending it.
  });

  const data = await res.text();
  document.getElementById('responseMsg').textContent = data;
  document.getElementById('noteText').value = '';
});
