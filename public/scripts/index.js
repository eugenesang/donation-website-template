// navbar scroll
(() => {
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', (e) => {
        if (scrollY > 50) {
            nav.classList.add("scrolled")
        } else {
            nav.classList.remove('scrolled')
        }
    })
})();

// hero section image shuffle
(() => {
    const places = [
        {
            country: "USA",
            excerpt: "Floods caused destructions of property including power lines",
            img: "/images/california_floods_1.webp"
        },
        {
            country: "USA",
            excerpt: "California rogue floods caused allot of property damage",
            img: "/images/california_floods_2.jpg"
        },
        {
            country: "USA",
            excerpt: "Local displacement in San Jose, California due to floods",
            img: "/images/usa_floods_1.webp"
        },
        {
            country: "Indonesia",
            excerpt: "Floods submerged streets and destroyed infrastructure",
            img: "/images/indonesia_floods_1.webp"
        },
        {
            country: "Indonesia",
            excerpt: "Houses and buildings inundated by torrential floodwaters",
            img: "/images/indonesia_floods_2.jpg"
        },
        {
            country: "Indonesia",
            excerpt: "Communities evacuated as floodwaters rise",
            img: "/images/indonesia_floods_3.jpg"
        },
        {
            country: "UAE",
            excerpt: "Floodwaters engulfed urban areas, causing widespread damage",
            img: "/images/dubai_floods_1.jpg"
        },
        {
            country: "UAE",
            excerpt: "Vehicles stranded in flooded streets after heavy rains",
            img: "/images/dubai_floods_2.webp"
        },
        {
            country: "UAE",
            excerpt: "Floods disrupted transportation networks and infrastructure",
            img: "/images/dubai_floods_3.webp"
        },
        {
            country: "Kenya",
            excerpt: "Floods submerged a neighbourhood, impacting health & hygiene",
            img: "/images/kenya_floods_1.jpg"
        },
        {
            country: "Kenya",
            excerpt: "Aftermath of a destructive rain in a slum in Nairobi",
            img: "/images/kenya_floods_2.jpg"
        },
        {
            country: "Kenya",
            excerpt: "Red cross response team on the ground offering help",
            img: "/images/kenya_floods_3.jpeg"
        },
        {
            country: "UK",
            excerpt: "Floodwaters inundated homes and businesses along rivers",
            img: "/images/uk_floods_1.jpg"
        },
        {
            country: "UK",
            excerpt: "Emergency response teams rescue stranded residents",
            img: "/images/uk_floods_2.jpeg"
        },
        {
            country: "UK",
            excerpt: "Floods wreak havoc on coastal communities, displacing many",
            img: "/images/uk_floods_3.jpg"
        }
    ]

    const display = {
        country: document.getElementById("current-country"),
        img: document.getElementById("floods-img"),
        description: document.getElementById('floods-description')
    }

    let currentIndex = 0;

    function displayCurrentPlace() {
        const currentPlace = places[currentIndex];
        display.country.textContent = currentPlace.country;
        display.img.src = currentPlace.img;
        display.description.textContent = currentPlace.excerpt;
    }

    function shuffleImages() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % places.length;
            displayCurrentPlace();
        }, 15000); // Change the duration as needed (milliseconds)
    }

    shuffleImages();
})();

// collect news 
(async () => {
    const res = await fetch(`https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=Floods disaster ${new Date().getFullYear()}&limit=20&language=en`);
    const news = await res.json();

    function editUrl(img) {
        const pieces = img.split("/");

        let imgData = pieces.pop();

        let [a, b] = imgData.split('px');

        a = 300;

        imgData = [a, b].join('px');
        return [...pieces, imgData].join("/");
    }

    function createNewsCard(title, description, excerpt, id, thumbnail, key) {
        const imgUrl = editUrl(thumbnail?.url);

        // Create article element
        const article = document.createElement("article");
        article.classList.add("news-card");

        // Create img-container div
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");
        const img = document.createElement("img");
        img.src = imgUrl;
        imgContainer.appendChild(img);
        article.appendChild(imgContainer);

        // Create info div
        const info = document.createElement("div");
        info.classList.add("info");
        const titlePara = document.createElement("h4");
        titlePara.classList.add("title");
        titlePara.textContent = title;
        info.appendChild(titlePara);
        const shortDesc = document.createElement("p");
        shortDesc.classList.add("short-desc");
        shortDesc.textContent = description;
        if(description){
            info.appendChild(shortDesc);
        }
        const longDesc = document.createElement("p");
        longDesc.classList.add("long-desc");
        longDesc.innerHTML = excerpt;
        info.appendChild(longDesc);

        // Create read-more-container div
        const readMoreContainer = document.createElement("div");
        readMoreContainer.classList.add("read-more-container");
        const readMoreLink = document.createElement("a");
        readMoreLink.href = `/news/id/${id}/${key}`;
        readMoreLink.classList.add("read-more");
        readMoreLink.textContent = "Read more";
        readMoreContainer.appendChild(readMoreLink);
        info.appendChild(readMoreContainer);

        article.appendChild(info);


        return article;
    }

    const container = document.getElementById("news-container");
    container.innerHTML = '';

    for(let {title, description, excerpt, id, thumbnail, key} of news.pages.filter(n=>n.thumbnail).slice(0, 8)){
        const newsCard = createNewsCard(title, description, excerpt, id, thumbnail, key);
        
        container.append(newsCard);
    }
})();
