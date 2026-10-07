const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((rest) => rest.json())
        .then((json) => displayData(json.data))
}

const btnActive = () => {
    const active = document.querySelectorAll(".lesson-btn")
    active.forEach((btn) => btn.classList.remove("active"))
}

const LodeLeavelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            btnActive()
            const clickbtn = document.getElementById(`lesson-${id}`)
            clickbtn.classList.add("active")
            displayLevelWords(data.data)
        })

}

const loadWordDtl = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}

const creatHtlm=(arr)=>{
    const htmlMap=arr.map((el)=>` <span class="bg-[#edf5ff] text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-[#e0edff]">  ${el}  </span>`)
    return(htmlMap.join(" "))
}

const displayWordDetails = (word) => {

    const detalseBox = document.getElementById('detailce-container')
    detalseBox.innerHTML = `<div class="max-w-md w-full space-y-4">
        <!-- Card Container -->
        <div class="bg-white border border-[#e8f2ff] rounded-2xl p-6 shadow-sm space-y-5 text-left">
            
            <!-- Title & Pronunciation -->
            <h1 class="text-2xl font-bold text-black flex items-center gap-1">
            ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
            </h1>

            <!-- Meaning Section -->
            <div>
            <h2 class="text-base font-bold text-black mb-1">Meaning</h2>
            <p class="text-gray-800 text-lg font-medium">${word.meaning}</p>
            </div>

            <!-- Example Section -->
            <div>
            <h2 class="text-base font-bold text-black mb-1">Example</h2>
            <p class="text-gray-600 text-base leading-relaxed">
                ${word.sentence}
            </p>
            </div>

            <!-- Synonyms Section -->
            <div>
            <h2 class="text-base font-bold text-black mb-2">সমার্থক শব্দ গুলো</h2>
            <div class="flex flex-wrap gap-2">
             ${creatHtlm(word.synonyms)}
            </div>
            </div>

        </div>

        `
    document.getElementById('wordModel').showModal()
}


const displayLevelWords = (words) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ""

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class=" mx-auto p-8 col-span-full rounded-2xl max-w-md w-full flex flex-col items-center justify-center text-center">
        <div class="mb-5 text-[#9e9e9e]">
            <svg class="w-20 h-20 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L1 21h22L12 2zm0 3.45L19.55 19H4.45L12 5.45zM11 10h2v4h-2zm0 5h2v2h-2z"/>
            </svg>
        </div>
       
        <p class="text-[#6b6b6b] text-base sm:text-lg mb-3">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        
        <h2 class="text-3xl sm:text-4xl font-bold text-[#222222]">
            নেক্সট Lesson এ যান
        </h2>
        </div>
        `
        return
    }
    words.forEach(word => {
        console.log(word)
        const card = document.createElement('div')
        card.innerHTML = `
         <div class=" p-4 sm:p-6 rounded-3xl max-w-md w-full">

            
            <div class="bg-white rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-between min-h-[300px]">

                
                <div class="text-center mt-2">
                    <h1 class="text-3xl sm:text-4xl font-bold text-black mb-3">
                        ${word.word ? word.word : "পাওয়া যায়নি"}
                    </h1>

                    <p class="text-gray-900 text-base sm:text-lg mb-4">
                          ${word.pronunciation ? word.pronunciation : "পাওয়া যায়নি"}
                    </p>

                    <h2 class="text-1xl sm:text-3xl font-bold text-[#4a4a4a]">
                       ${word.meaning ? word.meaning : "পাওয়া যায়নি"}
                    </h2>
                </div>

                
                <div class="w-full flex justify-between items-center mt-8">

                    
                    <button onclick="loadWordDtl(${word.id})"
                        class="bg-[#e8f2ff] hover:bg-[#dbe9fe] transition-colors text-[#334155] p-3.5 rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    
                    <button
                        class="bg-[#e8f2ff] hover:bg-[#dbe9fe] transition-colors text-[#334155] p-3.5 rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                </div>

            </div>
        </div>
`
        wordContainer.append(card)
    });
}

const displayData = (lesson) => {
    const LevelContainer = document.getElementById('Level-container')
    LevelContainer.innerHTML = ""
    for (let les of lesson) {
        const btnDive = document.createElement('div')
        btnDive.innerHTML = `
        <button id="lesson-${les.level_no}" onclick="LodeLeavelWord(${les.level_no})" class=" lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i></i>Learn - ${les.level_no}</button>
        `
        LevelContainer.append(btnDive)
    }
}



loadLesson()