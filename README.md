<h1>PaperHive</h1>
<img src="![PaperHiveSVG!-cropped](https://github.com/user-attachments/assets/5004d53a-1aae-4385-9c7b-8cd7a6ba43cc)" />
</div>
<p>A platform for researchers and students that acts as a hub for your research needs. It was built using ReactJS and styled using TailwindCSS. The backend was built using NodeJS and Express. As a one-stop shop, it provides a recommendation system based on your interests and research paper selections, as well as a paraphrasing systems for writing research papers. PaperHive utilizes the power of Semantic Scholar's API that can supply PaperHive with over 200 million research papers. </p>

<br/>
<h2>Search Results</h2>

![SearchResults](https://github.com/user-attachments/assets/b6ae2cf7-21e0-470b-83d8-a86f57c1e35a)
<p>PaperHive's front-end validates and error-checks the inputs before quering Semantic Scholar and receiving the results from its API our own back-end. This result was also the same for our application version. But in this example, it was only shown for the web app. </p>

<br/>

![PaperDetails](https://github.com/user-attachments/assets/8ea98af9-4773-48f1-99a9-fd7d71713154)
<p>Clicking on a research paper pulls up its abstract and PDF links (if available). It also calls for the recommendation system to provide recommended papers based on the current paper selected. The selected paper is also added to the user's history if they're logged in.</p>

<br/>
<h2>Map Visualization of cited papers</h2>
<p float="left">

  ![Untitled video - Made with Clipchamp](https://github.com/user-attachments/assets/02af7215-08ec-4d6f-ab03-a08c3a777211)


  ![vlcsnap-2024-11-14-23h32m57s428](https://github.com/user-attachments/assets/a499014a-b7dc-4cb3-80cf-4a29871dbab0)

</p>


<p>The user is able to build a hive of directly and indirectly cited papers of the selected paper. I utilized Semantic Scholar's API to figure out the connections of the selected paper and curated a dynamic and interactive hive that changes based on the number of connected papers and the number of citation for each paper.</p>
