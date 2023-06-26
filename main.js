//Explore button 
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    HadithSection.scrollIntoView({
        behavior : "smooth"
    })
})
let fixedNav = document.querySelector('.header'),
     scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 500 ?  scrollBtn.classList.add('active') : scrollBtn.classList.remove('active') ;
})
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})
//Hadith Changer 
let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
    let hadithIndex = 0;
    HadithChanger();
    function  HadithChanger()
    {
        fetch("https://hadis-api-id.vercel.app/hadith/abu-dawud?page=2&limit=300")
        .then(response => response.json())
        .then(data =>{
    
            let Hadiths = data.items;
            changeHadith();
            next.addEventListener('click',()=>{
                hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
                changeHadith()
            })
            prev.addEventListener('click',()=>{
                hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
                changeHadith()
            })
            function changeHadith()
            {
                hadithContainer.innerText = Hadiths[hadithIndex].arab;
                number.innerText = `300 - ${hadithIndex + 1}`
            }  
        })
    }

// Link Sections
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');
links.forEach(link => {
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section=>{
            if(section.classList.contains(target))
            {
                section.scrollIntoView({
                    behavior : "smooth"
                })
            }
        })
    })
})


let SurahsContainer = document.querySelector('.surahContainer');
getSurahs()
function getSurahs()
{
    fetch("https://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data=>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        SurahsContainer.innerHTML = "";
        for (let i = 0; i < numberOfSurahs; i++) {

            SurahsContainer.innerHTML += 
        
        `
        <div class="surah"> <p>${surahs[i].name}</p> 
        <p>${surahs[i].englishName}</p> 
        </div>
        `

        }
        let SurahsTitels = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');
        SurahsTitels.forEach((title,index)=>{
            title.addEventListener('click',()=>{
                title.scrollTo({
                    behavior : "smooth"
                })
            fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
                .then(response => response.json())
                .then(data=>{
                    AyatContainer.innerHTML = "";
                    let Ayat = data.data.ayahs;
                    Ayat.forEach(aya=>{
                        popup.classList.add('active');
                        AyatContainer.innerHTML += `  
                        <div>
                            <span style="font-size:20px;color:#247429; "> { ${aya.numberInSurah} }  -</span>
                            <span style="font-size:20px; margin:8px;">${aya.text} .</span>
                        </div> 
                        <br>
                        `
                    })  
                })
            })
        })  
        let closePopup = document.querySelector('.close-popup');
        closePopup.addEventListener('click',()=>{
            popup.classList.remove('active');
        })   
    })
}
//PrayTime Api
let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes()
{
    fetch("https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
    .then(response => response.json())
    .then(data =>{
        let times = data.data.timings;
        cards.innerHTML = "";
        for (let time in times )
        {
            
            cards.innerHTML+= 
            `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <Circle cx="100" cy = "100" r ="100"></Circle>
                        </svg>
                        <div class="praytime">${times[time]}</div>
                    </div>
                    <p>${time}</p>
                </div>
            `
        }
    })
}
//Active SideBar
let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
bars.addEventListener('click',()=>{
    SideBar.classList.toggle("active");
})


  const countdownValue = document.getElementById('countdown-value');
const decrementButton = document.getElementById('countdown-decrement');
const resetButton = document.getElementById('countdown-reset');

let value = 100;

function displayCountdown() {
	countdownValue.innerHTML = value.toString().padStart(2, '0');
}

function decrementCountdown() {
	if (value > 0) {
		value--;
		displayCountdown();
	}
}

function resetCountdown() {
	value = 100;
	displayCountdown();
}

decrementButton.addEventListener('click', decrementCountdown);
resetButton.addEventListener('click', resetCountdown);

displayCountdown();

