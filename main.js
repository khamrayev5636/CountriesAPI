  // Dark Mode
  const elBtn = document.querySelector(".header__button-js");
  const elBody = document.querySelector("body");
  const elLabel = document.querySelector(".hero__form-label");
  const elTop = document.querySelector(".hero__form-country");
  const linkBtn = document.querySelector(".about__link");
  
  elBtn.addEventListener("click", function(){
    elBtn.classList.toggle("header__button-show")
    elBody.classList.toggle("dark-mod");
    elLabel.classList.toggle("hero__form-label-show");
    elTop.classList.toggle("hero__form-country-show");
  })
  
  // Form 
  const elForm = document.querySelector(".country__form");
  const elSearchInput = document.querySelector(".country__search-input")
  const elSelect = elForm.querySelector(".country__select");
  const elCountryList = document.querySelector(".country__list");
  
  // Modal 
  const elModal = document.querySelector(".modal");
  const elModalImg = document.querySelector(".modal__img");
  const elModalTitle = document.querySelector(".modal__title");
  const elModalPopulation = document.querySelector(".population__span");
  const elModalRegion = document.querySelector(".region__span");
  const elModalCapital = document.querySelector(".capital__span");
  const elModalCurrencies = document.querySelector(".currencies__span");
  const elModalLanguage = document.querySelector(".language__span");
  const elModalSubRegion = document.querySelector(".subregion__span");
  const elModalBorder = document.querySelector(".border__span");
  const elModalLink = document.querySelector(".modal__link");
  
  // Rander function
  
  function countryRander(arr , node) {
    
    node.innerHTML = "";
    
    const elCountryTemp = document.querySelector(".country__temp").content;
    const elCountryFragment = new DocumentFragment()
    
    arr.forEach(item => {
      
      const elClone = elCountryTemp.cloneNode(true);
      
      elClone.querySelector(".country__img").src = item.flags.png;
      elClone.querySelector(".country__img").alt = item.flags.alt;
      elClone.querySelector(".country__title").textContent = item.name.common;
      elClone.querySelector(".population__span").textContent = item.population;
      elClone.querySelector(".region__span").textContent = item.region;
      elClone.querySelector(".capital__span").textContent = item.capital;
      elClone.querySelector(".country__link").dataset.id = item.area;
      
      elCountryFragment.appendChild(elClone)
      
    });
    
    node.appendChild(elCountryFragment)
  }
  
  // async function
  
  async function countryList(url) {
    
    try {
      
      const res = await fetch(url);
      
      const data = await res.json();
      
      // console.log(data);
      countryRander(data , elCountryList)
      
    } catch (error) {
      elCountryList.textContent = error;
    }
    
  }
  
  countryList("https://restcountries.com/v3.1/all")
  
  
  // Modal function start
  
  function modalRander(item) {
    
    elModalImg.src = item.flags.png;
    elModalImg.alt = item.flags.alt;
    elModalTitle.textContent = item.name.common;
    elModalPopulation.textContent = item.population;
    elModalRegion.textContent = item.region;
    elModalCapital.textContent = item.capital;
    elModalCurrencies.textContent = item.currencies;
    elModalLanguage.textContent = item.languages.ara;
    elModalSubRegion.textContent = item.subregion;
    elModalBorder.textContent = item.borders;
    elModalLink.href = item.maps.googleMaps;
    
  }
  
  
  // Event Delegation
  
  
  async function dataId(url){
    
    try {
      
      const res = await fetch(url); 
      const data = await res.json();
      
      elCountryList.addEventListener("click" , evt => {
        
        if(evt.target.matches(".country__link")) {
          
          const elBtnId = evt.target.dataset.id;
          
          const findModal = data.find(element => element.area == elBtnId);
          
          modalRander(findModal)
        }
      })
      
    } catch (error) {
      elCountryList.textContent = error
    }
    
  }
  
  dataId("https://restcountries.com/v3.1/all")
  
  // Form function
  
  elForm.addEventListener("submit" , (evt)=> {
    evt.preventDefault()
    
    const elSearchValue = elSearchInput.value.trim();
    const elSelectValue = elSelect.value.trim();
    
    
    if(elSearchValue) {
      countryList(`https://restcountries.com/v3.1/name/${elSearchValue}`);
    }else if(elSelectValue) {
      countryList(`https://restcountries.com/v3.1/region/${elSelectValue}`)
    }
    
  })
  
  
  