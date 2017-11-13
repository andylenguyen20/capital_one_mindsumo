Hello!

Thank you for visiting my website. Here are some important notes that I need to make:

1) The data that was given to me at the start of the challenge has been pre-processed by me using vba scripts in excel. The main file that I used for my estimation tools is called listings.json. Using vba, I managed to parse the information that I needed from the listings.csv and calendar.csv file given to us. From the calendar.csv file, I averaged all the costs for each lsiting id, hence the "preproccessed_avg_price" key in the listings.json file.
2) The methodology I used in the estimation tools was to use a kd-tree to run a nearest neighbor search on k neighbors closest to a given latitude-longitude input. The result was then the average of the values (either weekly cost or daily price) taken from each of these neighbors. 
3) To create the graphs, I used a bar chart library that was taken from an npm package, as well as data that I, once again, preprocessed
4) All of my css code, as well as header.js, was taken by a Youtuber named SimpleTut in his video link:
https://www.youtube.com/watch?v=nusgoj74a3Y.