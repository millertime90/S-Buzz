// CONTROLLER FUNCTION(s) 

function getResults() {
    
    let objectifiedRawData = objectifyRawData(); 
    let startEndObj = getTableRows(); 
    getValues(objectifiedRawData, startEndObj.s, startEndObj.e); 
    
}

function addTermMultiple() { 
    
    let tm = (elem, _class, t_m, al_ph) => {
      
      let dFlex = document.createElement(elem); 
      dFlex.setAttribute("class", _class); 
      dFlex.innerHTML = 
      `<input id=${t_m.t} class="form-control" type="text" 
              min="0" aria-label=${al_ph.t} placeholder=${al_ph.t} 
       /> 
       <input id=${t_m.m} class="form-control" type="number" 
              min="0" aria-label=${al_ph.m} placeholder=${al_ph.m} 
       />`; 
      
      return dFlex; 
      
    }; 
    
    let terms_andMultiples = document.querySelector("#terms_andMultiples"); 
    let nth_pair = 4; 
    
    return () => { 
    
      terms_andMultiples.append(tm("DIV", "d-flex", { t: "term" + nth_pair, m: "multiple" + nth_pair }, { t: "Term " + nth_pair, m: "Multiple " + nth_pair })); 
      nth_pair += 1; 
      
    }; 
    
} 
  
let addTermMultiple_exec = addTermMultiple(); 

// LOGIC FUNCTION(s) 
  
function objectifyRawData() {
    
    let allInputs = document.querySelectorAll("input"); 
    let termInputs = [...allInputs].filter(i => /term/i.test(i.placeholder)); 
    let multipleInputs = [...allInputs].filter(i => /multiple/i.test(i.placeholder)); 
    let rawData = new Object(); 
    
    for(let i = 0; i < (allInputs.length - 2) / 2; i++) {
      
      rawData[termInputs[i].value] = Number.parseInt(multipleInputs[i].value); 
      
    } 
    
    return rawData; 
    
} 

// A LOGIC & VIEW FUNCTION 

function getTableRows() { 
    
    let results = document.querySelector("#results"); 
    
    let getTableRow = n => {
      
      let getTableData = () => {
        
        let tdStr = ""; 
        for(let i = 0; i < n; i++) {
          
          tdStr += "<td class='td text-light fw-bold'></td>"; 
          
        } 
        
        return tdStr; 
        
      }; 
      
      let tr = document.createElement("TR"); 
      tr.innerHTML = getTableData(); 
      results.append(tr); 
      
    };
    
    let start_ofRange = Number.parseInt(document.querySelector("#start_ofRange").value); 
    let end_ofRange = Number.parseInt(document.querySelector("#end_ofRange").value); 
    let fullRange = (end_ofRange - start_ofRange) + 1; // +1 to account for 0th block 
    let rows = Math.floor(fullRange / 4); 
    let partialRow = (() => fullRange % 4 > 0 ? 1 : 0)(); 
    
    for(let i = 0; i < rows; i++) {
      
      getTableRow(4); 
      
    } 
    
    if(partialRow) { getTableRow(fullRange % 4); } 
    
    return { s: start_ofRange, e: end_ofRange }; 
    
}

// A LOGIC & VIEW FUNCTION 

function getValues(rawData, s, e) { 
    
    let tdatas = document.querySelectorAll(".td"); 
    let values = (() => {
      
      let arr = new Array(); 
      
      for(let i in rawData) { arr.push(rawData[i]); } 
      
      return arr; 
      
    })(); 
    
    for(let i = s; i <= e; i++) {
      
      if(values.filter(j => i >= j && i % j === 0).length === 0) {
        
        tdatas[i].innerHTML = i; 
        continue; 
        
      }
      
      for(let j in rawData) {
        
        if(i >= rawData[j] && i % rawData[j] === 0) {
          
          tdatas[i].innerHTML += j + " "; 
          
        } 
        
      }
      
    }
    
}