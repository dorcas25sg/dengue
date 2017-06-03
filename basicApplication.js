var state = {
  "slideNumber": 0, // slideNumber keeps track of what slide you are on. It should increase when you
                    // click the next button and decrease when you click the previous button. It
                    // should never get so large that it is bigger than the dataset. It should never
                    // get so small that it is smaller than 0.
  "slideData": [
    {
      "name": "What is Dengue?",
      "description": "Dengue Fever is a mosquito-borne viral disease in Singapore that spreads through the Aedes moquito.",
      //"slideNum": 0
      //to add instructions of which layer properties to access - in this case, display all polygons
    },
    {
      "name": "Dengue Clusters",
      "description": "Do you live close to any of these hotspots?",
      //"slideNum": 1
      //to add instructions of which layer properties to access - display only hotspot polygons
    },
    {
      "name": "Dengue Breeding Spots",
      "description": "There is NO DRUG for dengue fever! The most effective way to prevent it's spread is to remove the Aedes mosquito breeding ground! Here are the current breeding spots in Singapore",
      //"slideNum": 2
      //instructions of which layer properties to access - display only breeding spots polygons
    },
    {
      "name": "Dengue Cases",
      "description": "Extra care to protect our love ones",
      //"slideNum": 3
      //to add instructions of which layer properties to access - display only cases
    },
    {
      "name": "Dengue can affect the old",
      "description": "A 79-year-old man passsed away on May 29 2016, two days after he was hospitalised for dengue. The Singaporean Chinese man had lived at Jalan Tenaga, an area located within an active dengue cluster.",
      //"slideNum": 4
      // to add instructions to zoom in on particular areas that will have a pop-up with a news link to a high profile dengue fever case
    },
    {
      "name": "...the young",
      "description": "An 11-year-old boy, living in Woodleigh Close, died on Aug 30 2016 after he had been admitted to the hospital that day",
      //"slideNum": 5
      // to add instructions to zoom in on particular areas that will have a pop-up with a news link to another high profile dengue fever case
    },
    {
      "name": "...and the middle-aged",
      "description": "In Marsiling Rise, another area within an active dengue cluster, dengue took it's first Singapore victim in 2016: A 47-year-old man",
      //"slideNum": 6
      // to add instructions to zoom in on particular areas that will have a pop-up with a news link to another high profile dengue fever case
    },
    {
      "name": "Dengue Prevention",
      "description": "You can help prevent dengue by making sure that there are no static water collection in your home and use insecticide where water is likely to collect (e.g. gutter, potted plants, containers, shallow drains)",
      //"slideNum": 7
      // resets map to original zoom and show all points, so that people can finally start clicking around the map and exploring it for themselves
    }
  ]
};
