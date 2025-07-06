const searchBtn = document.getElementById('search-btn');
const result = document.getElementById('result');
const inputWord = document.getElementById('input-word');

searchBtn.addEventListener('click', () => {
  let word = inputWord.value.trim();
  if (word === '') {
    result.innerHTML = `<p>Please enter a word</p>`;
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)          //sent  (Request)
    .then(response => response.json())
    .then(data => {
      if (data.title) {
        result.innerHTML = `<p>Word not found. Please try another one.</p>`;
        return;
      }

      let meaning = data[0].meanings[0].definitions[0];
      let phonetics = data[0].phonetics[0];
      let audio = phonetics.audio ? `<audio controls src="${phonetics.audio}"></audio>` : '';

      result.innerHTML = `
        <div class="word">${data[0].word}</div>
        <div class="phonetics">${phonetics.text || ''}</div>
        ${audio}
        <h3>Definition:</h3>
        <p>${meaning.definition}</p>
        ${meaning.example ? `<h3>Example:</h3><p>${meaning.example}</p>` : ''}
        ${meaning.synonyms && meaning.synonyms.length > 0 ? `<h3>Synonyms:</h3><p>${meaning.synonyms.join(', ')}</p>` : ''}
      `;
    })
    .catch(() => {
      result.innerHTML = `<p>Error fetching data. Please check your connection.</p>`;
    });
});
