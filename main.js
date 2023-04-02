tinymce.init({ // intialize in forloop for each term ID
    selector: '#mytextarea'
});

$.get('stylebook.json', function(data) {
    const obj = data;
    //const obj = JSON.parse(JSON.stringify(data));
    const container = document.getElementById('big-accordion');
    let termCounter = 0;
    //console.log(obj[Object.keys(obj)[0]].length);
    const letter_arr = Object.keys(obj);
    let currLetter = '';

    for (let i = 0; i < letter_arr.length; i++) {
        currLetter = letter_arr[i];
        //console.log(obj[currLetter][i]['Term']);
        addCards(obj, container, currLetter);
        
    }

    function addCards(obj, container, currLetter) {
        let terms_arr = obj[currLetter];
        let termsLength = obj[currLetter].length;
        //console.log(termCounter);
        
        let outerCard = document.createElement('div');
        outerCard.setAttribute('class', 'card');
        
        let outerHeaderContainer = document.createElement('div');
        outerHeaderContainer.setAttribute('class', 'card-header');
        outerHeaderContainer.setAttribute('id', 'heading' + termCounter.toString());
    
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
    
    //    let outerCollapseContainer = document.createElement('div');
    //     outerCollapseContainer.setAttribute('id', 'collapse' + termCounter.toString());
    //     outerCollapseContainer.setAttribute('class', 'collapse');
    //     outerCollapseContainer.setAttribute('aria-labelledby', 'heading' + termCounter.toString());
    //     outerCollapseContainer.setAttribute('data-parent', '#big-accordion');

    // Remove the "collapse" class to show inner cards by default
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
        //termCounter++;
    
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
            //button.innerHTML = obj[currLetter][i]['Term'];
            button.innerHTML = terms_arr[j]['Term'];
            //console.log(terms_arr);
    
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
            //editDefBtn.onclick = edit;
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
            collapseContainer.setAttribute('class', 'collapse');
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
            cardBody.innerHTML = obj[currLetter][j]['definition'];
            cardBody.setAttribute('contenteditable', 'true')
            //cardBody.appendChild(textbox);

            

            collapseContainer.appendChild(cardBody);
            card.appendChild(collapseContainer);
            innerAccordion.appendChild(card);
            
            termCounter++;
        }

        
    }
});

function edit(buttonID) {
    //var termNum = buttonID.toString();
    console.log(buttonID);
    var termNum = buttonID.charAt(buttonID.length - 1);
    var textbox = document.getElementById('cardBody' + termNum);
    
    console.log(textbox.innerText);

}
  
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
