const markInstance = new Mark(document.querySelector("#big-accordion"));
const starFavoriteMap = new Map();
let jsonData = [];

function decodeUnicode(str) {
  return str.replace(/\\u([\d\w]{4})/gi, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 16));
  });
}
function renderCards() {
  const container = document.getElementById('big-accordion');
  container.innerHTML = ''; // Clear the container to remove the existing cards

  let termCounter = 0;
  const letter_arr = Object.keys(jsonData);
  let currLetter = '';

  for (let i = 0; i < letter_arr.length; i++) {
    currLetter = letter_arr[i];
    addCards(jsonData, container, currLetter);
  }

    function addCards(obj, container, currLetter) {
        let terms_arr = obj[currLetter];
        let termsLength = obj[currLetter].length;
        
        let outerCard = document.createElement('div');
        outerCard.setAttribute('class', 'card');
        
        let outerHeaderContainer = document.createElement('div');
        outerHeaderContainer.setAttribute('class', 'card-header');
        outerHeaderContainer.setAttribute('class', 'card-header sticky-header'); // Add the 'sticky-header' class here
        outerHeaderContainer.setAttribute('id', 'heading' + termCounter.toString());
        outerHeaderContainer.setAttribute("data-letter", currLetter); // Add this line to set the data-letter attribute
    
        let outerHeader = document.createElement('h3');
        outerHeader.setAttribute('class', 'mb-0');
    
        let outerButton = document.createElement('div');
        outerButton.setAttribute('class', 'btn');
        outerButton.setAttribute('class', 'btn-link');
        outerButton.setAttribute('class', 'collapsed');
        outerButton.setAttribute('data-toggle', 'collapse');
        outerButton.setAttribute('data-target', '#collapse' + termCounter.toString());
        outerButton.setAttribute('aria-expanded', 'false');
        outerButton.setAttribute('aria-controls', 'collapse' + termCounter.toString());
        outerButton.innerHTML = currLetter;
    
        outerHeader.appendChild(outerButton);
        outerHeaderContainer.appendChild(outerHeader);
        outerCard.appendChild(outerHeaderContainer);
    

        let outerCollapseContainer = document.createElement('div');
        // Remove the "collapse" class to show inner cards by default
        outerCollapseContainer.setAttribute('id', 'collapse' + termCounter.toString());
        outerCollapseContainer.setAttribute('aria-labelledby', 'heading' + termCounter.toString());
        outerCollapseContainer.setAttribute('data-parent', '#big-accordion');
    
        let outerCardBody = document.createElement('div');
        outerCardBody.setAttribute('class', 'card-body');

        termCounter++;
        let innerAccordionID = 'accordion' + termCounter.toString();
        
        let innerAccordion  = document.createElement('div');
        innerAccordion.setAttribute('id', innerAccordionID);
    
        outerCardBody.appendChild(innerAccordion);
        outerCollapseContainer.appendChild(outerCardBody);
        outerCard.appendChild(outerCollapseContainer);
        container.appendChild(outerCard);
    
        for (let j = 0; j < termsLength; j++) {
            let card = document.createElement('div');
            card.setAttribute('class', 'card');
    
            let headerContainer = document.createElement('div');
            headerContainer.setAttribute('class', 'card-header');
            headerContainer.setAttribute('id', 'heading' + termCounter.toString());
    
            let header = document.createElement('h5');
            header.setAttribute('class', 'mb-0');
    
            let button = document.createElement('button');
            button.setAttribute('class', 'btn');
            button.setAttribute('class', 'btn-link');
            button.setAttribute('class', 'collapsed');
            button.setAttribute('type', 'button');
            button.setAttribute('class', 'btn-outline-dark');
            button.setAttribute('data-toggle', 'collapse');
            button.setAttribute('data-target', '#collapse' + termCounter.toString());
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', 'collapse' + termCounter.toString());
            button.innerHTML = terms_arr[j]['Term'];
            //console.log(terms_arr);
          
            // Create the star icon and add it to the header
            let starIcon = document.createElement('i');
            starIcon.classList.add('far', 'fa-star', 'favorite-icon'); // Unfilled star: use "fas" instead of "far" for filled star
            starIcon.addEventListener('click', function() {
            // Your code to handle adding/removing from favorites
            });
            header.appendChild(starIcon);

            starIcon.addEventListener('click', function () {
              this.classList.toggle('fas');
              this.classList.toggle('far');
              this.style.color = this.classList.contains('fas') ? 'yellow' : '';
              handleFavorites(this, terms_arr[j], card);
            });                    
            
            header.appendChild(button);

            let editDiv = document.createElement('div');
            editDiv.setAttribute('class', 'btn-group');
            editDiv.setAttribute('class', 'edit-div');
            editDiv.setAttribute('role', 'group');
            editDiv.setAttribute('aria-label', 'Button group with nested dropdown');
            
            let editDefBtn = document.createElement('button');
            editDefBtn.setAttribute('type', 'button');
            editDefBtn.setAttribute('class', 'btn');
            editDefBtn.setAttribute('class', 'btn-warning');
            editDefBtn.setAttribute('id', 'edit-btn' + termCounter.toString());
            editDefBtn.setAttribute('onClick', 'edit(this.id)');
            editDefBtn.innerHTML = 'Edit Description';

            let addTermBtn = document.createElement('button');
            addTermBtn.setAttribute('type', 'button');
            addTermBtn.setAttribute('class', 'btn');
            addTermBtn.setAttribute('class', 'btn-success');
            addTermBtn.innerHTML = 'Add Flag';

            let removeTermBtn = document.createElement('button');
            removeTermBtn.setAttribute('type', 'button');
            removeTermBtn.setAttribute('class', 'btn');
            removeTermBtn.setAttribute('class', 'btn-danger');
            removeTermBtn.innerHTML = 'Remove Flag';

            
            editDiv.appendChild(editDefBtn);
            editDiv.appendChild(addTermBtn);
            editDiv.appendChild(removeTermBtn);
            header.appendChild(editDiv);

            

            if (terms_arr[j]['Important'] == true) {
                let labelDiv = document.createElement('div');
                labelDiv.setAttribute('class', 'label-div');
                let impLabel = document.createElement('h6');
                impLabel.setAttribute('class', 'label');
                impLabel.innerHTML = 'Important';
                labelDiv.appendChild(impLabel);
                header.appendChild(labelDiv);
            }

            if (terms_arr[j]['Sports'] == true) {
                let labelDiv = document.createElement('div');
                labelDiv.setAttribute('class', 'label-div');
                let sportsLabel = document.createElement('h6');
                sportsLabel.setAttribute('class', 'label');
                sportsLabel.innerHTML = 'Sports';
                labelDiv.appendChild(sportsLabel);
                header.appendChild(labelDiv);
            }

            if (terms_arr[j]['AP Deviation'] == true) {
                let labelDiv = document.createElement('div');
                labelDiv.setAttribute('class', 'label-div');
                let apLabel = document.createElement('h6');
                apLabel.setAttribute('class', 'label');
                apLabel.innerHTML = 'AP Deviation';
                labelDiv.appendChild(apLabel);
                header.appendChild(labelDiv);
            }

            headerContainer.appendChild(header);
            card.appendChild(headerContainer);
    
            let collapseContainer = document.createElement('div');
            collapseContainer.setAttribute('id', 'collapse' + termCounter.toString());
            // Remove the "collapse" class to show inner cards by default
            collapseContainer.setAttribute('aria-labelledby', 'heading' + termCounter.toString());
            collapseContainer.setAttribute('data-parent', '#' + innerAccordionID);
    
            let cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            cardBody.setAttribute('id', 'cardBody' + termCounter.toString());
            
            //cardBody.setAttribute('class', 'grow-wrap');


            //let textbox = document.createElement('textarea');

            //textbox.setAttribute('name', 'text' + termCounter.toString());
            //textbox.setAttribute('id', 'text' + termCounter.toString());
            //textbox.setAttribute('onInput', 'this.parentNode.dataset.replicatedValue = this.value');
            //textbox.setAttribute('cols', '120');
            //textbox.innerHTML = terms_arr[j]['definition'];
            cardBody.innerHTML = decodeUnicode(terms_arr[j]['definition']).replace(/\n/g, '<br>');
            cardBody.setAttribute('contenteditable', 'true');
            //QUILL EDITOR TEST
            cardBody.setAttribute('class', 'quill-editor');
            cardBody.id = 'quill-editor-' + termCounter;

            //cardBody.appendChild(textbox);

            // MAKE TEXT BOX APPEAR ON CLICK -- NOT WORKING
            // cardBody.addEventListener("click", function () {
            //   if (!this.classList.contains("quill-initialized")) {
            //     const quill = new Quill("#" + this.id, {
            //       modules: {
            //         toolbar: [
            //           ["bold", "italic", "underline", "strike"],
            //           [{ list: "ordered" }, { list: "bullet" }],
            //           ["link"],
            //         ],
            //       },
            //       theme: "snow",
            //     });
            
            //     quill.on("text-change", () => {
            //       clearTimeout(window.quillSaveTimeout);
            //       window.quillSaveTimeout = setTimeout(() => {
            //         this.setAttribute("data-html-content", quill.root.innerHTML);
            //       }, 500);
            //     });
            
            //     this.classList.add("quill-initialized");
            //   }
            // });

            collapseContainer.appendChild(cardBody);
            card.appendChild(collapseContainer);
            innerAccordion.appendChild(card);
            
            termCounter++;
        }

        
    }
    // QUILL EDITOR TEST
    // function initQuillEditors() {
    //   const quillEditors = document.querySelectorAll('.quill-editor');
      
    //   quillEditors.forEach((editor) => {
    //     const quill = new Quill('#' + editor.id, {
    //       modules: {
    //         toolbar: [
    //           ['bold', 'italic', 'underline', 'strike'],
    //           [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //           ['link']
    //         ]
    //       },
    //       theme: 'snow'
    //     });
    //   });
    // }
    
    // initQuillEditors();
    
;}

$.get('stylebook.json', function(data) {
  jsonData = data; // Assign the fetched data to jsonData variable
  renderCards(); // Call the renderCards() function to render the cards based on the fetched data
});

function edit(buttonID) {
    //var termNum = buttonID.toString();
    console.log(buttonID);
    var termNum = buttonID.charAt(buttonID.length - 1);
    var textbox = document.getElementById('cardBody' + termNum);
    
    console.log(textbox.innerText);

}
// SEARCH BAR FUNCTIONALITY 
// Get the search input field
const searchInput = document.getElementById('search-input');

// Add an event listener to the search input field
searchInput.addEventListener('input', function() {
  // Get the search query from the input field
  const query = searchInput.value.trim().toLowerCase();

  // Get all the card headers and descriptions
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const header = card.querySelector('.card-header').textContent.trim().toLowerCase();
    const description = card.querySelector('.card-body').textContent.trim().toLowerCase();

    // Show/hide the card based on whether it contains the search query or not
    if (header.includes(query) || description.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

searchInput.addEventListener('input', function() {
  // Get the search query from the input field
  const query = searchInput.value.trim().toLowerCase();

  // Unmark any previously marked elements before searching
  markInstance.unmark();

  // If the query is not empty, search and highlight the text
  if (query) {
    markInstance.mark(query, {
      separateWordSearch: false,
      done: function() {
        // Get all the card headers and descriptions
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          // Check if the card contains any highlighted elements
          const hasHighlight = card.querySelector('mark') !== null;

          // Show/hide the card based on whether it contains a highlighted search query or not
          if (hasHighlight) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  } else {
    // If the query is empty, display all the cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.display = 'block';
    });
  }
});

const flagButtons = document.querySelectorAll('.flag-button');

function filterCardsByFlag(flag) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const labels = card.querySelectorAll('.label');
    let flagFound = false;

    labels.forEach(label => {
      if (label.textContent.trim() === flag) {
        flagFound = true;
      }
    });

    if (flagFound) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

flagButtons.forEach(button => {
  button.addEventListener('click', () => {
    const flag = button.dataset.flag;
    filterCardsByFlag(flag);
  });
});

function handleFavorites(star, term, card) {
  const favoritesContainer = document.getElementById('favorites-container');

  if (star.classList.contains('fas')) {
    // If the star is filled, add the card to the favorites container
    const cardClone = card.cloneNode(true);
    cardClone.id = `fav-${term.id}`; // Assign a new ID for the cloned card
    favoritesContainer.appendChild(cardClone);
  } else {
    // If the star is not filled, remove the card from the favorites container
    const cardToRemove = document.getElementById(`fav-${term.id}`);
    if (cardToRemove) {
      favoritesContainer.removeChild(cardToRemove);
    }
  }
}

document.querySelectorAll("#alphabet-navigation a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = link.dataset.letter;
    const letterSection = document.querySelector(`.card-header[data-letter="${letter}"]`);

    if (letterSection) {
      letterSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const favoritesBtn = document.getElementById("favorites-btn");

favoritesBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default behavior of anchor tags
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


function addEntryToJSON() {
  const entryTerm = document.getElementById('entryTerm').value;
  const entryTags = Array.from(document.getElementById('entryTags').selectedOptions).map(option => option.value);
  const entryDefinition = document.getElementById('entryDefinition').value;

  if (!entryTerm || !entryDefinition) {
    return false;
  }

  const newEntry = {
    Term: entryTerm,
    Important: entryTags.includes('Important'),
    Sports: entryTags.includes('Sports'),
    'AP Deviation': entryTags.includes('AP Deviation'),
    definition: entryDefinition
  };

  // Find the first letter of the term
  const firstLetter = entryTerm.charAt(0).toUpperCase();

  // Check if the first letter already exists in the jsonData object
  if (jsonData.hasOwnProperty(firstLetter)) {
    // If it does, push the new entry to the existing array
    jsonData[firstLetter].push(newEntry);
  } else {
    // If it doesn't, create a new array with the new entry and add it to the jsonData object
    jsonData[firstLetter] = [newEntry];
  }

  // Reset the form
  document.getElementById('add-entry-form').reset();

  return true;
}

$('#saveEntry').on('click', () => {
  if (addEntryToJSON()) {
    // Close the modal
    $('#addEntryModal').modal('hide');
    // Re-render the cards on the page to include the new entry
    renderCards();
  } else {
    alert('Please provide a term and a definition.');
  }
});